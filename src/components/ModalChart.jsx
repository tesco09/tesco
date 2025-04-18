import { faCancel, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999] overflow-hidden">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md relative  h-[450px] overflow-scroll w-[80%] pb-4">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                >
                    <FontAwesomeIcon icon={faClose} className='h-[12px] w-[12px] border-[1.5px] rounded-full text-red-500  border-red-500 ' />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
