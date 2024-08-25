import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getPlanets } from "@/queries/planets";

const PlanetsLayout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getPlanets({ page: 1, queryClient }));

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </div>
  );
};

export default PlanetsLayout;
