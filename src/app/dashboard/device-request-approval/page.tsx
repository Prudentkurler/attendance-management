"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CSVLink } from "react-csv";

// Define DeviceRequest type
interface DeviceRequest {
  id: number;
  name: string;
  branch: string;
  deviceInfo: string;
  status: "pending" | "approved" | "denied";
}

// Mock Data
const mockData: DeviceRequest[] = [
  { id: 1, name: "John Doe", branch: "Branch A", deviceInfo: "Techno 7P", status: "pending" },
  { id: 2, name: "Jane Smith", branch: "Branch B", deviceInfo: "Samsung A51", status: "approved" },
  { id: 3, name: "Chris Evans", branch: "Branch A", deviceInfo: "iPhone 13", status: "denied" },
];

// Table Columns
const columns = (
  selectedRequests: number[],
  handleCheckboxChange: (id: number, isChecked: boolean, allIds?: number[]) => void,
  onViewDetails: (request: DeviceRequest) => void,
  onEdit: (request: DeviceRequest) => void,
  onDelete: (id: number) => void,
  filteredData: DeviceRequest[]
) => [
  {
    accessorKey: "name",
    header: () => (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={
            selectedRequests.length === filteredData.length && filteredData.length > 0
          }
          onCheckedChange={(isChecked) => {
            const allRowIds = filteredData.map((row) => row.id);
            handleCheckboxChange(-1, !!isChecked, allRowIds);
          }}
          aria-label="Select all"
        />
        <span>Requester</span>
      </div>
    ),
    cell: ({ row }: { row: { original: DeviceRequest } }) => (
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={selectedRequests.includes(row.original.id)}
          onCheckedChange={(isChecked) => handleCheckboxChange(row.original.id, !!isChecked)}
          aria-label="Select row"
        />
        <span>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: ({ row }: { row: { original: DeviceRequest } }) => row.original.branch,
  },
  {
    accessorKey: "deviceInfo",
    header: "Device ID",
    cell: ({ row }: { row: { original: DeviceRequest } }) => row.original.deviceInfo,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => (
      <span
        className={`px-2 py-1 rounded ${
          row.original.status === "approved"
            ? "bg-green-200 text-green-800"
            : row.original.status === "denied"
            ? "bg-red-200 text-red-800"
            : "bg-yellow-200 text-yellow-800"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: { row: { original: DeviceRequest } }) => (
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={() => onViewDetails(row.original)}>
          View
        </Button>
        <Button size="sm" variant="default" onClick={() => onEdit(row.original)}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(row.original.id)}>
          Delete
        </Button>
      </div>
    ),
  },
];

// Main Component
export default function ViewApproveDeviceRequests() {
  const [data, setData] = useState(mockData);
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [branchFilter, setBranchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [viewDetails, setViewDetails] = useState<DeviceRequest | null>(null);
  const [editRequest, setEditRequest] = useState<DeviceRequest | null>(null);

  // Filtered Data
  const filteredData = data.filter(
    (request) =>
      (branchFilter === "" || request.branch === branchFilter) &&
      (statusFilter === "" || request.status === statusFilter) &&
      (searchTerm === "" || request.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle Checkbox Changes
  const handleCheckboxChange = (id: number, isChecked: boolean, allIds: number[] = []) => {
    setSelectedRequests((prevSelected) =>
      allIds.length > 0
        ? isChecked
          ? allIds
          : []
        : isChecked
        ? [...prevSelected, id]
        : prevSelected.filter((reqId) => reqId !== id)
    );
  };

  // Handle Approve All
  const handleApproveAll = () => {
    setData((prevData) =>
      prevData.map((request) =>
        selectedRequests.includes(request.id)
          ? { ...request, status: "approved" }
          : request
      )
    );
    setSelectedRequests([]);
  };

  // Handle Delete All
  const handleDeleteAll = () => {
    setData((prevData) => prevData.filter((request) => !selectedRequests.includes(request.id)));
    setSelectedRequests([]);
  };

  const clearFilters = () => {
    setBranchFilter("");
    setStatusFilter("");
    setSearchTerm("");
  };

  // Handle Save Edit
  const handleSaveEdit = (updatedRequest: DeviceRequest) => {
    setData((prevData) =>
      prevData.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      )
    );
    setEditRequest(null);
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl  md:text-2xl font-semibold">View/Approve Device Requests</h2>

      {/* Filters */}
      <div className="flex gap-4 flex-col md:flex-row ">
        <Input
          placeholder="Search Name/ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="w-full px-2 flex gap-3 flex-wrap items-center">

        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Branches">All Branches</SelectItem>
            <SelectItem value="Branch A">Branch A</SelectItem>
            <SelectItem value="Branch B">Branch B</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Statuses">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="denied">Denied</SelectItem>
          </SelectContent>
        </Select>
        </div>
        <Button className="w-[150px]" variant="default" onClick={clearFilters}>
          Clear
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-ds-primary text-ds-foreground font-semibold hover:bg-ds-primary-dark" variant="default" onClick={handleApproveAll}>
          Approve All
        </Button>
        <Button variant="destructive" onClick={handleDeleteAll}>
          Delete All
        </Button>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns(
          selectedRequests,
          handleCheckboxChange,
          setViewDetails,
          setEditRequest,
          (id) => setData((prevData) => prevData.filter((request) => request.id !== id)),
          filteredData
        )}
        data={filteredData}
      />

      {/*Export CSV Button*/}
      <div className="w-full flex items-center justify-end mt-3">

      <Button className="bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark font-semibold" variant='default' size='sm'>
        <CSVLink data={filteredData} filename={"device_requests.csv"}>
          Export CSV
        </CSVLink>
      </Button>
      </div>

      {/* View Modal */}
      {viewDetails && (
        <Dialog open={!!viewDetails} onOpenChange={() => setViewDetails(null)}>
          <DialogContent>
            <h3 className="text-xl font-semibold">Request Details</h3>
            <p>
              <strong>Name:</strong> {viewDetails.name}
            </p>
            <p>
              <strong>Branch:</strong> {viewDetails.branch}
            </p>
            <p>
              <strong>Device Info:</strong> {viewDetails.deviceInfo}
            </p>
            <p>
              <strong>Status:</strong> {viewDetails.status}
            </p>
            <Button onClick={() => setViewDetails(null)} className="w-full bg-ds-primary text-ds-foreground">
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Modal */}
      {editRequest && (
        <Dialog open={!!editRequest} onOpenChange={() => setEditRequest(null)}>
          <DialogContent>
            <h3 className="text-xl font-semibold">Edit Request</h3>
            <Input
              value={editRequest.name}
              onChange={(e) =>
                setEditRequest((prev) => (prev ? { ...prev, name: e.target.value } : prev))
              }
            />
            <Input
              value={editRequest.branch}
              onChange={(e) =>
                setEditRequest((prev) => (prev ? { ...prev, branch: e.target.value } : prev))
              }
            />
            <Input
              value={editRequest.deviceInfo}
              onChange={(e) =>
                setEditRequest((prev) =>
                  prev ? { ...prev, deviceInfo: e.target.value } : prev
                )
              }
            />
            <Select
              value={editRequest.status}
              onValueChange={(status) =>
                setEditRequest((prev) => (prev ? { ...prev, status: status as "pending" | "approved" | "denied" } : prev))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => handleSaveEdit(editRequest)} className="w-full mt-4 bg-ds-primary text-ds-foreground">
              Save
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
