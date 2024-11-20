import { Icons } from "@/components/common/Icons";
import { clsx, type ClassValue } from "clsx";
import { Montserrat, Roboto, Open_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const menuItems = [
  {
    id: 1,
    links: [

    
        {
          Icon: Icons.Dashboard,
          label: "Dashboard Analytics",
          href: "/dashboard",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
        {
          Icon: Icons.SystemHealth,
          label: "Summary Analytics",
          href: "/dashboard/summary-analytics",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
   
        {
          Icon: Icons.Eye,
          label: "Clocking Location",
          href: "/dashboard/location",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
        
        {
          Icon: Icons.ServiceModule,
          label: "Create Schedule",
          href: "/dashboard/schedule",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
        
        {
          Icon: Icons.ServiceModule,
          label: "Roster Schedule",
          href: "/dashboard/roster-scheduling",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
        {
          Icon: Icons.Notification,
          label: " Push Notification",
          href: "/dashboard/push-notification",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
     
        {
          Icon: Icons.Clients,
          label: " Clock Attendance",
          href: "/dashboard/clock-attendance",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
        {
          Icon: Icons.PostMaster,
          label: " Assign Device ",
          href: "/dashboard/assign-clockin-device",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
        {
          Icon: Icons.Commission,
          label: " Approve Device ",
          href: "/dashboard/device-request-approval",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
        
        {
          Icon: Icons.DestktopDataSync,
          label: " Attendance History",
          href: "/dashboard/attendance-history",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },
        {
          Icon: Icons.Admin,
          label: " Register user",
          href: "/dashboard/user-registration-form",
          visible: ["", ""],
          isAccordion: false,
          subCategories: [],
        },

      
      
      
    ],
  },
];

export const getRecurringMultiplier = (cycle: string) => {
  // Regular expression to extract number from "number days" format
  const daysMatch = cycle.match(/(\d+)\s*days/);

  if (daysMatch) {
    const customDays = parseFloat(daysMatch[1]); // Extract the number of days
    return customDays / 30; // Convert days to months
  }

  // Handle predefined cycles or fallback
  switch (cycle) {
    case "30 days":
      return 1; // 1 month
    case "90 days":
      return 3; // 3 months
    case "180 days":
      return 6; // 6 months
    case "365 days":
      return 12; // 12 months
    default:
      return 1; // Default to 1 month if invalid input
  }
};
