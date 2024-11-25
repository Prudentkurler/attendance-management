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
    attendees: string;
    absentees: string;
    latecomers: string;
    earlycomers: string;
    admin: string;

   // Changed to string
  
    id: string;
    status: string;
}

export const columns: ColumnDef<Attendee, any>[] = [
    { header: "Schedule", accessorKey: "schedule" },
    { header: "Start Date", accessorKey: "start_date" },
    { header: "End Date", accessorKey: "end_date" },
    {header:"Atendees",accessorKey:"attendees"},
    {header:"Absentees",accessorKey:"absentees"},
    {header:"Late Comers",accessorKey:"latecomers"},
    {header:"Early comers",accessorKey:"earlycomers"},
    { header: "Status", accessorKey: "status" },
    {header:"Admin",accessorKey:"admin"},
    { header: "Country", accessorKey: "country" },
    { header: "Region", accessorKey: "region" },
    { header: "Branch", accessorKey: "branch" },
    { header: "Category", accessorKey: "category" },


   
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
        attendees: "10%",
        status: "low",
        absentees: "30%",
        latecomers: "20%",
        earlycomers: "40%",
        admin: "Joe",
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
        attendees: "10%",
        status: "Average",
        absentees: "30%",
        latecomers: "20%",
        earlycomers: "40%",
        admin: "Jane",

      
        id: "35",
      
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
        attendees: "10%",
        status: "High",
        absentees: "30%",
        latecomers: "20%",
        earlycomers: "40%",
        admin: "Mike",

     
        id: "36",
       
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
