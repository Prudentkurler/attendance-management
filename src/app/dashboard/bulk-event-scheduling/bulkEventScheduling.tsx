import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast"

const BulkEventScheduling: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch('/api/event-scheduling', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to submit bulk events');
      toast({
        title: "Success",
        description: "Bulk events submitted successfully",
      });
      onClose();
    } catch (error) {
      console.error('Error submitting bulk events:', error);
      toast({
        title: "Error",
        description: "Failed to submit bulk events",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch('/api/event-scheduling/template', {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Failed to download template');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bulk_events_template.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading template:', error);
      toast({
        title: "Error",
        description: "Failed to download template",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button variant="outline" onClick={handleDownloadTemplate}>Download Bulk Events Template</Button>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select name="country">
            <SelectTrigger id="country">
              <SelectValue placeholder="Select countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more countries as needed */}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="assignAllUsers" name="assignAllUsers" />
          <Label htmlFor="assignAllUsers">Assign All Users</Label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="branch">Branch</Label>
          <Select name="branch">
            <SelectTrigger id="branch">
              <SelectValue placeholder="Select branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more branches as needed */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="users">Users</Label>
          <Select name="users">
            <SelectTrigger id="users">
              <SelectValue placeholder="Select users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more users as needed */}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select name="category">
          <SelectTrigger id="category">
            <SelectValue placeholder="Select categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {/* Add more categories as needed */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="group">Group</Label>
        <Select name="group">
          <SelectTrigger id="group">
            <SelectValue placeholder="Select groups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {/* Add more groups as needed */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subgroup">Subgroup</Label>
        <Select name="subgroup">
          <SelectTrigger id="subgroup">
            <SelectValue placeholder="Select subgroups" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {/* Add more subgroups as needed */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="adminUsers">Assign Admin Users</Label>
        <Select name="adminUsers">
          <SelectTrigger id="adminUsers">
            <SelectValue placeholder="Select admin users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {/* Add more admin users as needed */}
          </SelectContent>
        </Select>
        <Button type="button" variant="outline" className="mt-2">Add</Button>
      </div>

      <div>
        <Label htmlFor="bulkEventsFile">Attach Bulk Events Template</Label>
        <Input id="bulkEventsFile" name="bulkEventsFile" type="file" />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default BulkEventScheduling;

