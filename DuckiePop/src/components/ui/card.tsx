import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string; // Optional prop
};

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div className={`rounded-lg shadow-md bg-white p-4 ${className}`}>
    {children}
  </div>
);

export default Card;