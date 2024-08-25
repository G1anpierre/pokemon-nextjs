import { QueryClient, useQuery } from "@tanstack/react-query";

import { QUERY } from "@/query-constants";
import { planetsAction } from "@/actions";

export const getPlanets = ({
  page,
}: {
  page: number;
  queryClient?: QueryClient;
}) => {
  return {
    queryKey: [QUERY.planets, { page }],
    queryFn: async () => {
      const data = await planetsAction({ page });

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data;
    },
  };
};

export const usePlanets = ({ page }: { page: number }) => {
  return useQuery(getPlanets({ page }));
};
