"use client";

import { useState } from "react";
import CreateLocation from "@/components/Location/CreateLocation";
import { FaPlus } from "react-icons/fa6";
import ViewLocationTable from "@/components/Location/ViewLocationTable";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDialogToggle = () => {
    setIsDialogOpen((prev) => !prev);
  };

  const handleLocationCreated = () => {
    setIsDialogOpen(false);
    setRefreshKey(prevKey => prevKey + 1);
    toast({
      title: "Success",
      description: "Location created successfully",
    });
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h3>Clocking Location</h3>

        <div className="relative flex gap-2">
          <Button
            variant="default"
            className="flex text-sm md:text-lg gap-2 bg-ds-primary text-ds-foreground p-1 md:py-2 md:px-4 hover:bg-ds-primary-dark"
            onClick={handleDialogToggle}
          >
            <FaPlus />
            <p>Add Location</p>
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent className="p-6 rounded-md bg-white shadow-md w-full max-w-md">
              <CreateLocation onLocationCreated={handleLocationCreated} />
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  onClick={() => setIsDialogOpen(false)}
                  className="mt-4"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ViewLocationTable key={refreshKey} />
    </div>
  );
};

export default Page;

