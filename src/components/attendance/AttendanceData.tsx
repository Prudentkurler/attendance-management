interface Attendee {
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
}

// Sample data array (replace with actual JSON data)
const data: Attendee[] = [
    {  "name": "Giselle Mayert",
        "period": "week",
        "start_date": "2024-11-10T07:30:15.000Z",
        "end_date": "2024-11-10T16:45:22.000Z",
        "schedule": "Data Solutions Architect",
        "country": "Norway",
        "region": "Alaska",
        "branch": "Glacier",
        "category": "Technology",
        "group": " A",
        "subgroup": " 1",
        "id": "1"
    },
    {
        "name": "Aidan Fisher",
        "period": "month",
        "start_date": "2024-11-09T10:15:44.000Z",
        "end_date": "2024-11-09T18:37:09.000Z",
        "schedule": "Marketing Specialist",
        "country": "Brazil",
        "region": "California",
        "branch": "Riverside",
        "category": "Marketing",
        "group": " B",
        "subgroup": " 2",
        "id": "2"
    },
    {
        "name": "Giselle Mayert",
        "period": "Today",
        "start_date": "2024-11-10T07:30:15.000Z",
        "end_date": "2024-11-10T16:45:22.000Z",
        "schedule": "Data Solutions Architect",
        "country": "Norway",
        "region": "Alaska",
        "branch": "Glacier",
        "category": "Technology",
        "group": " A",
        "subgroup": " 1",
        "id": "3"
    },
    {
        "name": "Oscar Nunez",
        "period": "Today",
        "start_date": "2024-11-10T10:02:05.000Z",
        "end_date": "2024-11-10T19:45:10.000Z",
        "schedule": "Software Developer",
        "country": "Argentina",
        "region": "Buenos Aires",
        "branch": "Palermo",
        "category": "Engineering",
        "group": " A",
        "subgroup": " 2",
        "id": "4"
    },
    {
        "name": "Sophia Blake",
        "period": "Yesterday",
        "start_date": "2024-11-09T08:45:35.000Z",
        "end_date": "2024-11-09T16:55:42.000Z",
        "schedule": "Graphic Designer",
        "country": "Australia",
        "region": "Victoria",
        "branch": "Melbourne",
        "category": "Creative",
        "group": " B",
        "subgroup": " 1",
        "id": "5"
    },
    {
    "name": "Liam Carter",
    "period": "Today",
    "start_date": "2024-11-10T07:45:15.000Z",
    "end_date": "2024-11-10T16:30:20.000Z",
    "schedule": "System Analyst",
    "country": "USA",
    "region": "California",
    "branch": "Los Angeles",
    "category": "IT",
    "group": " A",
    "subgroup": " 1",
    "id": "33"
},
{
    "name": "Ava Smith",
    "period": "Today",
    "start_date": "2024-11-10T08:50:15.000Z",
    "end_date": "2024-11-10T17:20:25.000Z",
    "schedule": "Product Manager",
    "country": "Canada",
    "region": "Ontario",
    "branch": "Toronto",
    "category": "Product",
    "group": " B",
    "subgroup": " 3",
    "id": "34"
},
{
    "name": "Noah Garcia",
    "period": "Today",
    "start_date": "2024-11-10T09:30:45.000Z",
    "end_date": "2024-11-10T18:15:50.000Z",
    "schedule": "Database Administrator",
    "country": "Mexico",
    "region": "Nuevo Leon",
    "branch": "Monterrey",
    "category": "Data",
    "group": " A",
    "subgroup": " 2",
    "id": "35"
},
{
    "name": "Emma Brown",
    "period": "Yesterday",
    "start_date": "2024-11-09T06:15:30.000Z",
    "end_date": "2024-11-09T15:00:40.000Z",
    "schedule": "Digital Marketer",
    "country": "United Kingdom",
    "region": "London",
    "branch": "Westminster",
    "category": "Marketing",
    "group": " C",
    "subgroup": " 4",
    "id": "36"
},
{
    "name": "William Lee",
    "period": "Yesterday",
    "start_date": "2024-11-09T11:45:25.000Z",
    "end_date": "2024-11-09T20:20:30.000Z",
    "schedule": "Full Stack Developer",
    "country": "Singapore",
    "region": "Central",
    "branch": "Marina Bay",
    "category": "Engineering",
    "group": " B",
    "subgroup": " 1",
    "id": "37"
},
{
    "name": "Sophia Walker",
    "period": "Yesterday",
    "start_date": "2024-11-09T08:05:15.000Z",
    "end_date": "2024-11-09T17:30:25.000Z",
    "schedule": "Content Strategist",
    "country": "Australia",
    "region": "Sydney",
    "branch": "Darling Harbour",
    "category": "Content",
    "group": " A",
    "subgroup": " 3",
    "id": "38"
},
{
    "name": "James Young",
    "period": "week",
    "start_date": "2024-11-08T10:35:40.000Z",
    "end_date": "2024-11-08T19:50:55.000Z",
    "schedule": "IT Support Specialist",
    "country": "New Zealand",
    "region": "Auckland",
    "branch": "Central",
    "category": "Support",
    "group": " C",
    "subgroup": " 2",
    "id": "39"
},
{
    "name": "Charlotte Martinez",
    "period": "month",
    "start_date": "2024-11-07T08:25:10.000Z",
    "end_date": "2024-11-07T17:15:15.000Z",
    "schedule": "Financial Consultant",
    "country": "Spain",
    "region": "Catalonia",
    "branch": "Barcelona",
    "category": "Finance",
    "group": " B",
    "subgroup": " 1",
    "id": "40"
},
{
    "name": "Henry Kim",
    "period": "Today",
    "start_date": "2024-11-10T07:00:00.000Z",
    "end_date": "2024-11-10T15:45:05.000Z",
    "schedule": "Sales Executive",
    "country": "South Korea",
    "region": "Seoul",
    "branch": "Gangnam",
    "category": "Sales",
    "group": " A",
    "subgroup": " 4",
    "id": "41"
},
{
    "name": "Isabella Gonzalez",
    "period": "Yesterday",
    "start_date": "2024-11-09T06:45:35.000Z",
    "end_date": "2024-11-09T15:35:45.000Z",
    "schedule": "HR Manager",
    "country": "Brazil",
    "region": "Sao Paulo",
    "branch": "Central",
    "category": "HR",
    "group": " C",
    "subgroup": " 1",
    "id": "42"
},
{
    "name": "David Johnson",
    "period": "week",
    "start_date": "2024-11-08T09:10:20.000Z",
    "end_date": "2024-11-08T18:40:30.000Z",
    "schedule": "Project Coordinator",
    "country": "Sweden",
    "region": "Stockholm",
    "branch": "Central",
    "category": "Management",
    "group": " B",
    "subgroup": " 2",
    "id": "43"
},
{
    "name": "Mia Anderson",
    "period": "Today",
    "start_date": null,
    "end_date": "2024-11-10T17:10:20.000Z",
    "schedule": "Product Designer",
    "country": "Italy",
    "region": "Milan",
    "branch": "Centro",
    "category": "Design",
    "group": " A",
    "subgroup": " 3",
    "id": "44"
},
{
    "name": "Oliver Perez",
    "period": "Yesterday",
    "start_date": "2024-11-09T07:20:00.000Z",
    "end_date": "2024-11-09T16:00:45.000Z",
    "schedule": "Cybersecurity Analyst",
    "country": "Germany",
    "region": "Berlin",
    "branch": "Mitte",
    "category": "Security",
    "group": " C",
    "subgroup": " 4",
    "id": "45"
},
{
    "name": "Amelia Patel",
    "period": "Others",
    "start_date": "2024-11-07T10:00:00.000Z",
    "end_date": "2024-11-07T18:00:00.000Z",
    "schedule": "Data Analyst",
    "country": "India",
    "region": "Delhi",
    "branch": "South",
    "category": "Data",
    "group": " B",
    "subgroup": " 3",
    "id": "46"
},
{
    "name": "Lucas Smith",
    "period": "Today",
    "start_date": null,
    "end_date": "2024-11-10T18:00:25.000Z",
    "schedule": "Business Analyst",
    "country": "France",
    "region": "Paris",
    "branch": "Central",
    "category": "Analytics",
    "group": " A",
    "subgroup": " 2",
    "id": "47"
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
data.forEach(record => {
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






export default data;
