"use client";

import { useState } from "react";
import CreateLocation from "@/components/Location/CreateLocation";
import { FaPlus } from "react-icons/fa6";
import ViewLocationTable from "@/components/Location/ViewLocationTable";
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Toggle function for the dialog
  const handleDialogToggle = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h3>Location Page</h3>

        <div className="relative flex gap-2">
          <Button
            size="sm"
            variant="default"
            className="flex gap-2 bg-ds-primary text-ds-foreground p-4"
            onClick={handleDialogToggle}
          >
            <FaPlus />
            <p>Add Location</p>
          </Button>

          {/* Dialog for creating a new location */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTitle>
           
            </DialogTitle>
            <DialogContent className="p-6 rounded-md bg-white shadow-md w-full max-w-md">

            <h4 className="text-lg font-semibold mb-4">Create Location</h4>
              <CreateLocation />
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

      {/* Table displaying locations */}
      <ViewLocationTable />
    </div>
  );
};

export default Page;
