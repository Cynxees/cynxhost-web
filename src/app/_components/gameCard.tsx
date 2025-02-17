"use client";

import { ServerTemplateCategory, ServerTemplateCategoryDisplay } from "@/types/entity/entity";
import { Card, CardFooter, Image } from "@heroui/react";
import React from "react";
import { motion } from "framer-motion";

interface GameCardProps<T = ServerTemplateCategoryDisplay | ServerTemplateCategory> {
  game: T;
  onClick: (game: T) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <motion.div
      initial={{ scale: 1, zIndex: 0 }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="w-full relative h-full"
    >
      <Card
        isPressable
        isBlurred
        radius="lg"
        className="animate-appearance-in hover:outline-white hover:outline-offset-0 hover:outline-4 hover:brightness-105 w-full h-full flex flex-col pt-3 bg-gray-200  drop-shadow-heavy"
        onPress={() => onClick(game)}
      >
        {/* Image Container maintains square ratio */}
        <div className="w-full aspect-square relative">
          <Image
            src={game.ImageUrl}
            alt={game.Name}
            className={"object-cover w-[90%] left-1/2 -translate-x-1/2 fixed aspect-square bg-white " + (game.ImageUrl?.endsWith("png") ? "p-5" : "")}
            radius="lg"
          />
        </div>
        {/* Game Name */}
        <div className="w-[80%] mx-auto mb-5">
          <div className="font-nats text-2xl text-content4 text-start">
            {game.Name}
          </div>
          <div className="font-nats text-sm text-content1 text-start">
            {game.Description}
          </div>

        </div>
      </Card>
    </motion.div>
  );

};

export default GameCard;
