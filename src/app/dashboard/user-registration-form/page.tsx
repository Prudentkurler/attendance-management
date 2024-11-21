"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import BulkRegistration from '@/components/user-registration/bulkregistration'
import UserRegistration from '@/components/user-registration/userForms'
import ViewUsers from '@/components/user-registration/viewUsers'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenTwo, setIsDialogOpenTwo] = useState(false);

  return (
    <div className="w-full">
      <div className="mb-8 flex w-full flex-col md:flex-row gap-5 justify-between items-center">
        <h3 className="text-lg font-semibold">User Registration</h3>

        <div className='flex items-center gap-3'>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size='sm'
              className="flex gap-2 items-center bg-ds-primary hover:bg-ds-primary-dark font-bold text-ds-foreground"
              aria-label="Add new user"
            >
              <FaPlus className="text-md" />
              <span>Add User</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            
            <UserRegistration />
          </DialogContent>
        </Dialog>

        {/*Bulk registration*/}

        <Dialog open={isDialogOpenTwo} onOpenChange={setIsDialogOpenTwo}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="sm"
              className="flex gap-2 items-center hover:bg-ds-primary-dark font-bold bg-ds-primary text-ds-foreground"
              aria-label="Add new user"
            >
              <FaPlus className="text-md" />
              <span>Bulk</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            
            <BulkRegistration/>
          </DialogContent>
        </Dialog>
          
        </div>
      </div>

      <ViewUsers/>

     
    </div>
  );
};

export default Page;
