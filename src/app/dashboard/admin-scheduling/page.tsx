// pages/admin-schedule.tsx
import AssignAdminSchedule  from "@/components/schedule/assign-admin";
import  ViewAdminSchedules  from "@/components/schedule/view-admin";

const AdminSchedulePage: React.FC = () => {

  
  return (
    <div className="space-y-8">
      <AssignAdminSchedule />
      <ViewAdminSchedules />
    </div>
  );
};

export default AdminSchedulePage;
