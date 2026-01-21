import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import PatientLayout from '../../layouts/PatientLayout';
import { appointmentAPI } from '../../services/api';

const PatientAppointments = () => {
  const [filter, setFilter] = useState('all');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentAPI.getAll();
      setAppointments(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const statusConfig = {
    confirmed: { color: 'green', icon: CheckCircle, label: 'Confirmed' },
    pending: { color: 'yellow', icon: AlertCircle, label: 'Pending' },
    completed: { color: 'blue', icon: CheckCircle, label: 'Completed' },
    cancelled: { color: 'red', icon: XCircle, label: 'Cancelled' }
  };

  const filteredAppointments = filter === 'all' 
    ? appointments 
    : appointments.filter(apt => apt.status === filter);

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await appointmentAPI.cancel(id);
        alert('Appointment cancelled successfully');
        fetchAppointments(); // Refresh list
      } catch (error) {
        console.error('Cancel error:', error);
        alert('Failed to cancel appointment');
      }
    }
  };

  const handleReschedule = (id) => {
    alert('Reschedule feature: Please contact support or cancel and book a new appointment');
  };

  return (
    <PatientLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage your appointments</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({appointments.length})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'confirmed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Confirmed ({appointments.filter(a => a.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({appointments.filter(a => a.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed ({appointments.filter(a => a.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchAppointments}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => {
              const StatusIcon = statusConfig[apt.status]?.icon || AlertCircle;
              const statusColor = statusConfig[apt.status]?.color || 'gray';
              
              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Left - Appointment Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{apt.doctorName}</h3>
                          <p className="text-blue-600 font-medium mb-2">{apt.specialty}</p>
                        </div>
                        <span className={`flex items-center gap-1 px-3 py-1 bg-${statusColor}-100 text-${statusColor}-700 rounded-full text-sm font-medium`}>
                          <StatusIcon size={16} />
                          {statusConfig[apt.status]?.label}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={18} className="text-gray-400" />
                          <span>{new Date(apt.date).toLocaleDateString('en-IN', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock size={18} className="text-gray-400" />
                          <span>{apt.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          {apt.type === 'video' ? (
                            <Video size={18} className="text-gray-400" />
                          ) : (
                            <MapPin size={18} className="text-gray-400" />
                          )}
                          <span>{apt.type === 'video' ? 'Video Consultation' : 'In-Person Visit'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-medium">Fee:</span>
                          <span>₹{apt.fee}</span>
                          <span className={`ml-2 px-2 py-0.5 rounded text-xs ${
                            apt.paymentStatus === 'paid'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {apt.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                          </span>
                        </div>
                      </div>

                      {apt.symptoms && (
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">
                            <strong>Symptoms:</strong> {apt.symptoms}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right - Actions */}
                    <div className="flex lg:flex-col gap-2 lg:w-40">
                      {apt.status === 'confirmed' && apt.type === 'video' && (
                        <button className="flex-1 lg:flex-none px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm">
                          Join Call
                        </button>
                      )}
                      {apt.status === 'confirmed' && (
                        <button
                          onClick={() => handleReschedule(apt.id)}
                          className="flex-1 lg:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          Reschedule
                        </button>
                      )}
                      {(apt.status === 'confirmed' || apt.status === 'pending') && (
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="flex-1 lg:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      )}
                      {apt.status === 'completed' && (
                        <button className="flex-1 lg:flex-none px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors text-sm">
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
              <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-6">You don't have any {filter !== 'all' ? filter : ''} appointments yet.</p>
              <button
                onClick={() => window.location.href = '/patient/find-doctor'}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Book an Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientAppointments;