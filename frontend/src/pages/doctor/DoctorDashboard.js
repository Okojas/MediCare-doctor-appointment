import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import DoctorLayout from '../../layouts/DoctorLayout';
import { useAuth } from '../../context/AuthContext';
import { appointments } from '../../data/medicalMock';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Filter appointments for this doctor (mock - would come from API)
  const todayAppointments = appointments.filter(apt => apt.status === 'confirmed').slice(0, 4);
  
  const stats = [
    { label: 'Today\'s Appointments', value: '8', color: 'blue', icon: Calendar },
    { label: 'Total Patients', value: '156', color: 'green', icon: Users },
    { label: 'Completed Today', value: '5', color: 'purple', icon: CheckCircle },
    { label: 'Pending', value: '3', color: 'orange', icon: AlertCircle }
  ];

  return (
    <DoctorLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-600">Here's your schedule for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                    <Icon className={`text-${stat.color}-600`} size={24} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Today's Appointments</h2>
            <button className="text-green-600 hover:text-green-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-green-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{apt.patientName}</h3>
                  <p className="text-sm text-gray-600">{apt.symptoms}</p>
                  <div className="flex gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {apt.time}
                    </span>
                    <span>{apt.type === 'video' ? 'Video Call' : 'In-Person'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {apt.type === 'video' && (
                    <button 
                      onClick={() => navigate(`/patient/video-call/${apt.id}`)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Start Call
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-6 text-left transition-colors shadow-md">
            <Clock size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Manage Availability</h3>
            <p className="text-green-100">Set your working hours</p>
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 text-left transition-colors shadow-md">
            <Users size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Patient Records</h3>
            <p className="text-blue-100">View patient history</p>
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-6 text-left transition-colors shadow-md">
            <TrendingUp size={32} className="mb-3" />
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-purple-100">View your stats</p>
          </button>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;