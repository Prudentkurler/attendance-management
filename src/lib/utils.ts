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
        label: "Dashboard",
        href: "/dashboard",
        visible: ["admin", "teacher", "student", "parent"],
        isAccordion: false,
        subCategories: [],
      },

      {
        Icon: Icons.Admin,
        label: "Admin",
        href: "",
        visible: ["", ""],
        isAccordion: true,
        subCategories: [
          { id: 1, label: "Users", href: "/dashboard/admin" },

          {
            id: 2,
            label: "activity logs",
            href: "/dashboard/admin/activity-logs",
          },
        ],
      },

      {
        Icon: Icons.Clients,
        label: "Clients",
        href: "/dashboard/clients",
        visible: ["", ""],
        isAccordion: true,
        subCategories: [
          {
            id: 1,
            label: "Manage clients",
            href: "/dashboard/clients",
          },

          {
            id: 2,
            label: "Client users package",
            href: "/dashboard/clients/users-package",
          },
        ],
      },

      {
        Icon: Icons.Subscription,
        label: "Subscription",
        href: "/dashboard/subscription",
        visible: [""],
        isAccordion: true,
        subCategories: [
          {
            id: 1,
            label: "Manage subs.",
            href: "/dashboard/subscription",
          },
          {
            id: 2,
            label: "One-time activation fee",
            href: "/dashboard/subscription/one-time-activation-fee",
          },

          {
            id: 3,
            label: "One-time activation",
            href: "/dashboard/subscription/one-time-activation",
          },
        ],
      },

      {
        Icon: Icons.ServiceModule,
        label: "Service modules",
        href: "/dashboard/service-modules",
        visible: ["admin", "teacher"],
        isAccordion: false,
        subCategories: [
          {
            id: 1,
            label: "Manage service mdl.",
            href: "/dashboard/create-service-modules",
          },

          {
            id: 2,
            label: "Create service mdl.",
            href: "/dashboard/create-service-modules",
          },
        ],
      },

      {
        Icon: Icons.PostMaster,
        label: "Postmaster",
        href: "",
        visible: ["", ""],
        isAccordion: true,
        subCategories: [
          {
            id: 1,
            label: "Create service package",
            href: "/dashboard/postmaster/create-service-package",
          },
          {
            id: 2,
            label: "Set credit fee",
            href: "/dashboard/postmaster/set-credit-fees",
          },

          {
            id: 3,
            label: "Create/View 3PPs",
            href: "/dashboard/postmaster/third-party-providers",
          },

          {
            id: 4,
            label: "3PP credit purchased",
            href: "/dashboard/postmaster/third-party-providers/credit-purchased",
          },

          {
            id: 5,
            label: "3PP credit balance",
            href: "/dashboard/postmaster/third-party-providers/credit-balance",
          },

          {
            id: 6,
            label: "Client credit",
            href: "/dashboard/postmaster/clients-credit",
          },

          {
            id: 7,
            label: "Custom credit top-up",
            href: "/dashboard/postmaster/custom-credit-top-up",
          },
        ],
      },

      {
        Icon: Icons.Commission,
        label: "Agents commission",
        href: "/dashboard/agents-commission",
        visible: ["", "", "", ""],
        isAccordion: false,
        subCategories: [],
      },

      {
        Icon: Icons.DestktopDataSync,
        label: "Desktop data sync",
        href: "/dashboard/desktop-data-sync",
        visible: ["admin", "teacher", "student", "parent"],
        isAccordion: false,
        subCategories: [],
      },

      {
        Icon: Icons.SystemHealth,
        label: "System Health",
        href: "/dashboard/system-health",
        visible: ["", ""],
        isAccordion: false,
        subCategories: [],
      },
      {
        Icon: Icons.SystemHealth,
        label: "Attendance Manager",
        href: "/dashboard/attendance-manager",
        visible: ["", ""],
        isAccordion: false,
        subCategories: [],
      },
      {
        Icon: Icons.SystemHealth,
        label: "Location",
        href: "/dashboard/location",
        visible: ["", ""],
        isAccordion: false,
        subCategories: [],
      },
      
      {
        Icon: Icons.SystemHealth,
        label: "Create Schedule",
        href: "/dashboard/create-schedule",
        visible: ["", ""],
        isAccordion: false,
        subCategories: [],
      },
      
      {
        Icon: Icons.SystemHealth,
        label: "Roster Schedule",
        href: "/dashboard/roster-scheduling",
        visible: ["", ""],
        isAccordion: false,
        subCategories: [],
      },
      {
        Icon: Icons.SystemHealth,
        label: " Schedule Notification",
        href: "/dashboard/schedule-notifications",
        visible: ["", ""],
        isAccordion: false,
        subCategories: [],
      },
      {
        Icon: Icons.SystemHealth,
        label: " Clock Attendance",
        href: "/dashboard/clock-attendance",
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
