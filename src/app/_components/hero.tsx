"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/use-disclosure";
import { motion } from "framer-motion";

export default function Hero() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="relative flex justify-center items-center font-extrabold">
      <section className="max-w-screen-xl mx-auto px-4 py-28 flex flex-col items-center text-center gap-12 md:px-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0 }}
          className="max-w-4xl flex flex-col items-center space-y-5"
        >

          <p className="max-w-2xl text-md text-content3-100 text-muted-foreground font-bold">
            Hourly Server Hosting
          </p>
          <h1 className="text-4xl md:text-8xl font-medium tracking-tighter text-black">
            Affordable hosting paid by the hour
          </h1>
          <p className="max-w-2xl text-2xl text-content1 text-muted-foreground font-light">
            Host your servers in one click
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <Button onPress={onOpen} color="primary" variant="shadow" className="px-10 py-4 font-bold rounded-3xl">
              Start for free
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Background Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, type: "spring", bounce: 0 }}
        className="absolute top-[-8rem] w-full h-full flex justify-end items-center pointer-events-none"
      >
        <div className="w-3/4 flex justify-center items-center">
          <div className="w-12 h-[600px] bg-light blur-[70px] rounded-3xl rotate-[35deg] max-sm:rotate-[15deg] will-change-transform"></div>
        </div>
      </motion.div>
    </div>
  );
}
