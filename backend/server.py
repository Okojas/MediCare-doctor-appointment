from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import logging
from pathlib import Path
from dotenv import load_dotenv
import shutil
import uuid as uuid_module
import models
import schemas
import auth
from database import engine, get_db
from seed_data import seed_database

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create database tables
models.Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI(title="MediCare API", version="1.0.0")

# Create API router
api_router = APIRouter(prefix="/api")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health Check
@api_router.get("/")
async def root():
    return {"message": "MediCare API is running", "version": "1.0.0"}

# ==================== Authentication Routes ====================

@api_router.post("/auth/register", response_model=schemas.TokenResponse)
def register(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if user already exists
        existing_user = db.query(models.User).filter(models.User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create user
        hashed_password = auth.get_password_hash(user_data.password)
        new_user = models.User(
            id=str(uuid_module.uuid4()),
            email=user_data.email,
            password_hash=hashed_password,
            name=user_data.name,
            phone=user_data.phone,
            role=user_data.role
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        # Create patient or doctor profile
        if user_data.role == "patient":
            patient_profile = models.Patient(
                id=str(uuid_module.uuid4()),
                user_id=new_user.id,
                age=user_data.age,
                gender=user_data.gender
            )
            db.add(patient_profile)
            db.commit()
        
        # Generate token
        access_token = auth.create_access_token(
            data={"sub": str(new_user.id), "role": new_user.role}
        )
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": new_user
        }
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")

@api_router.post("/auth/login", response_model=schemas.TokenResponse)
def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    # Find user by email and role
    user = db.query(models.User).filter(
        models.User.email == credentials.email,
        models.User.role == credentials.role
    ).first()
    
    if not user or not auth.verify_password(credentials.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Generate token
    access_token = auth.create_access_token(
        data={"sub": str(user.id), "role": user.role}
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@api_router.get("/auth/me", response_model=schemas.UserResponse)
def get_current_user_info(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

# ==================== Doctor Routes ====================

@api_router.get("/doctors", response_model=dict)
def get_doctors(
    specialty: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db)
):
    query = db.query(models.Doctor).join(models.User).join(models.Specialty)
    
    if specialty:
        query = query.filter(models.Specialty.name == specialty)
    
    if search:
        query = query.filter(
            models.User.name.ilike(f"%{search}%") |
            models.Specialty.name.ilike(f"%{search}%")
        )
    
    total = query.count()
    doctors = query.offset(offset).limit(limit).all()
    
    # Serialize doctors manually
    doctors_list = []
    for doctor in doctors:
        doctor_dict = {
            "id": doctor.id,
            "user_id": doctor.user_id,
            "specialty_id": doctor.specialty_id,
            "experience": doctor.experience,
            "fee": doctor.fee,
            "rating": doctor.rating,
            "languages": doctor.languages,
            "availability_days": doctor.availability_days,
            "user": {
                "id": doctor.user.id,
                "name": doctor.user.name,
                "email": doctor.user.email,
                "phone": doctor.user.phone,
                "role": doctor.user.role
            },
            "specialty": {
                "id": doctor.specialty.id,
                "name": doctor.specialty.name,
                "description": doctor.specialty.description
            }
        }
        doctors_list.append(doctor_dict)
    
    return {
        "doctors": doctors_list,
        "total": total
    }

@api_router.get("/doctors/{doctor_id}")
def get_doctor(doctor_id: str, db: Session = Depends(get_db)):
    doctor = db.query(models.Doctor).filter(models.Doctor.user_id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    # Get specialty info
    specialty = db.query(models.Specialty).filter(models.Specialty.id == doctor.specialty_id).first()
    
    # Manually serialize to avoid schema issues
    doctor_data = {
        "id": doctor.id,
        "user_id": doctor.user_id,
        "specialty_id": doctor.specialty_id,
        "experience": doctor.experience,
        "fee": doctor.fee,
        "rating": doctor.rating,
        "languages": doctor.languages,
        "availability_days": doctor.availability_days,
        "user": {
            "id": doctor.user.id,
            "name": doctor.user.name,
            "email": doctor.user.email,
            "phone": doctor.user.phone,
            "role": doctor.user.role
        },
        "specialty": {
            "id": specialty.id,
            "name": specialty.name,
            "description": specialty.description
        } if specialty else None
    }
    
    return doctor_data

# ==================== Appointment Routes ====================

@api_router.post("/appointments", response_model=schemas.AppointmentResponse)
def create_appointment(
    appointment_data: schemas.AppointmentCreate,
    current_user: models.User = Depends(auth.require_role(["patient"])),
    db: Session = Depends(get_db)
):
    import uuid
    # Get doctor to retrieve fee
    doctor = db.query(models.Doctor).filter(models.Doctor.user_id == appointment_data.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    new_appointment = models.Appointment(
        id=str(uuid.uuid4()),
        patient_id=current_user.id,
        doctor_id=appointment_data.doctor_id,
        date=appointment_data.date,
        time=str(appointment_data.time),  # Convert time to string
        type=appointment_data.type,
        symptoms=appointment_data.symptoms,
        fee=doctor.fee,
        status="confirmed"
    )
    
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    
    return new_appointment

@api_router.get("/appointments", response_model=List[schemas.AppointmentResponse])
def get_appointments(
    status: Optional[str] = None,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role == "patient":
        query = db.query(models.Appointment).filter(models.Appointment.patient_id == current_user.id)
    elif current_user.role == "doctor":
        query = db.query(models.Appointment).filter(models.Appointment.doctor_id == current_user.id)
    else:
        query = db.query(models.Appointment)
    
    if status:
        query = query.filter(models.Appointment.status == status)
    
    appointments = query.order_by(models.Appointment.date.desc()).all()
    return appointments

@api_router.patch("/appointments/{appointment_id}/status")
def update_appointment_status(
    appointment_id: str,
    update_data: schemas.AppointmentUpdate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Authorization check
    if current_user.role == "patient" and appointment.patient_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    if current_user.role == "doctor" and appointment.doctor_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    if update_data.status:
        appointment.status = update_data.status
    if update_data.payment_status:
        appointment.payment_status = update_data.payment_status
    
    db.commit()
    db.refresh(appointment)
    
    return {"message": "Appointment updated successfully", "appointment": appointment}

# ==================== Admin Routes ====================

@api_router.get("/admin/stats", response_model=schemas.AdminStats)
def get_admin_stats(
    current_user: models.User = Depends(auth.require_role(["admin"])),
    db: Session = Depends(get_db)
):
    total_patients = db.query(models.Patient).count()
    total_doctors = db.query(models.Doctor).count()
    total_appointments = db.query(models.Appointment).count()
    
    # Calculate revenue from paid appointments
    from sqlalchemy import func
    revenue = db.query(func.sum(models.Appointment.fee)).filter(
        models.Appointment.payment_status == "paid"
    ).scalar() or 0
    
    return {
        "total_patients": total_patients,
        "total_doctors": total_doctors,
        "total_appointments": total_appointments,
        "revenue": revenue
    }

# ==================== Medical Records Routes ====================

@api_router.get("/medical-records")
def get_medical_records(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role == "patient":
        records = db.query(models.MedicalRecord).filter(models.MedicalRecord.patient_id == current_user.id).all()
    elif current_user.role == "doctor":
        records = db.query(models.MedicalRecord).filter(models.MedicalRecord.doctor_id == current_user.id).all()
    else:
        records = db.query(models.MedicalRecord).all()
    
    return {"records": records}

from fastapi import UploadFile, File
import shutil
from pathlib import Path

# Create uploads directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@api_router.post("/medical-records")
async def upload_medical_record(
    file: UploadFile = File(...),
    title: str = None,
    type: str = "other",
    notes: str = None,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    import uuid
    # Save file
    file_path = UPLOAD_DIR / f"{uuid.uuid4()}_{file.filename}"
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Create record
    record = models.MedicalRecord(
        id=str(uuid.uuid4()),
        patient_id=current_user.id,
        type=type,
        title=title or file.filename,
        file_url=str(file_path),
        notes=notes
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    
    return {"message": "File uploaded successfully", "record": record}

# ==================== Payment Routes ====================

@api_router.post("/payments/create-order")
def create_payment_order(
    payment_data: dict,
    current_user: models.User = Depends(auth.require_role(["patient"])),
    db: Session = Depends(get_db)
):
    import uuid
    # Mock payment order creation
    # In production, integrate with Razorpay/Stripe
    import random
    order_id = f"order_{uuid.uuid4()}"
    
    return {
        "order_id": order_id,
        "amount": payment_data.get("amount"),
        "currency": "INR",
        "key": "test_key",  # Would be actual Razorpay key
        "message": "Payment order created successfully"
    }

@api_router.post("/payments/verify")
def verify_payment(
    payment_data: dict,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    # Mock payment verification
    # In production, verify with payment gateway
    appointment_id = payment_data.get("appointment_id")
    
    if appointment_id:
        appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
        if appointment:
            appointment.payment_status = "paid"
            db.commit()
    
    return {
        "success": True,
        "message": "Payment verified successfully"
    }

# ==================== Video Consultation Routes ====================

@api_router.get("/consultations/{appointment_id}/token")
def get_video_token(
    appointment_id: str,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    import uuid
    appointment = db.query(models.Appointment).filter(models.Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Check authorization
    if current_user.id not in [appointment.patient_id, appointment.doctor_id]:
        raise HTTPException(status_code=403, detail="Not authorized")
    

# Include router
app.include_router(api_router)