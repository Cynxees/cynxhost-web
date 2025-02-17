"use client";

import { ServerTemplateCategory } from "@/types/entity/entity";
import { Card, CardFooter, Image } from "@heroui/react";
import React from "react";
import { motion } from "framer-motion";

interface GameCardProps {
  game: ServerTemplateCategory;
  onClick: (game: ServerTemplateCategory) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <motion.div
      initial={{ scale: 1, zIndex: 0 }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card
        isPressable
        isBlurred
        radius="none"
        className="animate-appearance-in hover:outline-white hover:outline-offset-0 hover:outline-4 hover:brightness-125 hover:z-10 w-full h-64 relative"
        onPress={() => onClick(game)}
      >
        <Image
          src={game.ImageUrl}
          alt={game.Name}
          className="w-full h-full fixed object-cover"
          radius="none"
        />

        <div className="absolute bottom-0 left-0 w-full h-[90%] bg-gradient-to-t from-black/90 to-transparent z-10"></div>

        <CardFooter className="absolute bottom-0 font-nats text-[2rem] left-2 z-20 text-white">
          {game.Name}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default GameCard;
