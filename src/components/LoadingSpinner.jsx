import React from 'react';
import '../../src/styles/spinner.css'; // This is the custom CSS file for the spinner

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
