import React, { ChangeEvent } from "react";

interface InputProps {
  value: string; // Input value
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; // Function to handle input changes
  placeholder?: string; // Placeholder text for the input
  maxLength?: number; // Maximum length of the input
  disabled?: boolean; // Indicates if the input is disabled
  className?: string; // Additional CSS classes
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "",
  maxLength,
  disabled = false,
  className = "",
}) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    maxLength={maxLength}
    disabled={disabled}
    className={`border px-2 py-1 rounded w-full ${className}`}
  />
);

export default Input;
