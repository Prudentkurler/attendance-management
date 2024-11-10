"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
// pages/view-activation-fee.js
// import firebase from "../firebase";

export default function ViewActivationFee() {
  //   useEffect(() => {
  //     const fetchFees = () => {
  //       const dbRef = firebase.database().ref("activationFees");
  //       dbRef.on("value", (snapshot) => {
  //         const data = snapshot.val();
  //         const feeArray = Object.keys(data).map((key) => ({
  //           id: key,
  //           ...data[key],
  //         }));
  //         setFees(feeArray);
  //         setLoading(false);
  //       });
  //     };

  //     fetchFees();
  //     return () => {
  //       firebase.database().ref("activationFees").off();
  //     };
  //   }, []);

  //   const handleDelete = async (feeId) => {
  //     await firebase.database().ref(`activationFees/${feeId}`).remove();
  //     setFees(fees.filter((fee) => fee.id !== feeId));
  //   };

  const columns: ColumnDef<Record<string, string>>[] = [
    {
      accessorKey: "client",
      header: "Client",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.client}</span>
      ),
    },

    {
      accessorKey: "activation_module",
      header: "Activation module",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.activation_module}</span>
      ),
    },

    {
      accessorKey: "activation_fee",
      header: "Activation fee",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.activation_fee}</span>
      ),
    },

    {
      accessorKey: "",
      header: "Action",
      cell: () => <span></span>,
    },
  ];

  const DUMMY_DATA = [
    {
      client: "2",
      activation_module: "m1",
      activation_fee: "200",
    },
  ];

  return (
    <div className="container mx-auto space-y-6 overflow-auto rounded bg-background p-4">
      <h1 className="mb-4 text-2xl font-bold">One-Time Account Activation</h1>

      <DataTable columns={columns} data={DUMMY_DATA} />
    </div>
  );
}
