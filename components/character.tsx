import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { CharacterType } from "@/schemas";

export const Character = ({ character }: { character: CharacterType }) => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{character.affiliation}</p>
        <small className="text-default-500">{character.race}</small>
        <h4 className="font-bold text-large">{character.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={character.name}
          className="object-cover object-top rounded-xl aspect-[9/16]"
          src={character.image}
          width={270}
        />
      </CardBody>
    </Card>
  );
};
