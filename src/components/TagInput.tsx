'use client';

import React from 'react';

interface TagInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TagInput: React.FC<TagInputProps> = ({ value, onChange, className = '' }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
      placeholder="Enter tag (e.g., #work, #personal)"
    />
  );
};

export default TagInput; 