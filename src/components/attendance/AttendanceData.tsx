import { ColumnDef } from "@tanstack/react-table";

export interface Attendee {
    name: string;
    period: string;
    start_date: string | null;
    end_date: string | null;
    schedule: string;
    country: string;
    region: string;
    branch: string;
    category: string;
    group: string;    // Changed to string
    subgroup: string; // Changed to string
  
    id: string;
    status: string;
}

export const columns: ColumnDef<Attendee, any>[] = [
    { header: "Schedule", accessorKey: "schedule" },
    { header: "Start Date", accessorKey: "start_date" },
    { header: "End Date", accessorKey: "end_date" },
    { header: "Status", accessorKey: "status" },
    { header: "Country", accessorKey: "country" },
    { header: "Region", accessorKey: "region" },
    { header: "Branch", accessorKey: "branch" },
    { header: "Category", accessorKey: "category" },
    { header: "Group", accessorKey: "group" },
    { header: "Subgroup", accessorKey: "subgroup" },
    { header: "Period", accessorKey: "period" },

   
    { header: "ID", accessorKey: "id" },
    // New column for status
];

// Sample data array with the new status field

const AttendeesData: Attendee[] = [
    {
        name: "Ava Smith",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Morning",
        country: "Canada",
        region: "Ontario",
        branch: "Toronto",
        category: "Product",
        group: "B",
        status: "Absent",
        subgroup: "3",
      
        id: "34",
        
    },
    {
        name: "John Doe",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Afternoon",
        country: "Canada",
        region: "Ontario",
        branch: "Toronto",
        category: "Product",
        group: "B",
        subgroup: "3",
      
        id: "35",
        status: "Late Check-ins"
    },
    {
        name: "Jane Doe",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Morning",
        country: "Canada",
        region: "Ontario",
        branch: "Toronto",
        category: "Product",
        group: "B",
        subgroup: "3",
     
        id: "36",
        status: "Early Check-ins"
    }
];



// Define counters for each category
export const attendees = { Today: 0, Yesterday: 0, week: 0, month: 0 };
export const absentees = { Today: 0, Yesterday: 0, week: 0, month: 0 };
export const lateComers = { Today: 0, Yesterday: 0, week: 0, month: 0 };

// Helper function to check if an attendee is late (arriving after 9 AM)
function isLate(startDate: string): boolean {
    const startTime = new Date(startDate);
    return startTime.getUTCHours() > 9;
}

// Helper function to check if an attendee is absent (missing start or end date)
function isAbsent(startDate: string | null, endDate: string | null): boolean {
    return !startDate || !endDate;
}

// Process each record
AttendeesData.forEach(record => {
    const { period, start_date, end_date } = record;

    if (period === "Today") {
        if (isAbsent(start_date, end_date)) {
            absentees.Today++;
        } else {
            attendees.Today++;
            if (start_date && isLate(start_date)) lateComers.Today++;
        }
    } else if (period === "Yesterday") {
        if (isAbsent(start_date, end_date)) {
            absentees.Yesterday++;
        } else {
            attendees.Yesterday++;
            if (start_date && isLate(start_date)) lateComers.Yesterday++;
        }
    } else if (period === "week") {
        if (isAbsent(start_date, end_date)) {
            absentees.week++;
        } else {
            attendees.week++;
            if (start_date && isLate(start_date)) lateComers.week++;
        }
    } else if (period === "month") {
        if (isAbsent(start_date, end_date)) {
            absentees.month++;
        } else {
            attendees.month++;
            if (start_date && isLate(start_date)) lateComers.month++;
        }
    }
});

// Output results
console.log("Attendees:", attendees);
console.log("Late Comers:", lateComers);
console.log("Absentees:", absentees);






export default AttendeesData;
