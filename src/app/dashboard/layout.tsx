import { ReactNode } from "react";
import { DashboardSidebar } from "./_components/dashboardSidebar";
import { DashboardTopbar } from "./_components/dashboardTopbar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-row w-screen h-screen">
      <DashboardSidebar />

      <div className="flex flex-col w-full h-screen">
        <DashboardTopbar />
        {children}
      </div>
    </div>
  );
}
