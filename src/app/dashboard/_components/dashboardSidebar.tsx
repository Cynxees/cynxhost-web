"use client";

import { Button, Divider, Image } from "@heroui/react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  AltArrowLeft,
  AltArrowRight,
  Bill,
  File,
  Home,
  MenuDots,
  QuestionCircle,
  Server,
  Settings,
} from "solar-icon-set";

type Path = {
  icon: (allProps: any) => React.ReactElement;
  path: string;
  label: string;
};

const dashboardPaths: Path[] = [
  {
    icon: Home,
    path: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: Server,
    path: "/nodes",
    label: "Nodes",
  },
  {
    icon: File,
    path: "/storage",
    label: "Storage",
  },
  {
    icon: Bill,
    path: "/billing",
    label: "Billing",
  },
];

const dashboardSecondaryPaths: Path[] = [
  {
    icon: Settings,
    path: "/setting",
    label: "Setting",
  },
  {
    icon: QuestionCircle,
    path: "/help",
    label: "Help",
  },
];

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const pathName = usePathname();

  const router = useRouter();

  const openSpeed = 0.3;

  return (
    <motion.div
      initial={{ width: "16rem" }}
      animate={{ width: isOpen ? "16rem" : "4rem" }}
      transition={{ duration: openSpeed, ease: "easeInOut" }}
      className="flex flex-col h-screen bg-content4 shadow-lg overflow-hidden pt-5"
    >
      <div className="flex flex-row justify-between w-full">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{
            duration: isOpen ? openSpeed * 2 : openSpeed / 2,
            ease: "easeInOut",
          }}
          className="origin-left"
        >
          <Image
            src="/images/cynx_white.png"
            className="ms-5 mt-auto max-w-[60%] translate-y-1/2 cursor-pointer"
            radius="none"
            onClick={() => {
              router.push("/");
            }}
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
            <AltArrowRight
              color="content2"
              size={24}
              className="text-content2"
            />
          </motion.div>
        </Button>
      </div>

      <div className="flex flex-col gap-2 p-4">
        {dashboardPaths.map((path) => {
          return (
            <SidebarItem
              path={path}
              isSelected={path.path === pathName}
              isCollapsed={isOpen}
            />
          );
        })}
      </div>

      <Divider className="w-[90%] mx-auto" />

      <div className="flex flex-col gap-2 p-4">
        {dashboardSecondaryPaths.map((path) => {
          return (
            <SidebarItem
              path={path}
              isSelected={path.path === pathName}
              isCollapsed={isOpen}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function SidebarItem({
  path,
  isSelected,
  isCollapsed,
}: {
  path: Path;
  isSelected?: boolean;
  isCollapsed?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`py-2 rounded-lg bg-opacity-50 hover:bg-content3 text-content2 font-inter cursor-pointer flex items-center gap-3 transition-all duration-300 ${
        isSelected ? "bg-content3" : ""
      }`}
    >
      <path.icon className="!w-6 !h-6 text-content2 flex-shrink-0 ms-[0.2rem]" />

      <motion.span
        initial={{ opacity: 1, width: "auto" }}
        animate={{
          opacity: isCollapsed ? 1 : 0,
          width: isCollapsed ? "auto" : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`overflow-hidden whitespace-nowrap transition-all ${
          isCollapsed ? "block" : "invisible"
        }`}
      >
        {path.label}
      </motion.span>
    </motion.div>
  );
}
