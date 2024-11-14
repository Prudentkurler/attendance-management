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
    gender: string;
    id: string;
    status: string;
}

export const columns: ColumnDef<Attendee, any>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Status", accessorKey: "status" },
    { header: "Country", accessorKey: "country" },
    { header: "Region", accessorKey: "region" },
    { header: "Branch", accessorKey: "branch" },
    { header: "Category", accessorKey: "category" },
    { header: "Group", accessorKey: "group" },
    { header: "Subgroup", accessorKey: "subgroup" },
    { header: "Gender", accessorKey: "gender" },
    { header: "Period", accessorKey: "period" },
    { header: "Start Date", accessorKey: "start_date" },
    { header: "End Date", accessorKey: "end_date" },
    { header: "Schedule", accessorKey: "schedule" },
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
        schedule: "Product Manager",
        country: "Canada",
        region: "Ontario",
        branch: "Toronto",
        category: "Product",
        group: "B",
        status: "Absent",
        subgroup: "3",
        gender: "Female",
        id: "34",
        
    },
    {
        name: "John Doe",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Product Manager",
        country: "Canada",
        region: "Ontario",
        branch: "Toronto",
        category: "Product",
        group: "B",
        subgroup: "3",
        gender: "Male",
        id: "35",
        status: "Late Check-ins"
    },
    {
        name: "Jane Doe",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Product Manager",
        country: "Canada",
        region: "Ontario",
        branch: "Toronto",
        category: "Product",
        group: "B",
        subgroup: "3",
        gender: "Female",
        id: "36",
        status: "Early Check-ins"
    },
    {
        name: "Liam Johnson",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Sales Associate",
        country: "USA",
        region: "California",
        branch: "Los Angeles",
        category: "Sales",
        group: "A",
        subgroup: "1",
        gender: "Male",
        id: "37",
        status: "Absent"
    },
    {
        name: "Emma Brown",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "HR Specialist",
        country: "UK",
        region: "London",
        branch: "Central",
        category: "HR",
        group: "C",
        subgroup: "2",
        gender: "Female",
        id: "38",
        status: "Late Check-ins"
    },
    {
        name: "Oliver Lee",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Marketing Manager",
        country: "Australia",
        region: "New South Wales",
        branch: "Sydney",
        category: "Marketing",
        group: "D",
        subgroup: "1",
        gender: "Male",
        id: "39",
        status: "Early Check-ins"
    },
    {
        name: "Sophia Wilson",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Finance Analyst",
        country: "India",
        region: "Maharashtra",
        branch: "Mumbai",
        category: "Finance",
        group: "E",
        subgroup: "4",
        gender: "Female",
        id: "40",
        status: "Absent"
    },
    {
        name: "Noah White",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Developer",
        country: "USA",
        region: "Texas",
        branch: "Houston",
        category: "IT",
        group: "B",
        subgroup: "5",
        gender: "Male",
        id: "41",
        status: "Late Check-ins"
    },
    {
        name: "Mia Taylor",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "UI Designer",
        country: "Germany",
        region: "Berlin",
        branch: "Berlin Central",
        category: "Design",
        group: "F",
        subgroup: "2",
        gender: "Female",
        id: "42",
        status: "Early Check-ins"
    },
    {
        name: "Lucas Martin",
        period: "Today",
        start_date: "2024-11-10T08:50:15.000Z",
        end_date: "2024-11-10T17:20:25.000Z",
        schedule: "Data Scientist",
        country: "France",
        region: "Île-de-France",
        branch: "Paris",
        category: "Data",
        group: "G",
        subgroup: "3",
        gender: "Male",
        id: "43",
        status: "Absent"
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
