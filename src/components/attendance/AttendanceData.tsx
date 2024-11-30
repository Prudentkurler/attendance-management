import { ColumnDef } from "@tanstack/react-table";
import React from "react";

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
    {
        header: "Attendees",
        accessorKey: "attendees",
        cell: ({ getValue }) => (
            <span style={{ color: "blue", fontWeight: "bold" }}>
                {getValue<string>()}
            </span>
        ),
    },
    {
        header: "Absentees",
        accessorKey: "absentees",
        cell: ({ getValue }) => (
            <span style={{ color: "red", fontWeight: "bold" }}>
                {getValue<string>()}
            </span>
        ),
    },
    {
        header: "Late Comers",
        accessorKey: "latecomers",
        cell: ({ getValue }) => (
            <span style={{ color: "orange", fontWeight: "bold" }}>
                {getValue<string>()}
            </span>
        ),
    },
    {
        header: "Early Comers",
        accessorKey: "earlycomers",
        cell: ({ getValue }) => (
            <span style={{ color: "green", fontWeight: "bold" }}>
                {getValue<string>()}
            </span>
        ),
    },
    { header: "Admin", accessorKey: "admin" },
    { header: "Country", accessorKey: "country" },
    { header: "Region", accessorKey: "region" },
    { header: "Branch", accessorKey: "branch" },
    { header: "Category", accessorKey: "category" },
];

// Sample data array
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
    },
];

export default AttendeesData;
