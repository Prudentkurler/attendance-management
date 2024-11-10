"use client";

// pages/topup-client-credit.js
import { useState, FormEvent, ChangeEvent } from "react";
// import firebase from "../firebase";

export default function TopUpClientCredit() {
  const [formData, setFormData] = useState({
    clientId: "",
    serviceType: "",
    servicePackage: "",
    topUpAmount: 0,
    totalCreditUnits: 0,
  });

  const serviceTypes = ["SMS", "Email", "Voice Call", "WhatsApp"];

  const servicePackages = [
    { range: "1-199", min: 1, max: 199 },
    { range: "200-499", min: 200, max: 499 },
    { range: "500-799", min: 500, max: 799 },
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
      <h1 className="mb-4 text-2xl font-bold">Top-Up Client Credit</h1>

      <form onSubmit={handleSubmit}>
        {/* Select Client */}
        <div className="mb-4">
          <label>Select Client</label>
          <select
            name="clientId"
            value={formData.clientId}
            onChange={handleInputChange}
            className="w-full rounded border border-gray-300 p-2"
            required
          >
            <option value="">Select a client</option>
            {/* {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.organizationName}
              </option>
            ))} */}
          </select>
        </div>

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

        {/* Top-Up Amount */}
        <div className="mb-4">
          <label>Top-Up Amount (GHS)</label>
          <input
            type="number"
            name="topUpAmount"
            value={formData.topUpAmount}
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
    </div>
  );
}
