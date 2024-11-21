"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateSchedulePage from "@/components/schedule/viewSchedule";
import CreateSchedule from "@/components/schedule/createSchedule";
import BulkAttendanceScheduling from "@/components/schedule/bulkAttendanceScheduling";
import IndividualAttendanceScheduling from "@/components/schedule/individualAttendanceScheduling";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SchedulePage: React.FC = () => {
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);

  const handleShow = () => {
    setShowCreateSchedule(!showCreateSchedule);
  };

  return (
    <div className="container w-full">
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
        <Tabs defaultValue="individual" className="w-full">
          <TabsList>
            <TabsTrigger value="individual">Individual Scheduling</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Scheduling</TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
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

