"use client";

import { Button, Divider, Image } from "@heroui/react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import {
  AltArrowRight,
  Bill,
  File,
  Home,
  QuestionCircle,
  Server,
  Settings,
} from "solar-icon-set";

type Path = {
  icon: (props: any) => React.ReactElement;
  path: string;
  label: string;
};

const dashboardPaths: Path[] = [
  { icon: Home, path: "/dashboard", label: "Dashboard" },
  { icon: Server, path: "/dashboard/nodes", label: "Nodes" },
  { icon: File, path: "/dashboard/storage", label: "Storage" },
  { icon: Bill, path: "/dashboard/billing", label: "Billing" },
];

const dashboardSecondaryPaths: Path[] = [
  { icon: Settings, path: "/dashboard/settings", label: "Settings" },
  { icon: QuestionCircle, path: "/dashboard/help", label: "Help" },
];

const nodeDashboardPaths: Path[] = [
  { icon: Home, path: "/dashboard/node/[id]/overview", label: "Overview" },
  { icon: Server, path: "/dashboard/node/[id]/console", label: "Console" },
  { icon: File, path: "/dashboard/node/[id]/files", label: "Files" },
  { icon: File, path: "/dashboard/node/[id]/backups", label: "Backups" },
  { icon: Bill, path: "/dashboard/node/[id]/billing", label: "Billing" },
  { icon: Settings, path: "/dashboard/node/[id]/settings", label: "Settings" },
  { icon: QuestionCircle, path: "/dashboard/node/[id]/help", label: "Help" },
];

function SidebarItem({ path, currentPath, isCollapsed, nodeId }: { path: Path, currentPath: string, nodeId: string | null, isCollapsed?: boolean }) {

  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();

  useEffect(() => {

    if (path.path === "/dashboard/nodes" && currentPath.startsWith("/dashboard/node/")) {
      setIsSelected(true);
      return
    }

    if (path.path.includes('[id]')) {
      setIsSelected(path.path.replace('[id]', nodeId ?? "0") === currentPath);
      return
    }

    if (path.path === currentPath) {
      setIsSelected(true);
      return
    }

    setIsSelected(false);

  }, [currentPath])

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`py-2 rounded-lg bg-opacity-50 hover:bg-content3 text-content2 font-inter cursor-pointer flex items-center gap-3 transition-all duration-300 ${isSelected ? "bg-content3" : ""
        }`}
      onClick={() => {
        // Check if path includes [id] and replace with nodeId
        const targetPath = path.path.includes("[id]") ? path.path.replace("[id]", nodeId ?? "0") : path.path;
        router.push(targetPath);
      }}
    >
      <path.icon className="!w-6 !h-6 text-content2 flex-shrink-0 ms-[0.2rem]" />
      <motion.span
        initial={{ opacity: 1, width: "auto" }}
        animate={{ opacity: isCollapsed ? 1 : 0, width: isCollapsed ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`overflow-hidden whitespace-nowrap transition-all ${isCollapsed ? "block" : "invisible"}`}
      >
        {path.label}
      </motion.span>
    </motion.div>
  );
}

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();
  console.log("path:", pathName);
  const router = useRouter();

  const openSpeed = 0.3;

  // Check if we are in a node details page (/dashboard/node/[id]/*)
  const isNodeDashboard = useMemo(() => {
    return pathName.startsWith("/dashboard/node/");
  }, [pathName]);

  const nodeId = useMemo(() => {
    // Match pattern to extract nodeId from the path `/dashboard/node/[id]/<subpath>`
    const match = pathName.match(/^\/dashboard\/node\/([^/]+)\//);
    return match ? match[1] : null;
  }, [pathName]);

  return (
    <div className="relative flex">
      {/* Main Sidebar */}
      <motion.div
        initial={{ width: "16rem" }}
        animate={{ width: isNodeDashboard ? "4rem" : isOpen ? "16rem" : "4rem" }}
        transition={{ duration: openSpeed, ease: "easeInOut" }}
        className="flex flex-col h-screen bg-content4 shadow-lg overflow-hidden pt-5 pb-2"
      >
        <div className="flex flex-row justify-between w-full">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: isOpen ? openSpeed * 2 : openSpeed / 2, ease: "easeInOut" }}
            className="origin-left"
          >
            <Image
              src="/images/cynx_white.png"
              className="ms-5 mt-auto max-w-[60%] translate-y-1/2 cursor-pointer"
              radius="none"
              onClick={() => router.push("/")}
            />
          </motion.div>
          <Button
            isIconOnly
            variant="light"
            onPress={() => setIsOpen(!isOpen)}
            className="m-2 ms-auto"
          >
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: isOpen ? -180 : 0 }}
              transition={{ duration: openSpeed, ease: "easeInOut" }}
            >
              <AltArrowRight color="content2" size={24} className="text-content2" />
            </motion.div>
          </Button>
        </div>

        <div className="flex flex-col gap-2 p-4">
          {dashboardPaths.map((path) => (
            <SidebarItem key={path.path} path={path} currentPath={pathName} nodeId={nodeId} isCollapsed={isOpen} />
          ))}
        </div>

        <Divider className="w-[90%] mx-auto" />

        <div className="flex flex-col gap-2 p-4">
          {dashboardSecondaryPaths.map((path) => (
            <SidebarItem key={path.path} path={path} currentPath={pathName} nodeId={nodeId} isCollapsed={isOpen} />
          ))}
        </div>
      </motion.div>

      {/* Node Sidebar (Only appears when in a node page) */}
      {isNodeDashboard && (
        <motion.div
          initial={{ x: "-100%", width: "0rem" }}
          animate={{ x: 0, width: "12rem" }}
          exit={{ x: "-100%", width: "0rem" }}
          transition={{ duration: openSpeed, ease: "easeInOut" }}
          className="flex flex-col h-screen bg-content3-400 shadow-lg overflow-hidden pt-5 pb-2 drop-shadow-heavy z-10"
        >
          <div className="flex flex-col gap-2 p-4">
            {nodeDashboardPaths.map((path) => (
              <SidebarItem key={path.path} path={path} currentPath={pathName} nodeId={nodeId} isCollapsed={true} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
