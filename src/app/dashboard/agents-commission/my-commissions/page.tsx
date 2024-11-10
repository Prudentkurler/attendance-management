"use client";

// pages/agents-commission/my-commission.js
import { useState } from "react";
// import firebase from "../firebase";
// import debounce from "lodash/debounce";
// import { Parser } from "@json2csv/plainjs";

export default function MyCommission() {
  const [selectedClient, setSelectedClient] = useState("All");
  // const [totalCommission, setTotalCommission] = useState(0);

  //   useEffect(() => {
  //     const fetchClients = async () => {
  //       const dbRef = firebase.database().ref("clients");
  //       dbRef.on("value", (snapshot) => {
  //         const data = snapshot.val();
  //         const clientArray = Object.keys(data).map((key) => ({
  //           id: key,
  //           ...data[key],
  //         }));
  //         setClients(clientArray);
  //       });
  //     };

  //     fetchClients();
  //     return () => {
  //       firebase.database().ref("clients").off();
  //     };
  //   }, []);

  //   useEffect(() => {
  //     const fetchCommissions = () => {
  //       const dbRef = firebase
  //         .database()
  //         .ref("commissions")
  //         .limitToFirst(commissionsPerPage * currentPage);
  //       dbRef.on("value", (snapshot) => {
  //         const data = snapshot.val();
  //         const commissionArray = Object.keys(data).map((key) => ({
  //           id: key,
  //           ...data[key],
  //         }));
  //         setCommissions(commissionArray);
  //         setFilteredCommissions(commissionArray);
  //         setLoading(false);
  //       });
  //     };

  //     fetchCommissions();
  //     return () => {
  //       firebase.database().ref("commissions").off();
  //     };
  //   }, [currentPage]);

  //   const handleSearch = useCallback(
  //     debounce(() => {
  //       let filtered = commissions;

  //       // Filter by client
  //       if (selectedClient !== "All") {
  //         filtered = filtered.filter(
  //           (commission) => commission.clientId === selectedClient
  //         );
  //       }

  //       // Filter by date range
  //       if (startDate && endDate) {
  //         const start = new Date(startDate).getTime();
  //         const end = new Date(endDate).getTime();
  //         filtered = filtered.filter((commission) => {
  //           const commissionDate = new Date(commission.date).getTime();
  //           return commissionDate >= start && commissionDate <= end;
  //         });
  //       }

  //       setFilteredCommissions(filtered);

  //       // Calculate total commission
  //       const total = filtered.reduce(
  //         (sum, item) => sum + parseFloat(item.commissionEarned),
  //         0
  //       );
  //       setTotalCommission(total);
  //     }, 300),
  //     [commissions, startDate, endDate, selectedClient]
  //   );

  //   useEffect(() => {
  //     handleSearch();
  //   }, [startDate, endDate, selectedClient]);

  //   const handlePageChange = (page) => setCurrentPage(page);

  // const exportToCSV = () => {
  //   const csvData = new Parser().parse(filteredCommissions);
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.setAttribute("download", "commissions.csv");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const copyRegistrationLink = () => {
    const link = `${window.location.origin}/client-register`;
    navigator.clipboard.writeText(link);
    alert("Client registration link copied to clipboard");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">My Commission</h1>
      {/* Filters */}
      <div className="mb-4 flex items-center space-x-4">
        <div>
          <label>Start Date</label>
          <input
            type="date"
            // value={startDate}
            // onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div>
          <label>End Date</label>
          <input
            type="date"
            // value={endDate}
            // onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div>
          <label>Select Client</label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          >
            <option value="All">All</option>
            {/* {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.organizationName}
              </option>
            ))} */}
          </select>
        </div>
        <button
          //   onClick={handleSearch}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Filter
        </button>
        <button
          // onClick={exportToCSV}
          className="ml-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Download CSV
        </button>
      </div>
      {/* Total Commission and Client Registration Link */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <strong>Total Commission Earned: </strong>GHS{" "}
          {/* {totalCommission.toFixed(2)} */}
        </div>
        <button
          onClick={copyRegistrationLink}
          className="rounded bg-gray-500 px-4 py-2 text-white"
        >
          Copy Client Registration Link
        </button>
      </div>
      {/* Commissions Table */}=
      <table className="min-w-full bg-background">
        <thead>
          <tr>
            <th>Client</th>
            <th>Contact</th>
            <th>Account Subscription</th>
            <th>Commission Earned</th>
            <th>Amount Paid</th>
            <th>Date/Time</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {/* {filteredCommissions
                .slice(0, currentPage * commissionsPerPage)
                .map((commission) => (
                  <tr key={commission.id}>
                    <td>{commission.clientName}</td>
                    <td>{commission.clientContact}</td>
                    <td>
                      {commission.subscriptionExpiryDate} /{" "}
                      <a
                        href={`/service-modules/${commission.clientId}`}
                        className="text-blue-500"
                      >
                        View service modules
                      </a>
                    </td>
                    <td>{commission.commissionEarned}</td>
                    <td>{commission.amountPaid}</td>
                    <td>{commission.date}</td>
                    <td>
                      {(
                        commission.commissionEarned - commission.amountPaid
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))} */}
        </tbody>
      </table>
    </div>
  );
}
