import { ColumnDef } from "@tanstack/react-table";

export interface Attendee {

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
}

export const columns: ColumnDef<Attendee, any>[] = [
    { header: "Schedule", accessorKey: "schedule" },
    { header: "Start Date", accessorKey: "start_date" },
    { header: "End Date", accessorKey: "end_date" },
    {header:"Atendees",accessorKey:"attendees"},
    {header:"Absentees",accessorKey:"absentees"},
    {header:"Late Comers",accessorKey:"latecomers"},
    {header:"Early comers",accessorKey:"earlycomers"},
    {header:"Admin",accessorKey:"admin"},
    { header: "Country", accessorKey: "country" },
    { header: "Region", accessorKey: "region" },
    { header: "Branch", accessorKey: "branch" },
    { header: "Category", accessorKey: "category" },
];

// Sample data array with the new status field

const AttendeesData: Attendee[] = [
    {

        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Morning",
        country: "Canada",
        region: "Ontario",
        branch: "Toronto",
        category: "Product",
        attendees: "25/10%",
        absentees: "58/30%",
        latecomers: "48/20%",
        earlycomers: "79/40%",
        admin: "Joe",
  
        
    },
    {
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Afternoon",
        country: "Canada",
        region: "Ontario",
        branch: "Toronto",
        category: "Product",
        attendees: "15/10%",
        absentees: "45/30%",
        latecomers: "47/20%",
        earlycomers: "75/40%",
        admin: "Jane",

    },
    {

        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Morning",
        country: "Canada",
        region: "Ontario",
        branch: "Toronto",
        category: "Product",
        attendees: "45/10%",
        absentees: "56/30%",
        latecomers: "26/20%",
        earlycomers: "48/40%",
        admin: "Mike",
       
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
