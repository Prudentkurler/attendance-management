"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";


import UpdateSchedulePage from "@/components/schedule/viewSchedule";
import CreateSchedule from "@/components/schedule/createSchedule";



const SchedulePage: React.FC = () => {

  const [showCreateScedule, setShowCreateSchedule] = useState(false)

  const handleShow = ()=>{
    setShowCreateSchedule(!showCreateScedule)
  }



  return (
    <div className="container">
      <div className="w-full flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4">Create/Update Schedule</h1>

      <Button onClick={()=>{handleShow()}} variant='default' className="bg-ds-primary text-ds-foreground">
        {
          showCreateScedule ? 'Close Schedule' : 'Add Schedule'
        }
       
        </Button>

      </div>

      {/*Open Schedule dialog*/}
      {
        showCreateScedule && <CreateSchedule/>
      }
    

      <UpdateSchedulePage />
    </div>
  );
};

export default SchedulePage;
