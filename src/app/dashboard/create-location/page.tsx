"use client"
import React, { useState } from 'react';
import  Modal  from '@/components/attendance/Modal';

const page: React.FC = () => {
  const [country, setCountry] = useState('');
  const [branch, setBranch] = useState('');
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [wifiId, setWifiId] = useState('');
  const [bluetoothDeviceId, setBluetoothDeviceId] = useState('');
  const [radius, setRadius] = useState(0.02);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleGenerateCoordinates = () => {
    if (!navigator.geolocation) {
      setNotification("Geolocation is not supported by your browser.");
      return;
    }
    
    setIsGenerating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setIsGenerating(false);
        setNotification("Coordinates successfully generated.");
      },
      (error) => {
        setIsGenerating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setNotification("Permission denied for location access.");
            break;
          case error.POSITION_UNAVAILABLE:
            setNotification("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setNotification("Location request timed out.");
            break;
          default:
            setNotification("An unknown error occurred.");
            break;
        }
      }
    );
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the location details
    const locationDetails = {
      country,
      branch,
      locationName,
      latitude,
      longitude,
      wifiId,
      bluetoothDeviceId,
      radius,
    };
    console.log('Location Created:', locationDetails);

    // Simulate sending SMS and email notifications (replace with actual implementation)
    setShowModal(true);
  };

  return (
    <div className="create-location-form bg-gray-700 w-full md:w-[80%] md:mx-auto text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Create Location</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Country:</label>
          <select 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
          >
            <option value="">Select Country</option>
            {/* Add country options here */}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Branch:</label>
          <select 
            value={branch} 
            onChange={(e) => setBranch(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
          >
            <option value="">Select Branch</option>
            {/* Add branch options here */}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Location Name:</label>
          <input 
            type="text" 
            value={locationName} 
            onChange={(e) => setLocationName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Latitude:</label>
          <input 
            type="text" 
            value={latitude} 
            onChange={(e) => setLatitude(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Longitude:</label>
          <input 
            type="text" 
            value={longitude} 
            onChange={(e) => setLongitude(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
          />
        </div>
        
        <div className="mb-4">
          <button 
            type="button" 
            onClick={handleGenerateCoordinates} 
            disabled={isGenerating}
            className="mt-1 block w-full p-2 transition duration-300 ease-in-out bg-blue-600 text-white font-semibold rounded-md hover:opacity-90"
          >
            {isGenerating ? 'Generating...' : 'Generate Coordinates'}
          </button>
        </div>

        {notification && <p className="text-green-400">{notification}</p>}
        
        <div className="mb-4">
          <label className="block text-sm font-medium">WiFi ID:</label>
          <input 
            type="text" 
            value={wifiId} 
            onChange={(e) => setWifiId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Bluetooth Device ID:</label>
          <input 
            type="text" 
            value={bluetoothDeviceId} 
            onChange={(e) => setBluetoothDeviceId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Radius (km):</label>
          <input 
            type="number" 
            step="0.01" 
            value={radius} 
            onChange={(e) => setRadius(parseFloat(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-700 text-white"
          />
        </div>
        
        <div>
          <button 
            type="submit" 
            className="mt-1 block w-full p-2 bg-[#F58E06] text-white font-semibold transitio duration-300 ease-in-out  rounded-md hover:opacity-90"
          >
            Create Location
          </button>
        </div>
      </form>

          {/* Modal Component */}
          <Modal 
        show={showModal} 
        butonText='Close'
        message="Location created successfully!"
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default page;
