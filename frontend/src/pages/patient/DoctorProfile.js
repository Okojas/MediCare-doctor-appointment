import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Award, Languages, Calendar, Video, User as UserIcon, ArrowLeft } from 'lucide-react';
import PatientLayout from '../../layouts/PatientLayout';
import { doctors, timeSlots } from '../../data/medicalMock';

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [consultationType, setConsultationType] = useState('video');

  const doctor = doctors.find(d => d.id === parseInt(doctorId));

  if (!doctor) {
    return (
      <PatientLayout>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Doctor not found</p>
          <button
            onClick={() => navigate('/patient/find-doctor')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Browse Doctors
          </button>
        </div>
      </PatientLayout>
    );
  }

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const availableDates = getNextDays();

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    // Navigate to booking confirmation
    navigate('/patient/book-appointment', {
      state: {
        doctor,
        date: selectedDate,
        time: selectedTime,
        type: consultationType
      }
    });
  };

  return (
    <PatientLayout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Header Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex gap-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">{doctor.name}</h1>
                      <p className="text-lg text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                    </div>
                    {doctor.verified && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 mb-4">{doctor.qualification}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-gray-700">{doctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="text-gray-700">{doctor.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-lg">
                      <Star size={20} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-900">{doctor.rating}</span>
                      <span className="text-gray-600">({doctor.reviews} reviews)</span>
                    </div>
                    <div className="px-4 py-2 bg-blue-50 rounded-lg">
                      <span className="text-2xl font-bold text-blue-600">₹{doctor.fee}</span>
                      <span className="text-sm text-gray-600 ml-1">/ session</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Details Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Qualification</h3>
                </div>
                <p className="text-gray-600">{doctor.qualification}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Languages size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Languages</h3>
                </div>
                <p className="text-gray-600">{doctor.languages.join(', ')}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Book Appointment</h2>

              {/* Consultation Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Consultation Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setConsultationType('video')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      consultationType === 'video'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Video className={`mx-auto mb-1 ${
                      consultationType === 'video' ? 'text-blue-600' : 'text-gray-400'
                    }`} size={24} />
                    <p className={`text-sm font-medium ${
                      consultationType === 'video' ? 'text-blue-600' : 'text-gray-600'
                    }`}>Video Call</p>
                  </button>
                  <button
                    onClick={() => setConsultationType('in-person')}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      consultationType === 'in-person'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <UserIcon className={`mx-auto mb-1 ${
                      consultationType === 'in-person' ? 'text-blue-600' : 'text-gray-400'
                    }`} size={24} />
                    <p className={`text-sm font-medium ${
                      consultationType === 'in-person' ? 'text-blue-600' : 'text-gray-600'
                    }`}>In-Person</p>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableDates.map((date, index) => {
                    const isSelected = selectedDate === date.toDateString();
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(date.toDateString())}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className={`text-xs ${
                          isSelected ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <p className={`text-lg font-bold ${
                          isSelected ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {date.getDate()}
                        </p>
                        <p className={`text-xs ${
                          isSelected ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {date.toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-2 border-2 rounded-lg text-sm font-medium transition-all ${
                          selectedTime === slot.time
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : slot.available
                            ? 'border-gray-200 hover:border-gray-300 text-gray-700'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue to Book
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                You can reschedule or cancel up to 2 hours before appointment
              </p>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default DoctorProfile;