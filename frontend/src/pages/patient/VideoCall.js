import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, MessageSquare, ArrowLeft } from 'lucide-react';
import PatientLayout from '../../layouts/PatientLayout';
import { useAuth } from '../../context/AuthContext';
import { appointmentAPI } from '../../services/api';

const VideoCall = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    initializeCall();
    return () => {
      cleanupCall();
    };
  }, [initializeCall]);

  useEffect(() => {
    let interval;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const initializeCall = async () => {
    try {
      setLoading(true);
      
      // Get video token from backend
      const response = await appointmentAPI.getVideoToken(appointmentId);
      const { token, room_name } = response;
      
      // Mock video call setup
      // In production, initialize real video service here
      await setupMockVideoCall(token, room_name);
      
      setIsConnected(true);
      setLoading(false);
    } catch (err) {
      console.error('Failed to initialize call:', err);
      setError('Failed to join video call. Please try again.');
      setLoading(false);
    }
  };

  const setupMockVideoCall = async (token, roomName) => {
    // Mock video stream setup
    // In production, use actual WebRTC with video service
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      // Mock remote video after 2 seconds
      setTimeout(() => {
        if (remoteVideoRef.current) {
          // Create a mock remote stream (in production, this would be the other participant)
          const mockRemoteStream = new MediaStream();
          remoteVideoRef.current.srcObject = mockRemoteStream;
        }
      }, 2000);
      
    } catch (err) {
      console.error('Failed to access camera/microphone:', err);
      throw new Error('Camera and microphone access required for video call');
    }
  };

  const cleanupCall = () => {
    // Stop local video stream
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleMute = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject;
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const endCall = () => {
    cleanupCall();
    navigate('/patient/appointments');
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: user?.name || 'You',
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString()
      }]);
      setNewMessage('');
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <PatientLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Joining video call...</p>
          </div>
        </div>
      </PatientLayout>
    );
  }

  if (error) {
    return (
      <PatientLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-4">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => navigate('/patient/appointments')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Back to Appointments
              </button>
            </div>
          </div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="h-screen bg-gray-900 relative">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gray-800 bg-opacity-90 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/patient/appointments')}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <p className="text-white font-medium">Video Consultation</p>
                <p className="text-gray-300 text-sm">{formatDuration(callDuration)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className={`p-3 rounded-full transition-colors ${
                  showChat ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <MessageSquare size={20} />
              </button>
              
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full transition-colors ${
                  isMuted ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOff ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
              </button>
              
              <button
                onClick={endCall}
                className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <PhoneOff size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Video Area */}
        <div className="h-full flex">
          {/* Remote Video (Doctor) */}
          <div className="flex-1 relative">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              style={{ backgroundColor: '#1a1a1a' }}
            />
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
              Doctor
            </div>
          </div>

          {/* Local Video (Patient) */}
          <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
              You
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="absolute right-0 top-20 bottom-20 w-80 bg-white shadow-lg rounded-l-lg">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Chat</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map(msg => (
                  <div key={msg.id} className="mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-sm text-gray-900">{msg.sender}:</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default VideoCall;
