import { ReactNode } from "react";
import { DashboardSidebar } from "./_components/dashboardSidebar";
import { DashboardTopbar } from "./_components/dashboardTopbar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-row w-full h-screen">
      <DashboardSidebar />

      <div className="flex flex-col h-screen w-full">
        <DashboardTopbar />
        <div className="h-full w-full relative">
          <div className="h-full w-full absolute">{children}</div>
        </div>
      </div>
    </div>
  );
}
