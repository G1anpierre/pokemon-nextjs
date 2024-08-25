"use client";
import Link from "next/link";
import { useState } from "react";
import { Pagination } from "@nextui-org/pagination";

import { usePlanets } from "@/queries/planets";
import { Planet } from "./planet";

export const Planets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = usePlanets({
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
      <h1 className="uppercase mb-4">Planets</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-5">
        {data?.items.map((planet) => (
          <Link key={planet.id} passHref href={`/planet/${planet.id}`}>
            <Planet planet={planet} />
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
