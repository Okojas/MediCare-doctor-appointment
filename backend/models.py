from sqlalchemy import Column, String, Integer, DateTime, Boolean, Enum, Numeric, Text, ForeignKey, Date, Time, JSON
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime
from database import Base
import enum

class UserRole(str, enum.Enum):
    patient = "patient"
    doctor = "doctor"
    admin = "admin"

class AppointmentStatus(str, enum.Enum):
    pending = "pending"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"

class AppointmentType(str, enum.Enum):
    video = "video"
    in_person = "in-person"

class PaymentStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    refunded = "refunded"

class RecordType(str, enum.Enum):
    prescription = "prescription"
    lab_report = "lab_report"
    xray = "xray"
    scan = "scan"
    other = "other"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String)
    role = Column(Enum(UserRole), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    patient_profile = relationship("Patient", back_populates="user", uselist=False)
    doctor_profile = relationship("Doctor", back_populates="user", uselist=False)

class Patient(Base):
    __tablename__ = "patients"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    age = Column(Integer)
    gender = Column(String)
    blood_group = Column(String)
    address = Column(Text)

    # Relationships
    user = relationship("User", back_populates="patient_profile")
    appointments = relationship("Appointment", foreign_keys="Appointment.patient_id", back_populates="patient")
    medical_records = relationship("MedicalRecord", back_populates="patient")

class Specialty(Base):
    __tablename__ = "specialties"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text)
    icon = Column(String)

    # Relationships
    doctors = relationship("Doctor", back_populates="specialty")

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    specialty_id = Column(Integer, ForeignKey("specialties.id"))
    qualification = Column(String)
    experience = Column(Integer)
    fee = Column(Numeric(10, 2))
    hospital = Column(String)
    location = Column(String)
    rating = Column(Numeric(3, 2), default=0)
    total_reviews = Column(Integer, default=0)
    image_url = Column(String)
    about = Column(Text)
    verified = Column(Boolean, default=False)
    languages = Column(ARRAY(String))
    availability_days = Column(ARRAY(String))

    # Relationships
    user = relationship("User", back_populates="doctor_profile")
    specialty = relationship("Specialty", back_populates="doctors")
    appointments = relationship("Appointment", foreign_keys="Appointment.doctor_id", back_populates="doctor")
    medical_records = relationship("MedicalRecord", back_populates="doctor")

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.pending)
    type = Column(Enum(AppointmentType), nullable=False)
    symptoms = Column(Text)
    fee = Column(Numeric(10, 2))
    payment_status = Column(Enum(PaymentStatus), default=PaymentStatus.pending)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    patient = relationship("Patient", foreign_keys=[patient_id], back_populates="appointments")
    doctor = relationship("Doctor", foreign_keys=[doctor_id], back_populates="appointments")

class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    patient_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    doctor_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    appointment_id = Column(UUID(as_uuid=True), ForeignKey("appointments.id"))
    type = Column(Enum(RecordType), nullable=False)
    title = Column(String, nullable=False)
    file_url = Column(String)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    patient = relationship("Patient", back_populates="medical_records")
    doctor = relationship("Doctor", back_populates="medical_records")