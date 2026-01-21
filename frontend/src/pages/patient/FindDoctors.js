import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Clock, Video } from 'lucide-react';
import PatientLayout from '../../layouts/PatientLayout';
import { doctorAPI } from '../../services/api';
import { specialties } from '../../data/medicalMock';

const FindDoctors = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEmergency = searchParams.get('emergency') === 'true';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialty, searchTerm]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedSpecialty !== 'all') params.specialty = selectedSpecialty;
      if (searchTerm) params.search = searchTerm;
      
      const data = await doctorAPI.getAll(params);
      setDoctors(data.doctors || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors;

  return (
    <PatientLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEmergency ? 'Emergency Booking' : 'Find Doctors'}
          </h1>
          <p className="text-gray-600">
            {isEmergency ? 'Find available doctors for immediate consultation' : 'Browse and book appointments with qualified doctors'}
          </p>
        </div>

        {isEmergency && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <strong>Emergency Mode:</strong> Showing doctors with immediate availability. For life-threatening emergencies, call 108.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Specialty Filter */}
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty.id} value={specialty.name}>{specialty.name}</option>
                ))}
              </select>
            </div>

            {/* Consultation Type */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="video">Video Consultation</option>
                <option value="in-person">In-Person Visit</option>
              </select>
            </div>
          </div>
        </div>

        {/* Specialties Grid */}
        {!searchTerm && selectedSpecialty === 'all' && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Browse by Specialty</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {specialties.slice(0, 10).map(specialty => (
                <button
                  key={specialty.id}
                  onClick={() => setSelectedSpecialty(specialty.name)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-center"
                >
                  <div className="text-3xl mb-2">{specialty.icon}</div>
                  <p className="text-sm font-medium text-gray-900">{specialty.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Found <strong>{filteredDoctors.length}</strong> doctors
          </p>
          {selectedSpecialty !== 'all' && (
            <button
              onClick={() => setSelectedSpecialty('all')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredDoctors.map(doctor => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(`/patient/doctor/${doctor.id}`)}
            >
              <div className="flex gap-4">
                {/* Doctor Image */}
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />

                {/* Doctor Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                    </div>
                    {doctor.verified && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{doctor.qualification}</p>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {doctor.experience} years exp.
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {doctor.location}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-gray-900">{doctor.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">₹{doctor.fee}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/patient/doctor/${doctor.id}`);
                    }}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Filter size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">No doctors found</p>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default FindDoctors;