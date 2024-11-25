"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateSchedulePage from "@/components/schedule/viewSchedule";
import CreateSchedule from "@/components/schedule/createSchedule";
import BulkAttendanceScheduling from "@/app/dashboard/bulk-attendance-scheduling/bulkAttendanceScheduling";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IndividualEventScheduling from "@/components/individual-event-scheduling/IndividualEventSceduling";
import IndividualAttendanceScheduling from "@/components/individual-attendance-scheduling/page";



const SchedulePage: React.FC = () => {
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);

  const handleShow = (): void => {
    setShowCreateSchedule(!showCreateSchedule);
  };

  return (
    <div className="container w-full px-3">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Attendance Scheduling</h1>
        <Button
          onClick={handleShow}
          variant="default"
          className="bg-ds-primary text-ds-foreground"
        >
          {showCreateSchedule ? "Close Schedule" : "Add Schedule"}
        </Button>
      </div>

      {showCreateSchedule && (
        <Tabs defaultValue="individual" className="w-full px-6 py-2">
          <TabsList>
            <TabsTrigger value="individual">Individual Scheduling</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Scheduling</TabsTrigger>
          </TabsList>
          <TabsContent value="individual" >
            <IndividualAttendanceScheduling onClose={handleShow} />
          </TabsContent>
          <TabsContent value="bulk">
            <BulkAttendanceScheduling onClose={handleShow} />
          </TabsContent>
        </Tabs>
      )}

      <UpdateSchedulePage />
    </div>
  );
};

export default SchedulePage;

