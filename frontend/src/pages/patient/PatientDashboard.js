import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Star, Video, FileText } from 'lucide-react';
import PatientLayout from '../../layouts/PatientLayout';
import { useAuth } from '../../context/AuthContext';
import { appointments, doctors } from '../../data/medicalMock';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const upcomingAppointments = appointments.filter(apt => apt.status !== 'completed').slice(0, 3);
  const recentDoctors = doctors.slice(0, 4);

  const stats = [
    { label: 'Upcoming Appointments', value: '3', color: 'blue' },
    { label: 'Completed Visits', value: '12', color: 'green' },
    { label: 'Medical Records', value: '8', color: 'purple' },
    { label: 'Prescriptions', value: '5', color: 'orange' }
  ];

  return (
    <PatientLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's your health overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate('/patient/find-doctor')}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 text-left transition-colors shadow-md hover:shadow-lg"
          >
            <Calendar size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Book Appointment</h3>
            <p className="text-blue-100">Find and book doctors</p>
          </button>

          <button
            onClick={() => navigate('/patient/find-doctor?emergency=true')}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl p-6 text-left transition-colors shadow-md hover:shadow-lg"
          >
            <Clock size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Emergency Booking</h3>
            <p className="text-red-100">Urgent consultation</p>
          </button>

          <button
            onClick={() => navigate('/patient/records')}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-6 text-left transition-colors shadow-md hover:shadow-lg"
          >
            <FileText size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Medical Records</h3>
            <p className="text-green-100">View your records</p>
          </button>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Appointments</h2>
            <button
              onClick={() => navigate('/patient/appointments')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="text-blue-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{apt.doctorName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{apt.specialty}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(apt.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {apt.time}
                          </span>
                          <span className="flex items-center gap-1">
                            {apt.type === 'video' ? <Video size={14} /> : <MapPin size={14} />}
                            {apt.type === 'video' ? 'Video Call' : 'In-Person'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {apt.type === 'video' && (
                      <button 
                        onClick={() => navigate(`/patient/video-call/${apt.id}`)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Join Call
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
            )}
          </div>
        </div>

        {/* Find Doctors */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Rated Doctors</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h3 className="font-semibold text-gray-900 text-center mb-1">{doctor.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-2">{doctor.specialty}</p>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-gray-500">({doctor.reviews})</span>
                </div>
                <button className="w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;