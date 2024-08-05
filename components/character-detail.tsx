"use client";

import { Image } from "@nextui-org/image";
import React from "react";
import { Card, CardBody } from "@nextui-org/card";

import { useCharacter } from "@/queries/character";

export const CharacterDetail = ({ id }: { id: number }) => {
  const { data } = useCharacter({ id });

  return (
    <div className="relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      <div className="relative h-full w-full flex justify-center">
        <Image alt={data?.name} src={data?.image} />
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{data?.name}</h1>
            <h2 className="sr-only">Product information</h2>
            <p className="text-xl font-medium tracking-tight">
              {data?.affiliation}
            </p>
          </div>
          <div>
            <p className="sr-only">Character Description</p>
            <p className="line-clamp-3 text-medium text-default-500">
              {data?.description}
            </p>
          </div>
          <div>
            <h3 className="sr-only">Planet information</h3>
            <h3 className="text-2xl mb-2">Planet Information</h3>
            <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
              shadow="sm"
            >
              <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                  <div className="relative col-span-6 md:col-span-4">
                    <Image
                      alt="Album cover"
                      className="object-cover"
                      height={200}
                      shadow="md"
                      src={data?.originPlanet?.image}
                      width="100%"
                    />
                  </div>

                  <div className="flex flex-col col-span-6 md:col-span-8">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-0">
                        <h3 className="font-semibold text-foreground/90">
                          {data?.originPlanet?.name}
                        </h3>
                        <p className="text-small text-foreground/80">
                          {data?.originPlanet?.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col mt-3 gap-1">
                      <div className="flex justify-between">
                        <p className="text-small">Planet was Destroyed</p>
                        <p className="text-small text-foreground/50">
                          {data?.originPlanet?.isDestroyed ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          {data?.transformations && data?.transformations.length > 0 ? (
            <div>
              <h3 className="text-2xl mb-2">Transformations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.transformations.map((transformation) => (
                  <Card
                    key={transformation.id}
                    className="border-none bg-background/60 dark:bg-default-100/50"
                    shadow="sm"
                  >
                    <CardBody>
                      <div className="relative">
                        <Image
                          alt="Album cover"
                          className="object-cover object-top"
                          height={200}
                          shadow="md"
                          src={transformation.image}
                          width="100%"
                        />
                      </div>
                      <div className="flex justify-between items-start mt-3">
                        <div className="flex flex-col gap-0">
                          <h3 className="font-semibold text-foreground/90">
                            {transformation.name}
                          </h3>
                          <p className="text-small text-foreground/80">
                            ki: {transformation.ki}
                          </p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
