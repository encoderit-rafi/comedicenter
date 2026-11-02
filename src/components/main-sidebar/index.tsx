"use client";

import ClickOutside from "@/components/click-outside";
import useLocalStorage from "@/hooks/use-local-storage";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  session: any;
  DoctorClinic?: DoctorClinic;
}

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  session,
  DoctorClinic,
}: SidebarProps) => {
  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const sessionRole = session?.user?.role ?? "";

  const menuGroups = [
    {
      name: "MENU",
      menuItems: [
        { label: "Home", route: "/" },
        { label: "About Us", route: "/about" },
        { label: "Meals & Nutrition", route: "/meals-and-nutrition" },
        { label: "Dental", route: "/dental" },
        { label: "Aesthetic", route: "/aesthetic" },
        { label: "For Providers", route: "/for-providers" },
        { label: "Our Plans", route: "/subscription" },
        { label: "Featured Provider", route: "/featured-providers" },
        { label: "CMC Cares", route: "/cmc-cares" },
        ...(sessionRole === "Patient"
          ? [
              { label: "Our Providers", route: "/our-providers" },
              // { label: "Visit History", route: "/my-visit-history" },
              // { label: "For Doctors", route: "/subscription" },
            ]
          : []),
        ...(["Staff", "Doctor"].includes(sessionRole)
          ? [
              { label: "Clinic", route: "/clinic" },
              // DoctorClinic?.is_admin === true
              //   ? { label: "Users", route: "/users" }
              //   : null,
              // { label: "Visit History", route: "/visit-history-patient" },
            ].filter(Boolean)
          : []),
        // { label: "Featured Provider", route: "/featured-provider" },
      ],
    },
  ];

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`dark:bg-boxdark fixed left-0 top-0 z-[9999] flex h-screen w-[300px] flex-col overflow-y-hidden bg-white py-[30px] duration-300 ease-linear ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="py-5.5 lg:py-6.5 flex items-center justify-between gap-2 px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="scrollbar-custom mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="text-bodydark2 mb-4 ml-4 text-sm font-semibold">
                  {group.name}
                </h3>
                <ul className="mb-6 flex flex-col gap-1.5 pl-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
