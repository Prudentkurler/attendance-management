"use client";

import { useState, useEffect } from "react";
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
import { toast } from "@/components/ui/use-toast";

interface DeviceRequest {
  id: number;
  name: string;
  branch: string;
  deviceInfo: string;
  status: "pending" | "approved" | "denied";
}

export default function ViewApproveDeviceRequests() {
  const [data, setData] = useState<DeviceRequest[]>([]);
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [branchFilter, setBranchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewDetails, setViewDetails] = useState<DeviceRequest | null>(null);
  const [editRequest, setEditRequest] = useState<DeviceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDeviceRequests();
  }, []);

  const fetchDeviceRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/device-requests');
      if (!response.ok) throw new Error('Failed to fetch device requests');
      const fetchedData = await response.json();
      setData(fetchedData);
    } catch (error) {
      console.error('Error fetching device requests:', error);
      toast({
        title: "Error",
        description: "Failed to fetch device requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleApproveAll = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/device-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedRequests, action: 'approve' }),
      });
      if (!response.ok) throw new Error('Failed to approve requests');
      toast({
        title: "Success",
        description: "Selected requests approved successfully",
      });
      fetchDeviceRequests();
    } catch (error) {
      console.error('Error approving requests:', error);
      toast({
        title: "Error",
        description: "Failed to approve requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setSelectedRequests([]);
    }
  };

  const handleDeleteAll = async () => {
    setIsLoading(true);
    try {
      for (const id of selectedRequests) {
        await fetch(`/api/device-requests?id=${id}`, { method: 'DELETE' });
      }
      toast({
        title: "Success",
        description: "Selected requests deleted successfully",
      });
      fetchDeviceRequests();
    } catch (error) {
      console.error('Error deleting requests:', error);
      toast({
        title: "Error",
        description: "Failed to delete requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setSelectedRequests([]);
    }
  };

  const clearFilters = () => {
    setBranchFilter("");
    setStatusFilter("");
    setSearchTerm("");
  };

  const handleSaveEdit = async (updatedRequest: DeviceRequest) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/device-requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRequest),
      });
      if (!response.ok) throw new Error('Failed to update request');
      toast({
        title: "Success",
        description: "Request updated successfully",
      });
      fetchDeviceRequests();
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: "Error",
        description: "Failed to update request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setEditRequest(null);
    }
  };

  const filteredData = data.filter(
    (request) =>
      (branchFilter === "" || request.branch === branchFilter) &&
      (statusFilter === "" || request.status === statusFilter) &&
      (searchTerm === "" || request.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns = [
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
          <Button size="sm" variant="ghost" onClick={() => setViewDetails(row.original)}>
            View
          </Button>
          <Button size="sm" variant="default" onClick={() => setEditRequest(row.original)}>
            Edit
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleDeleteAll()}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl md:text-2xl font-semibold">View/Approve Device Requests</h2>

      <div className="flex gap-4 flex-col md:flex-row">
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
              <SelectItem value="">All Branches</SelectItem>
              <SelectItem value="Branch A">Branch A</SelectItem>
              <SelectItem value="Branch B">Branch B</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
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

      <div className="flex gap-4">
        <Button 
          className="bg-ds-primary text-ds-foreground font-semibold hover:bg-ds-primary-dark" 
          variant="default" 
          onClick={handleApproveAll}
          disabled={isLoading || selectedRequests.length === 0}
        >
          {isLoading ? 'Processing...' : 'Approve All'}
        </Button>
        <Button 
          variant="destructive" 
          onClick={handleDeleteAll}
          disabled={isLoading || selectedRequests.length === 0}
        >
          {isLoading ? 'Processing...' : 'Delete All'}
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
      />

      <div className="w-full flex items-center justify-end mt-3">
        <Button className="bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark font-semibold" variant='default' size='sm'>
          <CSVLink data={filteredData} filename={"device_requests.csv"}>
            Export CSV
          </CSVLink>
        </Button>
      </div>

      {viewDetails && (
        <Dialog open={!!viewDetails} onOpenChange={() => setViewDetails(null)}>
          <DialogContent>
            <h3 className="text-xl font-semibold">Request Details</h3>
            <p><strong>Name:</strong> {viewDetails.name}</p>
            <p><strong>Branch:</strong> {viewDetails.branch}</p>
            <p><strong>Device Info:</strong> {viewDetails.deviceInfo}</p>
            <p><strong>Status:</strong> {viewDetails.status}</p>
            <Button onClick={() => setViewDetails(null)} className="w-full bg-ds-primary text-ds-foreground">
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}

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
            <Button 
              onClick={() => handleSaveEdit(editRequest)} 
              className="w-full mt-4 bg-ds-primary text-ds-foreground"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

