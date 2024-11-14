import React from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = 'Search...' }) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-md pl-10"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};