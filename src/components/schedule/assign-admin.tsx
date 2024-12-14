"use client"

// pages/assign-admin-schedule/index.tsx

import { useState } from 'react';
import  MultiSelect  from '../ui/multi-select';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

const AssignAdminSchedulePage = () => {
  const { toast } = useToast();
  const [country, setCountry] = useState<string[]>([]);
  const [branch, setBranch] = useState<string[]>([]);
  const [admin, setAdmin] = useState<string[]>([]);
  const [role, setRole] = useState<string[]>([]);
  const [attendance, setAttendance] = useState<string[]>([]);
  const [event, setEvent] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [group, setGroup] = useState<string[]>([]);
  const [subgroup, setSubgroup] = useState<string[]>([]);

  const handleUpdate = () => {
    // Handle the update logic here
    console.log({
      country,
      branch,
      admin,
      role,
      attendance,
      event,
      category,
      group,
      subgroup,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('attendance-manager.akwaabahr.com/api/admin-schedule', {
        country,
        branch,
        admin,
        role,
        attendance,
        event,
        category,
        group,
        subgroup,
      });
      console.log('Schedule assigned successfully:', response.data);
      toast({
        title: "Success",
        description: "Schedule assigned successfully",
      });
    } catch (error) {
      console.error('Error assigning schedule:', error);
      toast({
        title: "Error",
        description: "Failed to assign schedule. Please try again.",
        variant: "destructive",
      });
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold ml-3">Assign Admin Schedule</h1>
      <Card className='p-4 mt-4 md:w-[80%] mx-auto'>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      
        <div>
          <Label>Select Country</Label>
          <MultiSelect
            options={['Country1', 'Country2', 'Country3']}
            value={country}
            onChange={setCountry}
            placeholder="Select Country"
          />
        </div>

        <div>
          <Label>Select Branch</Label>
          <MultiSelect
            options={['Branch1', 'Branch2', 'Branch3']}
            value={branch}
            onChange={setBranch}
            placeholder="Select Branch"
          />
        </div>

        <div>
          <Label>Select Admin</Label>
          <MultiSelect
            options={['Admin1', 'Admin2', 'Admin3']}
            value={admin}
            onChange={setAdmin}
            placeholder="Select Admin"
          />
        </div>

        <div>
          <Label>Assign Role</Label>
          <MultiSelect
            options={['Edit Schedule', 'Edit Agenda', 'Clock Assigned Users', 'View Only']}
            value={role}
            onChange={setRole}
            placeholder="Assign Role"
          />
        </div>

        <div>
          <Label>Assign Attendance</Label>
          <MultiSelect
            options={['Attendance1', 'Attendance2', 'Attendance3']}
            value={attendance}
            onChange={setAttendance}
            placeholder="Assign Attendance"
          />
          <Label>Event</Label>
          <MultiSelect
            options={['Event1', 'Event2', 'Event3']}
            value={event}
            onChange={setEvent}
            placeholder="Select Event"
          />
        </div>

        <div>
          <Label>Assign Category</Label>
          <MultiSelect
            options={['Category1', 'Category2', 'Category3']}
            value={category}
            onChange={setCategory}
            placeholder="Assign Category"
          />
        </div>

        <div>
          <Label>Assign Group</Label>
          <MultiSelect
            options={['Group1', 'Group2', 'Group3']}
            value={group}
            onChange={setGroup}
            placeholder="Assign Group"
          />
        </div>

        <div>
          <Label>Assign Subgroup</Label>
          <MultiSelect
            options={['Subgroup1', 'Subgroup2', 'Subgroup3']}
            value={subgroup}
            onChange={setSubgroup}
            placeholder="Assign Subgroup"
          />
        </div>
        <div className='w-full flex justify-end items-center'>

        <Button type="submit" className="mt-4 bg-ds-primary text-foreground hover:bg-ds-primary-darks font-semibold">Update</Button>
        </div>
      </form>
      </Card>
    </div>
  );
};

export default AssignAdminSchedulePage;
