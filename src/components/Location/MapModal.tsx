import React from 'react';

interface MapModalProps {
  latitude: string;
  longitude: string;
  location: { name: string };
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ latitude, longitude, onClose,location }) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Location Map: {location.name}</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            &times;
          </button>
        </div>
        <div className="relative h-96 w-full">
          <iframe
            src={googleMapsUrl}
            className="w-full h-full rounded-md"
            loading="lazy"
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
