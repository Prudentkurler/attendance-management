import { ColumnDef } from "@tanstack/react-table";


export interface User {
    id: string;
    firstName: string;
    middleName: string;
    surname: string;
    status: string;
    gender:string;
    phone:string;
    whatsapp:string;
    email:string;
    country:string;
    branch:string;
    category: string;
    group:string;
    unit:string;
    date:string;
  
  }

  export const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'middleName',
      header: 'Middle Name',
    },
    {
      accessorKey: 'surname',
      header: 'Surname',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'whatsapp',
      header: 'WhatsApp',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'country',
      header: 'Country',
    },
    {
      accessorKey: 'branch',
      header: 'Branch',
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
    {
      accessorKey: 'group',
      header: 'Group',
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
  ];

  export const data: User[] = [
    {
      id: "U001",
      firstName: "John",
      middleName: "Michael",
      surname: "Doe",
      status: "Activated",
      gender: "Male",
      phone: "1234567890",
      whatsapp: "1234567890",
      email: "john.doe@example.com",
      country: "United States",
      branch: "New York Branch",
      category: "Individual",
      group: "Group A",
      unit: "Unit 1",
      date: "2023-11-10",
    },
    {
      id: "U002",
      firstName: "Jane",
      middleName: "Anne",
      surname: "Smith",
      status: "Deactivated",
      gender: "Female",
      phone: "9876543210",
      whatsapp: "9876543210",
      email: "jane.smith@example.com",
      country: "Canada",
      branch: "Toronto Branch",
      category: "Organization",
      group: "Group B",
      unit: "Unit 2",
      date: "2023-11-08",
    },
    {
      id: "U003",
      firstName: "Alice",
      middleName: "",
      surname: "Johnson",
      status: "Activated",
      gender: "Female",
      phone: "1231231234",
      whatsapp: "1231231234",
      email: "alice.johnson@example.com",
      country: "United Kingdom",
      branch: "London Branch",
      category: "Individual",
      group: "Group C",
      unit: "Unit 3",
      date: "2023-11-12",
    },
    {
      id: "U004",
      firstName: "Bob",
      middleName: "Andrew",
      surname: "Brown",
      status: "Deactivated",
      gender: "Male",
      phone: "3213214321",
      whatsapp: "3213214321",
      email: "bob.brown@example.com",
      country: "Australia",
      branch: "Sydney Branch",
      category: "Organization",
      group: "Group D",
      unit: "Unit 4",
      date: "2023-11-05",
    },
    {
      id: "U005",
      firstName: "Charlie",
      middleName: "Lee",
      surname: "Green",
      status: "Activated",
      gender: "Non-binary",
      phone: "5555555555",
      whatsapp: "5555555555",
      email: "charlie.green@example.com",
      country: "India",
      branch: "Mumbai Branch",
      category: "Individual",
      group: "Group E",
      unit: "Unit 5",
      date: "2023-11-14",
    },
    {
      id: "U006",
      firstName: "Sophia",
      middleName: "Maria",
      surname: "Taylor",
      status: "Activated",
      gender: "Female",
      phone: "6666666666",
      whatsapp: "6666666666",
      email: "sophia.taylor@example.com",
      country: "South Africa",
      branch: "Cape Town Branch",
      category: "Organization",
      group: "Group F",
      unit: "Unit 6",
      date: "2023-11-07",
    },
    {
      id: "U007",
      firstName: "David",
      middleName: "Allen",
      surname: "Clark",
      status: "Deactivated",
      gender: "Male",
      phone: "7777777777",
      whatsapp: "7777777777",
      email: "david.clark@example.com",
      country: "Germany",
      branch: "Berlin Branch",
      category: "Individual",
      group: "Group G",
      unit: "Unit 7",
      date: "2023-11-09",
    },
    {
      id: "U008",
      firstName: "Olivia",
      middleName: "",
      surname: "Harris",
      status: "Activated",
      gender: "Female",
      phone: "8888888888",
      whatsapp: "8888888888",
      email: "olivia.harris@example.com",
      country: "France",
      branch: "Paris Branch",
      category: "Organization",
      group: "Group H",
      unit: "Unit 8",
      date: "2023-11-06",
    },
    {
      id: "U009",
      firstName: "Ethan",
      middleName: "",
      surname: "Lewis",
      status: "Deactivated",
      gender: "Male",
      phone: "9999999999",
      whatsapp: "9999999999",
      email: "ethan.lewis@example.com",
      country: "Japan",
      branch: "Tokyo Branch",
      category: "Individual",
      group: "Group I",
      unit: "Unit 9",
      date: "2023-11-13",
    },
    {
      id: "U010",
      firstName: "Mia",
      middleName: "Rose",
      surname: "Walker",
      status: "Activated",
      gender: "Female",
      phone: "1111111111",
      whatsapp: "1111111111",
      email: "mia.walker@example.com",
      country: "Brazil",
      branch: "Sao Paulo Branch",
      category: "Organization",
      group: "Group J",
      unit: "Unit 10",
      date: "2023-11-11",
    },
  ];
  