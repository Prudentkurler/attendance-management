"use client";

// pages/postmaster-credit.js
import { useState, FormEvent, ChangeEvent } from "react";
// import firebase from "../firebase";

export default function PostmasterCreditManagement() {
  const [formData, setFormData] = useState({
    serviceType: "",
    servicePackage: "",
    unitFee: 0,
    totalCreditUnits: 0,
  });

  const serviceTypes = [
    "SMS",
    "SMSmail",
    "Email",
    "Voice Call",
    "WhatsApp",
    "Telegram",
  ];

  const servicePackages = [
    { range: "1-199", min: 1, max: 199 },
    { range: "200-499", min: 200, max: 499 },
    { range: "500-799", min: 500, max: 799 },
    { range: "800-999", min: 800, max: 999 },
    { range: "1000-2999", min: 1000, max: 2999 },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Postmaster Credit Management</h1>

      <form onSubmit={handleSubmit}>
        {/* Service Type */}
        <div className="mb-4">
          <label>Service Type</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            required
          >
            <option value="">Select a service type</option>
            {serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Service Package */}
        <div className="mb-4">
          <label>Service Package</label>
          <select
            name="servicePackage"
            value={formData.servicePackage}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            required
          >
            <option value="">Select a package</option>
            {servicePackages.map((pkg) => (
              <option key={pkg.range} value={pkg.range}>
                {pkg.range} credits
              </option>
            ))}
          </select>
        </div>

        {/* Unit Fee */}
        <div className="mb-4">
          <label>Unit Fee (GHS)</label>
          <input
            type="number"
            name="unitFee"
            value={formData.unitFee}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            required
          />
        </div>

        {/* Total Credit Units */}
        <div className="mb-4">
          <label>Total Credit Units</label>
          <input
            type="number"
            name="totalCreditUnits"
            value={formData.totalCreditUnits}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>

      {/* View Providers */}
      <h2 className="mt-8 text-xl font-bold">Third Party Providers</h2>
      <table className="mt-4 min-w-full bg-white">
        <thead>
          <tr>
            <th>Provider Name</th>
            <th>Service Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {providers.map((provider) => (
            <tr key={provider.id}>
              <td>{provider.name}</td>
              <td>{provider.serviceType}</td>
              <td>
                <button className="text-blue-500">Edit</button>
                <button className="text-red-500 ml-2">Delete</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
}
