"use client";

import { Button, Divider, Image } from "@heroui/react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

const nodeDashboardPaths: Path[] = [
  { icon: Home, path: "/dashboard/nodes/[id]/overview", label: "Overview" },
  { icon: Server, path: "/dashboard/nodes/[id]/console", label: "Console" },
  { icon: File, path: "/dashboard/nodes/[id]/files", label: "Files" },
  { icon: File, path: "/dashboard/nodes/[id]/backups", label: "Backups" },
  { icon: Bill, path: "/dashboard/nodes/[id]/billing", label: "Billing" },
  { icon: Settings, path: "/dashboard/nodes/[id]/settings", label: "Settings" },
  { icon: QuestionCircle, path: "/dashboard/nodes/[id]/help", label: "Help" },
];


function SidebarItem({ path, currentPath, isCollapsed, nodeId }: { path: Path, currentPath: string, nodeId: string | null, isCollapsed?: boolean }) {

  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();

  useEffect(() => {

    if (path.path === "/dashboard/nodes" && currentPath.startsWith("/dashboard/nodes/")) {
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


export function NodeSidebar() {
  const pathName = usePathname();
  const router = useRouter();

  const openSpeed = 0.3;

  const nodeId = useMemo(() => {
    // Match pattern to extract nodeId from the path `/dashboard/nodes/[id]/<subpath>`
    const match = pathName.match(/^\/dashboard\/nodes\/([^/]+)\//);
    return match ? match[1] : null;
  }, [pathName]);

  return <div className="">
    <motion.div
      initial={{ x: "0%", width: "0rem" }}
      animate={{ x: 0, width: "12rem" }}
      exit={{ x: "0%", width: "0rem" }}
      transition={{ duration: openSpeed, ease: "easeInOut" }}
      className="flex flex-col h-screen bg-content3-400 shadow-lg overflow-hidden pt-5 pb-2 drop-shadow-heavy z-10"
    >
      <div className="flex flex-col gap-2 p-4">
        {nodeDashboardPaths.map((path) => (
          <SidebarItem key={path.path} path={path} currentPath={pathName} nodeId={nodeId} isCollapsed={true} />
        ))}
      </div>
    </motion.div>
  </div>;
}
