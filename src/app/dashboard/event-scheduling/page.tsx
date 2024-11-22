"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IndividualEventScheduling from "@/components/event/individualEventScheduling";
import BulkEventScheduling from "@/components/event/bulkEventScheduling";
import ViewEventsCalendar from "@/components/event/viewEventsCalendar";

const EventSchedulePage: React.FC = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  const handleShow = () => {
    setShowCreateEvent(!showCreateEvent);
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

      <ViewEventsCalendar />
    </div>
  );
};

export default EventSchedulePage;

