import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BulkEventScheduling: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button variant="outline">Download Bulk Events Template</Button>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select>
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
          <Checkbox id="assignAllUsers" />
          <Label htmlFor="assignAllUsers">Assign All Users</Label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="branch">Branch</Label>
          <Select>
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
          <Select>
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
        <Select>
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
        <Select>
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
        <Select>
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
        <Select>
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
        <Input id="bulkEventsFile" type="file" />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default BulkEventScheduling;

