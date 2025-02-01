"use client";

import { Button, Image } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AltArrowLeft, AltArrowRight, MenuDots } from "solar-icon-set";

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const openSpeed = 0.3;

  return (
    <motion.div
      initial={{ width: "4rem" }}
      animate={{ width: isOpen ? "16rem" : "4rem" }}
      transition={{ duration: openSpeed, ease: "easeInOut" }}
      className="flex flex-col h-screen bg-content4 shadow-lg overflow-hidden"
    >
      <div className="flex flex-row justify-between w-full">
        <motion.div
          initial={{ opacity: 0 }}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-2 p-4"
      >
        <SidebarItem title="Dashboard" />
        <SidebarItem title="Nodes" />
        <SidebarItem title="Storage" />
        <SidebarItem title="Billing" />
      </motion.div>
    </motion.div>
  );
}

function SidebarItem({ title }: { title: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="px-3 py-2 rounded-lg bg-content3 hover:bg-content3 text-content2 font-inter cursor-pointer"
    >
      {title}
    </motion.div>
  );
}
