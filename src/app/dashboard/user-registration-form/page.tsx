"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ViewUsers from '@/components/user-registration/viewUsers'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenTwo, setIsDialogOpenTwo] = useState(false);
  const [reportAccess, setReportAccess] = useState(false);
  const navigate = useRouter()

  const handleNavigation = () => {
    navigate.push('/dashboard/user-registration-form/archives-table')
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

