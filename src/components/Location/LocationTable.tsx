// LocationTable.tsx

"use client";
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CSVLink } from 'react-csv';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { FaSliders } from 'react-icons/fa6';
import { sampleLocationData, Location } from '@/components/Location/LocationData';
import Modal from '../attendance/Modal';
import EditModal from './EditModal';

const LocationTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);

  // Advanced Filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedLocationType, setSelectedLocationType] = useState<'GPS' | 'WiFi' | 'Bluetooth' | ''>('');
  const [selectedBranch, setSelectedBranch] = useState('');

  // Filter data based on search term, date, and advanced filters
  const filteredData = sampleLocationData.filter((location) => {
    const matchesName = location.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry ? location.country === selectedCountry : true;
    const matchesLocationType = selectedLocationType ? location.locationType === selectedLocationType : true;
    const matchesBranch = selectedBranch ? location.branch === selectedBranch : true;
    const matchesLastUpdated = startDate ? new Date(location.lastUpdated) >= startDate : true;

    return matchesName && matchesCountry && matchesLocationType && matchesBranch && matchesLastUpdated;
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  // Format data for CSV export
  const csvData = filteredData.map((location) => ({
    ID: location.id,
    Name: location.name,
    Country: location.country,
    Branch: location.branch,
    'Location Name': location.locationName,
    Latitude: location.latitude,
    Longitude: location.longitude,
    'WiFi ID': location.wifiId || 'N/A',
    'Bluetooth Device ID': location.bluetoothDeviceId || 'N/A',
    Radius: location.radius,
    'Last Updated': location.lastUpdated,
    'Location Type': location.locationType,
    'Updated By': location.updatedBy,
  }));

  const uniqueCountries = Array.from(new Set(sampleLocationData.map((loc) => loc.country)));
  const uniqueBranches = Array.from(new Set(sampleLocationData.map((loc) => loc.branch)));
  const uniqueLocationTypes = Array.from(new Set(sampleLocationData.map((loc) => loc.locationType)));

  const clearFilters = () => {
    setSelectedCountry('');
    setSelectedLocationType('');
    setSelectedBranch('');
    setStartDate(null);
  };

  // Placeholder functions for Edit and Delete actions
  const handleEdit = (id: string) => {
    console.log(`Edit location with ID: ${id}`);
    // Implement the editing functionality here
  };
  interface TableRow {
    id: string;
    name: string;
    country: string;
    branch: string;
    locationName: string;
    latitude: number;
    longitude: number;
    wifiId?: string;
    bluetoothDeviceId?: string;
    radius: number;
    lastUpdated: string;
    locationType: 'GPS' | 'WiFi' | 'Bluetooth';
    updatedBy: string;
  }

  const [selectedLocation, setSelectedLocation] = useState<TableRow | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (location: TableRow) => {
    setSelectedLocation(location);  // Set the data of the location to be edited
    setShowEditModal(true);  // Open the modal
  };



  const onUpdate = (updatedLocation: TableRow) => {
    // Implement the update functionality here
    console.log('Updated location:', updatedLocation);
  };

  const handleSaveLocation = (updatedLocation: TableRow) => {
    onUpdate(updatedLocation);  // Pass the updated data to the parent component
    setShowModal(false);  // Close the modal
  };


  const handleDelete = (id: string) => {
    console.log(`Delete location with ID: ${id}`);
    setShowModal(true);
    // Implement the deletion functionality here
  };

  return (
    <div className="w-full h-auto p-4 gap-4 flex mt-5 flex-col rounded-lg shadow-lg">
      <div className="flex gap-6 items-center justify-evenly w-full">
        <h4 className="text-blue-900 w-[70%] md:w-[27%] text-sm md:text-md font-bold">
          Location Overview
        </h4>
        <div className="hidden md:flex relative w-[50%]">
          <BiSearch className="absolute top-3 left-2 text-gray-600 font-bold" />
          <input
            type="text"
            placeholder="Quick Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full p-2 ring-2 ring-gray-300 rounded-md focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            className="p-2 pl-7 border-2 border-gray-300 rounded-sm shadow-sm text-gray-700 bg-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none w-[140px]"
            dateFormat="dd MMM yyyy"
            placeholderText="Last Updated"
          />
          <FaCalendarAlt className="absolute top-3 left-2 text-gray-400" />
        </div>

        <button
          className="bg-blue-500 text-white text-md p-2 rounded-md w-[20%] justify-center font-semibold flex items-center gap-2"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <FaSliders />
          <p>Advanced Filter</p>
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="mt-4 p-4 border-2 border-gray-300 rounded-md bg-blue-50">
          <div className="flex gap-4">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="p-2 border-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Country</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="p-2 border-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Branch</option>
              {uniqueBranches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            
            <select
              value={selectedLocationType}
              onChange={(e) => setSelectedLocationType(e.target.value as 'GPS' | 'WiFi' | 'Bluetooth')}
              className="p-2 border-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Location Type</option>
              {uniqueLocationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button onClick={clearFilters} className="bg-red-500 text-white p-2 rounded-md font-semibold">
              Clear 
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-scroll w-full">
        <table className="pl-4 w-full">
          <thead>
            <tr className="border-y-2 p-4 text-[11px] md:text-sm border-gray-300 mt-3 text-gray-400 font-serif">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Country</th>
              <th className="p-4">Branch</th>
              <th className="p-4">Location Name</th>
              <th className="p-4">Latitude</th>
              <th className="p-4">Longitude</th>
              <th className="p-4">WiFi ID</th>
              <th className="p-4">Bluetooth Device ID</th>
              <th className="p-4">Radius</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4">Location Type</th>
              <th className="p-4">Updated By</th>
              <th className="p-4">Actions</th> {/* New Actions column */}
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((location) => (
              <tr key={location.id} className="text-[10px] md:text-sm text-gray-700">
                <td className="p-4">{location.id}</td>
                <td className="p-4">{location.name}</td>
                <td className="p-4">{location.country}</td>
                <td className="p-4">{location.branch}</td>
                <td className="p-4">{location.locationName}</td>
                <td className="p-4">{location.latitude}</td>
                <td className="p-4">{location.longitude}</td>
                <td className="p-4">{location.wifiId || 'N/A'}</td>
                <td className="p-4">{location.bluetoothDeviceId || 'N/A'}</td>
                <td className="p-4">{location.radius}</td>
                <td className="p-4">{location.lastUpdated}</td>
                <td className="p-4">{location.locationType}</td>
                <td className="p-4">{location.updatedBy}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEditClick(location)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <CSVLink data={csvData} className="bg-blue-600 text-white p-2 rounded-md">
          Export CSV
        </CSVLink>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
            className="p-2 border rounded-md"
          >
            <IoChevronBack />
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
            className="p-2 border rounded-md"
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
      <Modal
        show={showModal}
        message="Are you sure you want to delete this location?"
        butonText="Delete"
        onClose={() => setShowModal(false)}
      />
      {selectedLocation && (
        <EditModal
          show={showEditModal}
          location={selectedLocation}
          onClose={()=>{setShowEditModal(false)}}
          onSave={handleSaveLocation}
        />
      )}
    </div>
  );
};

export default LocationTable;
