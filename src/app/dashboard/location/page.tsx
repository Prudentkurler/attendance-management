"use client"

import { useState } from "react";
import CreatLocation from "@/components/Location/CreateLocation";
import { FaPlus } from "react-icons/fa6";
import ViewLocationTable from "@/components/Location/ViewLocationTable";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


const Page = () => {
  const [showCreateLocation, setShowCreateLocation] = useState(false);

  const handleToggle = () => setShowCreateLocation(!showCreateLocation);

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h3>Location Page</h3>
       
     

   

<div className="relative flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="default" className="flex gap-2 bg-ds-primary text-ds-foreground p-4">
            <FaPlus />
            <p>Add Location</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6 rounded-md bg-white shadow-md w-full max-w-md">
           <CreatLocation/>
           
           
          </DialogContent>
        </Dialog>
      </div>

      </div>

      <ViewLocationTable/>
    </div>
  );
};

export default Page;
