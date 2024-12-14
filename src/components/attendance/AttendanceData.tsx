import { ColumnDef } from "@tanstack/react-table";

export interface Attendee {
  id: string;
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

export const columns: ColumnDef<Attendee>[] = [
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

