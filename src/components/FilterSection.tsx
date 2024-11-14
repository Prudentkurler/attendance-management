import React from 'react';

interface FilterSectionProps {
  onFilterChange: (filters: any) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <select className="w-full px-3 py-2 border rounded-md">
          <option value="">Select Country</option>
          {/* Add options */}
        </select>
        
        <select className="w-full px-3 py-2 border rounded-md">
          <option value="">Select Branch</option>
          {/* Add options */}
        </select>
        
        <select className="w-full px-3 py-2 border rounded-md">
          <option value="">Select Category</option>
          {/* Add options */}
        </select>
        
        <select className="w-full px-3 py-2 border rounded-md">
          <option value="">Select Group</option>
          {/* Add options */}
        </select>
        
        <select className="w-full px-3 py-2 border rounded-md">
          <option value="">Select Subgroup</option>
          {/* Add options */}
        </select>
      </div>
    </div>
  );
};
