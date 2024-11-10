import React from 'react';

interface ModalProps {
  show: boolean;
  message: string;
  butonText: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, message, onClose,butonText }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <h2 className={message === 'Are you sure you want to delete this location?'?"text-xl text-black font-semibold mb-4":"text-xl text-green-600 font-semibold mb-4"}>{message}</h2>
          <button
            onClick={onClose}
            className={ butonText === 'Delete'? "mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:opacity-90":"mt-4 px-4 py-2 bg-[#F58E06] text-white font-semibold rounded-md hover:opacity-90"}
          >
            {butonText}
          </button>
        </div>
      </div>
    );
  };

export default Modal;
  