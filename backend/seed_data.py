import sys
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from auth import get_password_hash
from datetime import datetime, timedelta
import uuid

def seed_database():
    db = SessionLocal()
    
    try:
        print("🌱 Starting database seeding...")
        
        # Clear existing data
        db.query(models.Appointment).delete()
        db.query(models.Doctor).delete()
        db.query(models.Patient).delete()
        db.query(models.Specialty).delete()
        db.query(models.User).delete()
        db.commit()
        print("✅ Cleared existing data")
        
        # Create Specialties
        specialties_data = [
            {"name": "Cardiology", "description": "Heart & cardiovascular system", "icon": "❤️"},
            {"name": "Dermatology", "description": "Skin, hair & nails", "icon": "🧴"},
            {"name": "Neurology", "description": "Brain & nervous system", "icon": "🧠"},
            {"name": "Pediatrics", "description": "Children healthcare", "icon": "👶"},
            {"name": "Orthopedics", "description": "Bones & joints", "icon": "🦴"},
            {"name": "Ophthalmology", "description": "Eye care", "icon": "👁️"},
            {"name": "Dentistry", "description": "Dental care", "icon": "🦷"},
            {"name": "ENT", "description": "Ear, Nose & Throat", "icon": "👂"},
            {"name": "Psychiatry", "description": "Mental health", "icon": "🧘"},
            {"name": "General Medicine", "description": "General healthcare", "icon": "🏥"}
        ]
        
        specialties = []
        for spec_data in specialties_data:
            specialty = models.Specialty(**spec_data)
            db.add(specialty)
            specialties.append(specialty)
        db.commit()
        print(f"✅ Created {len(specialties)} specialties")
        
        # Create Admin User
        admin_user = models.User(
            id=str(uuid.uuid4()),
            email="admin@example.com",
            password_hash=get_password_hash("admin123"),
            name="Admin User",
            phone="+91 98765 43212",
            role="admin"
        )
        db.add(admin_user)
        db.commit()
        print("✅ Created admin user")
        
        # Create Patient Users
        patients_data = [
            {"email": "john@example.com", "name": "John Doe", "phone": "+91 98765 43210", "age": 35, "gender": "Male"},
            {"email": "jane@example.com", "name": "Jane Smith", "phone": "+91 98765 43211", "age": 28, "gender": "Female"},
        ]
        
        for patient_data in patients_data:
            user = models.User(
                id=str(uuid.uuid4()),
                email=patient_data["email"],
                password_hash=get_password_hash("password123"),
                name=patient_data["name"],
                phone=patient_data["phone"],
                role="patient"
            )
            db.add(user)
            db.commit()
            
            patient = models.Patient(
                id=str(uuid.uuid4()),
                user_id=user.id,
                age=patient_data["age"],
                gender=patient_data["gender"]
            )
            db.add(patient)
        db.commit()
        print(f"✅ Created {len(patients_data)} patients")
        
        # Create Doctor Users
        doctors_data = [
            {
                "email": "sarah@example.com",
                "name": "Dr. Sarah Johnson",
                "phone": "+91 98765 43220",
                "specialty_id": 1,
                "qualification": "MBBS, MD - Cardiology",
                "experience": 15,
                "fee": 1500,
                "hospital": "City Heart Hospital",
                "location": "Mumbai, Maharashtra",
                "image_url": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
                "about": "Experienced cardiologist specializing in heart disease prevention and treatment.",
                "languages": ["English", "Hindi", "Marathi"],
                "availability_days": ["Mon", "Wed", "Fri"]
            },
            {
                "email": "rajesh@example.com",
                "name": "Dr. Rajesh Kumar",
                "phone": "+91 98765 43221",
                "specialty_id": 2,
                "qualification": "MBBS, MD - Dermatology",
                "experience": 12,
                "fee": 1200,
                "hospital": "Skin Care Clinic",
                "location": "Delhi",
                "image_url": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
                "about": "Specialist in skin disorders, acne treatment, and cosmetic dermatology.",
                "languages": ["English", "Hindi"],
                "availability_days": ["Tue", "Thu", "Sat"]
            },
            {
                "email": "priya@example.com",
                "name": "Dr. Priya Sharma",
                "phone": "+91 98765 43222",
                "specialty_id": 4,
                "qualification": "MBBS, MD - Pediatrics",
                "experience": 10,
                "fee": 1000,
                "hospital": "Children Hospital",
                "location": "Bangalore",
                "image_url": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
                "about": "Dedicated pediatrician with expertise in child healthcare and immunization.",
                "languages": ["English", "Hindi", "Kannada"],
                "availability_days": ["Mon", "Tue", "Wed", "Thu", "Fri"]
            },
            {
                "email": "amit@example.com",
                "name": "Dr. Amit Patel",
                "phone": "+91 98765 43223",
                "specialty_id": 5,
                "qualification": "MBBS, MS - Orthopedics",
                "experience": 18,
                "fee": 1800,
                "hospital": "Bone & Joint Hospital",
                "location": "Pune",
                "image_url": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
                "about": "Orthopedic surgeon specializing in joint replacement and sports injuries.",
                "languages": ["English", "Hindi", "Gujarati"],
                "availability_days": ["Mon", "Wed", "Fri", "Sat"]
            },
            {
                "email": "meera@example.com",
                "name": "Dr. Meera Reddy",
                "phone": "+91 98765 43224",
                "specialty_id": 3,
                "qualification": "MBBS, DM - Neurology",
                "experience": 14,
                "fee": 2000,
                "hospital": "Neuro Care Institute",
                "location": "Hyderabad",
                "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
                "about": "Neurologist with expertise in treating brain and nervous system disorders.",
                "languages": ["English", "Hindi", "Telugu"],
                "availability_days": ["Tue", "Thu", "Sat"]
            },
            {
                "email": "vikram@example.com",
                "name": "Dr. Vikram Singh",
                "phone": "+91 98765 43225",
                "specialty_id": 10,
                "qualification": "MBBS, MD - General Medicine",
                "experience": 8,
                "fee": 800,
                "hospital": "City General Hospital",
                "location": "Chennai",
                "image_url": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
                "about": "General physician providing comprehensive healthcare services.",
                "languages": ["English", "Hindi", "Tamil"],
                "availability_days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            }
        ]
        
        for doctor_data in doctors_data:
            user = models.User(
                id=str(uuid.uuid4()),
                email=doctor_data["email"],
                password_hash=get_password_hash("password123"),
                name=doctor_data["name"],
                phone=doctor_data["phone"],
                role="doctor"
            )
            db.add(user)
            db.commit()
            
            doctor = models.Doctor(
                id=str(uuid.uuid4()),
                user_id=user.id,
                specialty_id=doctor_data["specialty_id"],
                qualification=doctor_data["qualification"],
                experience=doctor_data["experience"],
                fee=doctor_data["fee"],
                hospital=doctor_data["hospital"],
                location=doctor_data["location"],
                rating=4.5 + (doctor_data["experience"] % 5) * 0.1,
                total_reviews=50 + (doctor_data["experience"] * 10),
                image_url=doctor_data["image_url"],
                about=doctor_data["about"],
                verified=True,
                languages=doctor_data["languages"],
                availability_days=doctor_data["availability_days"]
            )
            db.add(doctor)
        db.commit()
        print(f"✅ Created {len(doctors_data)} doctors")
        
        print("✅ Database seeding completed successfully!")
        print("\n📋 Login Credentials:")
        print("Admin: admin@example.com / admin123")
        print("Patient: john@example.com / password123")
        print("Doctor: sarah@example.com / password123")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
