import React from "react";
import Image from "next/image";

import { PlanetType } from "@/schemas";

export const Planet = ({ planet }: { planet: PlanetType }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-10" />
      <Image
        alt={planet.name}
        className="w-full h-full object-cover aspect-[9/16]"
        height={400}
        src={planet.image}
        width={400}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-white mb-2">{planet.name}</h2>
        <div className="flex items-center mb-2">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${planet.isDestroyed ? "bg-red-500" : "bg-green-500"}`}
          />
          <p className="text-sm text-gray-200">
            {planet.isDestroyed ? "Destroyed" : "Existing"}
          </p>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {planet.description}
        </p>
      </div>
    </div>
  );
};
