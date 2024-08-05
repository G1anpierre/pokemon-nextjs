"use client";
import Link from "next/link";
import { useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";

import { Character } from "./character";

import { useCharaters } from "@/queries/character";
import { races } from "@/data";

// Human,Saiyan,Namekian Majin ,Frieza Race Android ,Jiren Race,God Angel ,Evil ,Nucleico ,Nucleico benigno ,Unknown

export const Characters = () => {
  const form = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useCharaters({
    page: currentPage,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1 className="uppercase">Characters</h1>
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div>
          <Controller
            control={form.control}
            defaultValue=""
            name="race"
            render={({ field }) => (
              <Autocomplete
                defaultItems={races}
                label="Filter by race"
                placeholder="Search by race"
                selectedKey={field.value}
                variant="bordered"
                onSelectionChange={field.onChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
        </div>
        <div>
          <Controller
            control={form.control}
            defaultValue=""
            name="race"
            render={({ field }) => (
              <Autocomplete
                defaultItems={races}
                label="Filter by race"
                placeholder="Search by race"
                selectedKey={field.value}
                variant="bordered"
                onSelectionChange={field.onChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
        </div>
        <div>
          <Controller
            control={form.control}
            defaultValue=""
            name="race"
            render={({ field }) => (
              <Autocomplete
                defaultItems={races}
                label="Filter by race"
                placeholder="Search by race"
                selectedKey={field.value}
                variant="bordered"
                onSelectionChange={field.onChange}
              >
                {(item) => (
                  <AutocompleteItem key={item.value}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            )}
          />
        </div>
      </div>
      <ul className="grid grid-cols-4 gap-4 mb-5">
        {data?.items.map((character) => (
          <Link key={character.id} passHref href={`/character/${character.id}`}>
            <Character character={character} />
          </Link>
        ))}
      </ul>
      <div className="flex justify-center">
        <Pagination
          loop
          showControls
          initialPage={1}
          page={currentPage}
          total={data?.meta.totalPages || 1}
          onChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
