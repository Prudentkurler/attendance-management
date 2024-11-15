"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
// import firebase from "../firebase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Icons } from "@/components/common/Icons";
import { FaPlus } from "react-icons/fa6";
import CreateThirdPartyProviderForm from "./create/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptions } from "react-icons/sl";
import { Button } from "@/components/ui/button";

export default function ViewThirdPartyProviders() {
  // useEffect(() => {
  //   const fetchProviders = () => {
  //     const dbRef = firebase.database().ref("thirdPartyProviders");
  //     dbRef.on("value", (snapshot) => {
  //       const data = snapshot.val();
  //       const providerArray = Object.keys(data).map((key) => ({
  //         id: key,
  //         ...data[key],
  //       }));
  //       setProviders(providerArray);
  //       setLoading(false);
  //     });
  //   };

  //   fetchProviders();
  //   return () => {
  //     firebase.database().ref("thirdPartyProviders").off();
  //   };
  // }, []);

  // const handleDeleteProvider = async (providerId) => {
  //   await firebase.database().ref(`thirdPartyProviders/${providerId}`).remove();
  //   setProviders(providers.filter((provider) => provider.id !== providerId));
  // };

  const columns: ColumnDef<Record<string, string>>[] = [
    {
      accessorKey: "provider_name",
      header: "Provider",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.provider_name}</span>
      ),
    },

    {
      accessorKey: "service_type",
      header: "Service type",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.service_type}</span>
      ),
    },

    {
      accessorKey: "",
      header: "Action",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <SlOptions />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button size="sm" className="edit-btn h-5">
                Edit
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Button size="sm" className="delete-btn h-5">
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const DUMMY_DATA = [
    {
      provider_name: "MTN GH",
      service_type: "SMS",
    },
  ];

  return (
    <div className="container mx-auto space-y-6 overflow-auto rounded bg-background p-4">
      <h2>Manage Third-Party Providers</h2>

      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">Third-Party Providers</CardTitle>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* ad new */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="create-new-btn flex items-center gap-2 rounded-md px-3 py-2 text-sm">
                  <FaPlus />
                  <span>Add provider</span>
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>

                <CreateThirdPartyProviderForm />
              </DialogContent>
            </Dialog>

            {/* searchbar */}
            <div className="relative max-w-xl">
              <Icons.Search className="absolute left-[10px] top-[10px] size-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-ds-light-gray p-2 px-10"
              />
            </div>

            {/* select filter */}
            <Select  value=''>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" className="capitalize" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="account-admin">Account admin</SelectItem>
                <SelectItem value="status-admin">Status admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={DUMMY_DATA} />
        </CardContent>
      </Card>
    </div>
  );
}
