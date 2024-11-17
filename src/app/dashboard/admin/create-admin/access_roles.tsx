"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch"; // Use Shadcn Switch
import { menuItems } from "@/lib/utils";
import { TFormProps } from "./page";
import { useWatch } from "react-hook-form";

const excludedMenus = [
  "Dashboard",
  "Desktop data sync",
  "Admin",
  "Custom credit top-up",
  "Create service package",
  "Set credit fee",
  "Create/View 3PPs",
  "3PP credit purchased",
  "3PP credit balance",
];

// Filter out excluded menus and submenus
const filteredMenuItems = menuItems.map((category) => ({
  ...category,
  links: category.links
    .map((menu) => ({
      ...menu,
      subCategories: menu.subCategories.filter(
        (subMenu) => !excludedMenus.includes(subMenu.label),
      ),
    }))
    .filter((menu) => !excludedMenus.includes(menu.label)),
}));

function AccessRoles({ control, setValue, watch }: TFormProps) {
  const pageAccessRole = useWatch({ control, name: "page_access_role" });
  // console.log(pageAccessRole);

  const accessRoleType = useWatch({ control, name: "access_role_type" });
  const watchedSelectedMenus = useWatch({ control, name: "selected_menus" });
  // console.log(watchedSelectedMenus);

  const adminType = watch("admin_type");

  const handleMenuSelection = (menuLabel: string) => {
    let updatedMenus = [...watchedSelectedMenus];

    const existingMenu = updatedMenus.find((menu) => menu.label === menuLabel);
    if (existingMenu) {
      updatedMenus = updatedMenus.filter((menu) => menu.label !== menuLabel);
    } else {
      updatedMenus.push({ label: menuLabel, edit: false, delete: false });
    }

    setValue("selected_menus", updatedMenus);
  };

  const handlePermissionChange = (
    menuLabel: string,
    permissionType: "edit" | "delete",
    isChecked: boolean,
  ) => {
    const updatedMenus = [...watchedSelectedMenus];

    const menu = updatedMenus.find((menu) => menu.label === menuLabel);
    if (menu) {
      menu[permissionType] = isChecked;
    }

    setValue("selected_menus", updatedMenus);
  };

  // const handleSwitchChange = (value: string) => {
  //   if (value === "all") {
  //     setValue("page_access_role", "all");
  //   } else {
  //     const newValue = pageAccessRole === "all" ? "" : pageAccessRole;
  //     setValue(
  //       "page_access_role",
  //       newValue.includes(value)
  //         ? newValue.replace(value, "").trim()
  //         : `${newValue} ${value}`.trim(),
  //     );
  //   }
  // };

  const handleSwitchChange = (value: string) => {
    const newValue = pageAccessRole;
    setValue(
      "page_access_role",
      newValue.includes(value)
        ? newValue.replace(value, "").trim()
        : `${newValue} ${value}`.trim(),
    );
    if (value === "all") {
      // If no menu is selected, check all menus, submenus, and permissions
      if (watchedSelectedMenus.length === 0) {
        const updatedMenus = menuItems.flatMap((category) =>
          category.links.map((menu) => ({
            label: menu.label,
            edit: true,
            delete: true,
          })),
        );
        setValue("selected_menus", updatedMenus);
      } else {
        // If a menu is already selected, check only its submenus and permissions
        const updatedMenus = watchedSelectedMenus.map((menu) => ({
          ...menu,
          edit: true,
          delete: true,
        }));
        setValue("selected_menus", updatedMenus);
      }
    } else {
      // console.log(404);
      // const newValue = pageAccessRole === "all" ? "" : pageAccessRole;
      // const newValue = pageAccessRole;
      // setValue(
      //   "page_access_role",
      //   newValue.includes(value)
      //     ? newValue.replace(value, "").trim()
      //     : `${newValue} ${value}`.trim(),
      // );
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-bold">Access roles</p>

      <div className="grid gap-4 lg:grid-cols-1">
        {/* access role type */}
        <FormField
          control={control}
          name="access_role_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Access role type
              </FormLabel>

              <Select value=''
                onValueChange={(value: string) => {
                  field.onChange(value);
                }}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.value} />
                </SelectTrigger>

                <SelectContent>
                  {(adminType == "super admin" || adminType === "") && (
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  )}
                  <SelectItem value="limited">Limited</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {accessRoleType == "limited" && (
          <div className="space-y-8">
            <section className="">
              <p className="text-lg font-semibold">Page access role</p>
              <div className="mt-2 space-y-2">
                {/* Check All Switch */}
                <FormField
                  control={control}
                  name="page_access_role"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value.includes("all")}
                          onCheckedChange={() => handleSwitchChange("all")}
                        />
                      </FormControl>
                      <FormLabel>Check All</FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable All Access Switch */}
                <FormField
                  control={control}
                  name="page_access_role"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value.includes("access")}
                          onCheckedChange={() => handleSwitchChange("access")}
                        />
                      </FormControl>
                      <FormLabel>Enable All Access</FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable All Edit Switch */}
                <FormField
                  control={control}
                  name="page_access_role"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value.includes("edit")}
                          onCheckedChange={() => handleSwitchChange("edit")}
                        />
                      </FormControl>
                      <FormLabel>Enable All Edit</FormLabel>
                    </FormItem>
                  )}
                />

                {/* Enable All Delete Switch */}
                <FormField
                  control={control}
                  name="page_access_role"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value.includes("delete")}
                          onCheckedChange={() => handleSwitchChange("delete")}
                        />
                      </FormControl>
                      <FormLabel>Enable All Delete</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section className="space-y-2">
              <p className="text-lg font-bold">Menus</p>

              <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                {/* Iterate through menu categories */}
                {filteredMenuItems.map((category) =>
                  category.links.map((menu) => (
                    <div key={menu.label} className="space-y-2">
                      {/* Menu Checkbox */}
                      <FormField
                        control={control}
                        name="selected_menus"
                        render={() => (
                          <FormItem className="flex items-center gap-2">
                            <FormControl>
                              <Checkbox
                                checked={watchedSelectedMenus.some(
                                  (selectedMenu) =>
                                    selectedMenu.label === menu.label,
                                )}
                                onCheckedChange={() =>
                                  handleMenuSelection(menu.label)
                                }
                              />
                            </FormControl>
                            <FormLabel>{menu.label}</FormLabel>
                          </FormItem>
                        )}
                      />

                      {/* Subcategories and Permissions */}
                      {menu.subCategories.length > 0 && (
                        <Select value=''>
                          <SelectTrigger>
                            <SelectValue placeholder="Submenus & Permissions" />
                          </SelectTrigger>

                          <SelectContent>
                            {menu.subCategories.map((subMenu) => (
                              <div key={subMenu.label} className="my-4 space-y-2">
                                <FormField
                                  control={control}
                                  name="selected_menus"
                                  render={() => (
                                    <FormItem className="flex items-center gap-2">
                                      <FormControl>
                                        <Checkbox
                                          checked={watchedSelectedMenus.some(
                                            (selectedMenu) =>
                                              selectedMenu.label ===
                                              subMenu.label,
                                          )}
                                          onCheckedChange={() =>
                                            handleMenuSelection(subMenu.label)
                                          }
                                        />
                                      </FormControl>
                                      <FormLabel>{subMenu.label}</FormLabel>
                                    </FormItem>
                                  )}
                                />

                                {/* Permissions for the sub-menu */}
                                <div className="ml-4">
                                  <FormField
                                    control={control}
                                    name="selected_menus"
                                    render={() => (
                                      <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                          <Checkbox
                                            checked={
                                              watchedSelectedMenus.find(
                                                (selectedMenu) =>
                                                  subMenu.label ===
                                                  selectedMenu.label,
                                              )?.edit || false
                                            }
                                            onCheckedChange={(e) =>
                                              handlePermissionChange(
                                                subMenu.label,
                                                "edit",
                                                !!e,
                                              )
                                            }
                                          />
                                        </FormControl>
                                        <FormLabel>Edit</FormLabel>
                                      </FormItem>
                                    )}
                                  />

                                  <FormField
                                    control={control}
                                    name="selected_menus"
                                    render={() => (
                                      <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                          <Checkbox
                                            checked={
                                              watchedSelectedMenus.find(
                                                (selectedMenu) =>
                                                  subMenu.label ===
                                                  selectedMenu.label,
                                              )?.delete || false
                                            }
                                            onCheckedChange={(e) =>
                                              handlePermissionChange(
                                                subMenu.label,
                                                "delete",
                                                !!e,
                                              )
                                            }
                                          />
                                        </FormControl>
                                        <FormLabel>Delete</FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  )),
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccessRoles;
