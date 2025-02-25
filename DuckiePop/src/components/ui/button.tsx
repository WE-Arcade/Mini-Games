import React from "react";

interface ButtonProps {
  children: React.ReactNode; // Content inside the button
  onClick?: () => void; // Function to handle button clicks
  disabled?: boolean; // Indicates if the button is disabled
  className?: string; // Additional CSS classes
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

export default Button;
