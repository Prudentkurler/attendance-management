import React, { useState } from 'react';

interface ModalProps {
  show: boolean;
  location: {
    id: string;
    name: string;
    country: string;
    branch: string;
    locationType: string;
    latitude: number;
    longitude: number;
    radius: number;
    lastUpdated: string;
    updatedBy: string;
  };
  onClose: () => void;
  onSave: (updatedLocation: any) => void;
}

const EditModal: React.FC<ModalProps> = ({ show, location, onClose, onSave }) => {
  const [editedLocation, setEditedLocation] = useState(location);

  // Handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  // Handle saving the edited location
  const handleSave = () => {
    onSave(editedLocation);  // Save the edited location
    onClose();  // Close the modal
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 w-[60%] rounded-lg shadow-lg text-center max-w-lg mx-auto">
        <h2 className="text-xl text-green-600 font-semibold mb-4">Edit Location</h2>

        {/* Location Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Location Name</label>
          <input
            type="text"
            name="name"
            value={editedLocation.name}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Country</label>
          <input
            type="text"
            name="country"
            value={editedLocation.country}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>

        {/* Branch */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Branch</label>
          <input
            type="text"
            name="branch"
            value={editedLocation.branch}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>

        {/* Location Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Location Type</label>
          <input
            type="text"
            name="locationType"
            value={editedLocation.locationType}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>

        {/* Latitude */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Latitude</label>
          <input
            type="number"
            name="latitude"
            value={editedLocation.latitude}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>

        {/* Longitude */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Longitude</label>
          <input
            type="number"
            name="longitude"
            value={editedLocation.longitude}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>

        {/* Radius */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold">Radius</label>
          <input
            type="number"
            name="radius"
            value={editedLocation.radius}
            onChange={handleChange}
            className="w-full p-2 border-2 border-gray-300 rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:opacity-90"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#F58E06] text-white font-semibold rounded-md hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
