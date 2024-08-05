import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Characters } from "@/components/characters";
import { getCharacters } from "@/queries/character";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getCharacters({ page: 1, queryClient }));

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Characters />
      </HydrationBoundary>
    </div>
  );
}
