"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import UpdateSchedulePage from "@/components/schedule/viewSchedule";
import CreateSchedule from "@/components/schedule/createSchedule";

const SchedulePage: React.FC = () => {
  const [showCreateSchedule, setShowCreateSchedule] = useState(false);

  const handleShow = () => {
    setShowCreateSchedule(!showCreateSchedule);
  };

  return (
    <div className="container">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Create/Update Schedule</h1>
        <Button
          onClick={handleShow}
          variant="default"
          className="bg-ds-primary text-ds-foreground"
        >
          {showCreateSchedule ? "Close Schedule" : "Add Schedule"}
        </Button>
      </div>

      {showCreateSchedule && <CreateSchedule onClose={handleShow} />}

      <UpdateSchedulePage />
    </div>
  );
};

export default SchedulePage;