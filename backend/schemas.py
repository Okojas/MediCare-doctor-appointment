from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, date, time
from decimal import Decimal
import uuid

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: str
    age: Optional[int] = None
    gender: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: str

class UserResponse(UserBase):
    id: uuid.UUID
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

# Patient Schemas
class PatientProfile(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    address: Optional[str] = None

    class Config:
        from_attributes = True

# Doctor Schemas
class DoctorCreate(BaseModel):
    specialty_id: int
    qualification: str
    experience: int
    fee: Decimal
    hospital: str
    location: str
    about: str
    languages: List[str]
    availability_days: List[str]

class DoctorResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    specialty_id: int
    qualification: str
    experience: int
    fee: Decimal
    hospital: str
    location: str
    rating: Decimal
    total_reviews: int
    image_url: Optional[str] = None
    about: str
    verified: bool
    languages: List[str]
    availability_days: List[str]
    user: UserResponse
    specialty: Optional[dict] = None

    class Config:
        from_attributes = True

# Appointment Schemas
class AppointmentCreate(BaseModel):
    doctor_id: uuid.UUID
    date: date
    time: time
    type: str  # 'video' or 'in-person'
    symptoms: str

class AppointmentUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None

class AppointmentResponse(BaseModel):
    id: uuid.UUID
    patient_id: uuid.UUID
    doctor_id: uuid.UUID
    date: date
    time: time
    status: str
    type: str
    symptoms: str
    fee: Decimal
    payment_status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Auth Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Admin Stats
class AdminStats(BaseModel):
    total_patients: int
    total_doctors: int
    total_appointments: int
    revenue: Decimal
