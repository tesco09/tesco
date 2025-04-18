import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-scroll mt-[10%] shadow-md rounded-md">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative mt-[50%]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
