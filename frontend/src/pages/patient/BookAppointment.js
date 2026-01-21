import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, Video, MapPin, User, CreditCard, CheckCircle } from 'lucide-react';
import PatientLayout from '../../layouts/PatientLayout';
import { useAuth } from '../../context/AuthContext';
import { appointmentAPI } from '../../services/api';

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { doctor, date, time, type } = location.state || {};

  const [symptoms, setSymptoms] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  if (!doctor) {
    navigate('/patient/find-doctor');
    return null;
  }

  const handleBooking = async () => {
    setIsBooking(true);
    try {
      // Create appointment via API
      const appointmentData = {
        doctor_id: doctor.user_id,
        date: date,
        time: time,
        type: type,
        symptoms: symptoms
      };
      
      await appointmentAPI.create(appointmentData);
      
      setIsBooking(false);
      setBookingComplete(true);
      setTimeout(() => {
        navigate('/patient/appointments');
      }, 2000);
    } catch (error) {
      console.error('Booking error:', error);
      setIsBooking(false);
      alert(error.response?.data?.detail || 'Failed to book appointment. Please try again.');
    }
  };

  if (bookingComplete) {
    return (
      <PatientLayout>
        <div className="max-w-2xl mx-auto py-12 text-center">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your appointment has been successfully booked.
          </p>
          <button
            onClick={() => navigate('/patient/appointments')}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            View Appointments
          </button>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Confirm Appointment</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Appointment Details</h2>
              
              <div className="flex gap-4 mb-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  <p className="text-sm text-gray-600">{doctor.qualification}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar size={20} className="text-gray-400" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock size={20} className="text-gray-400" />
                  <span>{time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  {type === 'video' ? (
                    <Video size={20} className="text-gray-400" />
                  ) : (
                    <MapPin size={20} className="text-gray-400" />
                  )}
                  <span>{type === 'video' ? 'Video Consultation' : 'In-Person Visit'}</span>
                </div>
              </div>
            </div>

            {/* Patient Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Patient Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={user?.name || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={user?.age || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <input
                    type="text"
                    value={user?.gender || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={user?.phone || ''}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Symptoms */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Reason for Visit</h2>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows="4"
                placeholder="Please describe your symptoms or reason for consultation..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <CreditCard size={24} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Credit/Debit Card</p>
                    <p className="text-sm text-gray-500">Pay securely with your card</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <User size={24} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">UPI</p>
                    <p className="text-sm text-gray-500">Pay using UPI apps</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <CreditCard size={24} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Wallet</p>
                    <p className="text-sm text-gray-500">Pay using digital wallet</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right - Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Consultation Fee</span>
                  <span className="font-medium">₹{doctor.fee}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Platform Fee</span>
                  <span className="font-medium">₹50</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">-₹50</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{doctor.fee}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={isBooking || !symptoms}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mb-4"
              >
                {isBooking ? 'Booking...' : 'Confirm & Pay'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By booking, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default BookAppointment;