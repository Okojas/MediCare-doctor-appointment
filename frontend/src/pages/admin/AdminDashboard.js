import React from 'react';
import { Users, Calendar, Stethoscope, TrendingUp, Activity } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import { appointments, doctors, users } from '../../data/medicalMock';

const AdminDashboard = () => {
  const totalPatients = users.filter(u => u.role === 'patient').length;
  const totalDoctors = doctors.length;
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;

  const stats = [
    { label: 'Total Patients', value: '1,234', color: 'blue', icon: Users, change: '+12%' },
    { label: 'Total Doctors', value: totalDoctors.toString(), color: 'green', icon: Stethoscope, change: '+5%' },
    { label: 'Appointments', value: '856', color: 'purple', icon: Calendar, change: '+18%' },
    { label: 'Revenue', value: '₹4.2L', color: 'orange', icon: TrendingUp, change: '+23%' }
  ];

  const recentAppointments = appointments.slice(0, 5);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and management</p>
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
                  <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Appointments</h2>
            <div className="space-y-3">
              {recentAppointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{apt.patientName}</p>
                    <p className="text-sm text-gray-600">{apt.doctorName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Doctors */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top Doctors</h2>
            <div className="space-y-3">
              {doctors.slice(0, 5).map((doctor) => (
                <div key={doctor.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">⭐ {doctor.rating}</p>
                    <p className="text-xs text-gray-500">{doctor.reviews} reviews</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 text-left transition-colors shadow-md">
            <Users size={28} className="mb-3" />
            <h3 className="text-lg font-bold mb-1">Manage Patients</h3>
            <p className="text-blue-100 text-sm">View all patients</p>
          </button>

          <button className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-6 text-left transition-colors shadow-md">
            <Stethoscope size={28} className="mb-3" />
            <h3 className="text-lg font-bold mb-1">Manage Doctors</h3>
            <p className="text-green-100 text-sm">Add/Edit doctors</p>
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-6 text-left transition-colors shadow-md">
            <Calendar size={28} className="mb-3" />
            <h3 className="text-lg font-bold mb-1">Appointments</h3>
            <p className="text-purple-100 text-sm">View all bookings</p>
          </button>

          <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl p-6 text-left transition-colors shadow-md">
            <Activity size={28} className="mb-3" />
            <h3 className="text-lg font-bold mb-1">Reports</h3>
            <p className="text-orange-100 text-sm">System analytics</p>
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;