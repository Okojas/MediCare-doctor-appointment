// Mock data for Medical Appointment Platform

export const specialties = [
  { id: 1, name: 'Cardiology', icon: '❤️', description: 'Heart & cardiovascular system' },
  { id: 2, name: 'Dermatology', icon: '🧴', description: 'Skin, hair & nails' },
  { id: 3, name: 'Neurology', icon: '🧠', description: 'Brain & nervous system' },
  { id: 4, name: 'Pediatrics', icon: '👶', description: 'Children healthcare' },
  { id: 5, name: 'Orthopedics', icon: '🦴', description: 'Bones & joints' },
  { id: 6, name: 'Ophthalmology', icon: '👁️', description: 'Eye care' },
  { id: 7, name: 'Dentistry', icon: '🦷', description: 'Dental care' },
  { id: 8, name: 'ENT', icon: '👂', description: 'Ear, Nose & Throat' },
  { id: 9, name: 'Psychiatry', icon: '🧘', description: 'Mental health' },
  { id: 10, name: 'General Medicine', icon: '🏥', description: 'General healthcare' }
];

export const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    specialtyId: 1,
    qualification: 'MBBS, MD - Cardiology',
    experience: 15,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 245,
    fee: 1500,
    hospital: 'City Heart Hospital',
    location: 'Mumbai, Maharashtra',
    languages: ['English', 'Hindi', 'Marathi'],
    availability: ['Mon', 'Wed', 'Fri'],
    about: 'Experienced cardiologist specializing in heart disease prevention and treatment.',
    verified: true
  },
  {
    id: 2,
    name: 'Dr. Rajesh Kumar',
    specialty: 'Dermatology',
    specialtyId: 2,
    qualification: 'MBBS, MD - Dermatology',
    experience: 12,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 189,
    fee: 1200,
    hospital: 'Skin Care Clinic',
    location: 'Delhi',
    languages: ['English', 'Hindi'],
    availability: ['Tue', 'Thu', 'Sat'],
    about: 'Specialist in skin disorders, acne treatment, and cosmetic dermatology.',
    verified: true
  },
  {
    id: 3,
    name: 'Dr. Priya Sharma',
    specialty: 'Pediatrics',
    specialtyId: 4,
    qualification: 'MBBS, MD - Pediatrics',
    experience: 10,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 312,
    fee: 1000,
    hospital: 'Children Hospital',
    location: 'Bangalore',
    languages: ['English', 'Hindi', 'Kannada'],
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    about: 'Dedicated pediatrician with expertise in child healthcare and immunization.',
    verified: true
  },
  {
    id: 4,
    name: 'Dr. Amit Patel',
    specialty: 'Orthopedics',
    specialtyId: 5,
    qualification: 'MBBS, MS - Orthopedics',
    experience: 18,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 198,
    fee: 1800,
    hospital: 'Bone & Joint Hospital',
    location: 'Pune',
    languages: ['English', 'Hindi', 'Gujarati'],
    availability: ['Mon', 'Wed', 'Fri', 'Sat'],
    about: 'Orthopedic surgeon specializing in joint replacement and sports injuries.',
    verified: true
  },
  {
    id: 5,
    name: 'Dr. Meera Reddy',
    specialty: 'Neurology',
    specialtyId: 3,
    qualification: 'MBBS, DM - Neurology',
    experience: 14,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 167,
    fee: 2000,
    hospital: 'Neuro Care Institute',
    location: 'Hyderabad',
    languages: ['English', 'Hindi', 'Telugu'],
    availability: ['Tue', 'Thu', 'Sat'],
    about: 'Neurologist with expertise in treating brain and nervous system disorders.',
    verified: true
  },
  {
    id: 6,
    name: 'Dr. Vikram Singh',
    specialty: 'General Medicine',
    specialtyId: 10,
    qualification: 'MBBS, MD - General Medicine',
    experience: 8,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 142,
    fee: 800,
    hospital: 'City General Hospital',
    location: 'Chennai',
    languages: ['English', 'Hindi', 'Tamil'],
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    about: 'General physician providing comprehensive healthcare services.',
    verified: true
  }
];

export const timeSlots = [
  { id: 1, time: '09:00 AM', available: true },
  { id: 2, time: '09:30 AM', available: true },
  { id: 3, time: '10:00 AM', available: false },
  { id: 4, time: '10:30 AM', available: true },
  { id: 5, time: '11:00 AM', available: true },
  { id: 6, time: '11:30 AM', available: false },
  { id: 7, time: '12:00 PM', available: true },
  { id: 8, time: '02:00 PM', available: true },
  { id: 9, time: '02:30 PM', available: true },
  { id: 10, time: '03:00 PM', available: true },
  { id: 11, time: '03:30 PM', available: false },
  { id: 12, time: '04:00 PM', available: true },
  { id: 13, time: '04:30 PM', available: true },
  { id: 14, time: '05:00 PM', available: true },
  { id: 15, time: '05:30 PM', available: true },
  { id: 16, time: '06:00 PM', available: true }
];

export const appointments = [
  {
    id: 1,
    patientName: 'John Doe',
    patientAge: 35,
    patientGender: 'Male',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    date: '2025-01-25',
    time: '10:00 AM',
    status: 'confirmed',
    type: 'video',
    symptoms: 'Chest pain and breathing difficulty',
    fee: 1500,
    paymentStatus: 'paid'
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    patientAge: 28,
    patientGender: 'Female',
    doctorId: 2,
    doctorName: 'Dr. Rajesh Kumar',
    specialty: 'Dermatology',
    date: '2025-01-26',
    time: '02:30 PM',
    status: 'pending',
    type: 'in-person',
    symptoms: 'Skin rash and itching',
    fee: 1200,
    paymentStatus: 'pending'
  },
  {
    id: 3,
    patientName: 'Mike Johnson',
    patientAge: 5,
    patientGender: 'Male',
    doctorId: 3,
    doctorName: 'Dr. Priya Sharma',
    specialty: 'Pediatrics',
    date: '2025-01-24',
    time: '11:00 AM',
    status: 'completed',
    type: 'in-person',
    symptoms: 'Fever and cold',
    fee: 1000,
    paymentStatus: 'paid'
  }
];

export const medicalRecords = [
  {
    id: 1,
    patientId: 1,
    patientName: 'John Doe',
    type: 'Prescription',
    title: 'Cardiac Medication',
    date: '2025-01-15',
    doctor: 'Dr. Sarah Johnson',
    fileUrl: '#',
    notes: 'Follow-up required after 2 weeks'
  },
  {
    id: 2,
    patientId: 1,
    patientName: 'John Doe',
    type: 'Lab Report',
    title: 'Blood Test Results',
    date: '2025-01-10',
    doctor: 'Dr. Sarah Johnson',
    fileUrl: '#',
    notes: 'All parameters normal'
  },
  {
    id: 3,
    patientId: 1,
    patientName: 'John Doe',
    type: 'X-Ray',
    title: 'Chest X-Ray',
    date: '2025-01-05',
    doctor: 'Dr. Sarah Johnson',
    fileUrl: '#',
    notes: 'No abnormalities detected'
  }
];

export const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'patient',
    phone: '+91 98765 43210',
    age: 35,
    gender: 'Male',
    bloodGroup: 'O+',
    address: 'Mumbai, Maharashtra'
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    email: 'sarah@example.com',
    role: 'doctor',
    phone: '+91 98765 43211',
    specialty: 'Cardiology',
    qualification: 'MBBS, MD',
    experience: 15
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    phone: '+91 98765 43212'
  }
];