"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BulkEventScheduling from "@/app/dashboard/bulk-event-scheduling/bulkEventScheduling";
import IndividualEventScheduling from "@/components/individual-event-scheduling/IndividualEventSceduling";
import UpdateSchedulePage from "@/components/schedule/viewSchedule";




const EventSchedulePage: React.FC = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const handleShow = () => {
    setShowCreateEvent(!showCreateEvent);
    onclose
  };

  return (
    <div className="container w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Event Scheduling</h1>
        <Button
          onClick={handleShow}
          variant="default"
          className="bg-ds-primary text-ds-foreground"
        >
          {showCreateEvent ? "Close Event" : "Add Event"}
        </Button>
      </div>

      {showCreateEvent && (
        <Tabs defaultValue="individual" className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="individual">Individual Event Scheduling</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Events Scheduling</TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
            <IndividualEventScheduling onClose={handleShow} />
          </TabsContent>
          <TabsContent value="bulk">
            <BulkEventScheduling onClose={handleShow} />
          </TabsContent>
        </Tabs>
      )}

      <UpdateSchedulePage />
    </div>
  );
};

export default EventSchedulePage;

