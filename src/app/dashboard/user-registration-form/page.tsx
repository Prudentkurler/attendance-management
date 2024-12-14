"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import BulkRegistration from '@/components/user-registration/bulkregistration'
import UserRegistration from '@/components/user-registration/userForms'
import ViewUsers from '@/components/user-registration/viewUsers'
import { useRouter } from 'next/navigation'
import { FaPlus } from 'react-icons/fa6'
import axios from 'axios'
import { toast } from '@/components/ui/use-toast'

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenTwo, setIsDialogOpenTwo] = useState(false);
  const [reportAccess, setReportAccess] = useState(false);
  const navigate = useRouter()

  const handleNavigation = () => {
    navigate.push('attendance-manager.akwaabahr.com/api/user-registration/archives-table')
  }

  const handleReportAccessChange = async (checked: boolean) => {
    try {
      await axios.put('attendance-manager.akwaabahr.com/api/users/report-access', { enabled: checked });
      setReportAccess(checked);
      toast({
        title: "Success",
        description: `User report access ${checked ? 'enabled' : 'disabled'}`,
      });
    } catch (error) {
      console.error('Error updating report access:', error);
      toast({
        title: "Error",
        description: "Failed to update report access",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    const fetchReportAccess = async () => {
      try {
        const response = await axios.get('/api/users/report-access');
        setReportAccess(response.data.enabled);
      } catch (error) {
        console.error('Error fetching report access:', error);
      }
    };
    fetchReportAccess();
  }, []);

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
              <UserRegistration onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>

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
              <BulkRegistration onSuccess={() => setIsDialogOpenTwo(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='mt-3 mb-4 flex items-center gap-4'>
        <h5>Enable User Report Access</h5>
        <Checkbox
          id="reportAccess"
          checked={reportAccess}
          onCheckedChange={handleReportAccessChange}
        />
      </div>

      <ViewUsers />

      <div className='w-full flex items-center mt-5 p-3 justify-end'>
        <Button className='font-semibold w-[120px]' onClick={handleNavigation}>Archive</Button>
      </div>
    </div>
  );
};

export default Page;

