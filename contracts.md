# API Contracts - Medical Appointment Platform

## Backend Architecture
- **Framework**: FastAPI
- **Database**: PostgreSQL
- **Authentication**: JWT-based
- **File Storage**: Local file system (for MVP)

## Database Models

### 1. Users Table
```python
- id: UUID (Primary Key)
- email: String (Unique)
- password_hash: String
- name: String
- phone: String
- role: Enum('patient', 'doctor', 'admin')
- created_at: DateTime
- updated_at: DateTime
```

### 2. Patients Table (extends Users)
```python
- user_id: UUID (Foreign Key -> Users)
- age: Integer
- gender: String
- blood_group: String
- address: Text
- medical_history: JSON
```

### 3. Doctors Table (extends Users)
```python
- user_id: UUID (Foreign Key -> Users)
- specialty_id: Integer (Foreign Key -> Specialties)
- qualification: String
- experience: Integer
- fee: Decimal
- hospital: String
- location: String
- rating: Decimal (default: 0)
- total_reviews: Integer (default: 0)
- image_url: String
- about: Text
- verified: Boolean (default: False)
- languages: Array[String]
- availability_days: Array[String]
```

### 4. Specialties Table
```python
- id: Integer (Primary Key)
- name: String (Unique)
- description: Text
- icon: String
```

### 5. Appointments Table
```python
- id: UUID (Primary Key)
- patient_id: UUID (Foreign Key -> Users)
- doctor_id: UUID (Foreign Key -> Users)
- date: Date
- time: Time
- status: Enum('pending', 'confirmed', 'completed', 'cancelled')
- type: Enum('video', 'in-person')
- symptoms: Text
- fee: Decimal
- payment_status: Enum('pending', 'paid', 'refunded')
- created_at: DateTime
- updated_at: DateTime
```

### 6. MedicalRecords Table
```python
- id: UUID (Primary Key)
- patient_id: UUID (Foreign Key -> Users)
- doctor_id: UUID (Foreign Key -> Users)
- appointment_id: UUID (Foreign Key -> Appointments, nullable)
- type: Enum('prescription', 'lab_report', 'xray', 'scan', 'other')
- title: String
- file_url: String
- notes: Text
- created_at: DateTime
```

### 7. DoctorAvailability Table
```python
- id: UUID (Primary Key)
- doctor_id: UUID (Foreign Key -> Users)
- day_of_week: Integer (0-6, Monday-Sunday)
- start_time: Time
- end_time: Time
- is_available: Boolean
```

## API Endpoints

### Authentication APIs (`/api/auth`)

#### POST /api/auth/register
**Request:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string",
  "phone": "string",
  "role": "patient|doctor",
  "age": 25,
  "gender": "string"
}
```
**Response:**
```json
{
  "user": { user_object },
  "access_token": "string",
  "token_type": "bearer"
}
```

#### POST /api/auth/login
**Request:**
```json
{
  "email": "string",
  "password": "string",
  "role": "patient|doctor|admin"
}
```
**Response:**
```json
{
  "user": { user_object },
  "access_token": "string",
  "token_type": "bearer"
}
```

#### GET /api/auth/me
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "user": { user_object_with_profile }
}
```

### Doctor APIs (`/api/doctors`)

#### GET /api/doctors
**Query Params:** 
- specialty: string (optional)
- search: string (optional)
- limit: int (default: 20)
- offset: int (default: 0)

**Response:**
```json
{
  "doctors": [{ doctor_objects }],
  "total": 156
}
```

#### GET /api/doctors/{doctor_id}
**Response:**
```json
{
  "doctor": { full_doctor_object }
}
```

### Appointment APIs (`/api/appointments`)

#### POST /api/appointments
**Headers:** Authorization: Bearer {token}
**Request:**
```json
{
  "doctor_id": "uuid",
  "date": "2025-01-25",
  "time": "10:00",
  "type": "video|in-person",
  "symptoms": "string"
}
```
**Response:**
```json
{
  "appointment": { appointment_object },
  "message": "Appointment booked successfully"
}
```

#### GET /api/appointments
**Headers:** Authorization: Bearer {token}
**Query Params:**
- status: string (optional)
- role: patient|doctor (auto-detected from token)

**Response:**
```json
{
  "appointments": [{ appointment_objects }]
}
```

#### PATCH /api/appointments/{appointment_id}/status
**Headers:** Authorization: Bearer {token}
**Request:**
```json
{
  "status": "confirmed|cancelled|completed"
}
```

### Admin APIs (`/api/admin`)

#### GET /api/admin/stats
**Headers:** Authorization: Bearer {admin_token}
**Response:**
```json
{
  "total_patients": 1234,
  "total_doctors": 56,
  "total_appointments": 856,
  "revenue": 420000
}
```

#### GET /api/admin/doctors
**Response:** List of all doctors with management options

#### GET /api/admin/patients  
**Response:** List of all patients with management options

## Frontend-Backend Integration Points

### Mock Data Replacement:
1. **medicalMock.js** → Replace with API calls
2. **AuthContext.js** → Integrate with `/api/auth/*` endpoints
3. **Patient Dashboard** → Fetch from `/api/appointments` and `/api/doctors`
4. **Find Doctors** → Fetch from `/api/doctors`
5. **Book Appointment** → POST to `/api/appointments`
6. **Doctor Dashboard** → Fetch appointments for specific doctor
7. **Admin Dashboard** → Fetch from `/api/admin/stats`

### Authentication Flow:
1. Login/Register → Get JWT token
2. Store token in localStorage
3. Add Authorization header to all API requests
4. Redirect based on user role

### Error Handling:
- 401: Redirect to login
- 403: Show unauthorized message
- 500: Show server error message
- Validation errors: Show field-specific errors
