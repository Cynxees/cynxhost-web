"use client";

import { ServerTemplateCategory } from "@/types/entity/entity";
import { Card, CardFooter, Image } from "@heroui/react";
import React from "react";

interface GameCardProps {
  game: ServerTemplateCategory;
  onClick: (game: ServerTemplateCategory) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const onHover = () => {
    setIsHovered(true);
  };

  const onHoverExit = () => {
    setIsHovered(false);
  };

  return (
    <Card
      isPressable
      isBlurred
      className={
        "relative w-[20vw] aspect-[16/10] drop-shadow-2xl" +
        (isHovered ? "scale-110 brightness-125 border-white border" : "")
      }
      onClick={() => onClick(game)}
      onMouseEnter={onHover}
      onMouseLeave={onHoverExit}
      radius="none"
    >
      <Image
        src={game.ImageUrl}
        alt={game.Name}
        height={"100%"}
        className="w-full h-full object-cover object-center"
        radius="none"
      />

      <div className="absolute bottom-0 left-0 w-full h-[90%] bg-gradient-to-t from-black/90 to-transparent z-10"></div>

      <CardFooter className="absolute -bottom-8 font-nats text-[5rem] left-2 z-20 text-white">
        {game.Name}
      </CardFooter>
    </Card>
  );
};

export default GameCard;
