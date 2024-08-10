import { QueryClient, useQuery } from "@tanstack/react-query";

import { QUERY } from "@/query-constants";
import {
  fetchCharacter,
  fetchCharacters,
  resolvePromisesSeq,
} from "@/utils/api";
import { ExtendedCharacterType } from "@/schemas/character";

export const getCharacters = ({
  page,
  queryClient,
}: {
  page: number;
  queryClient?: QueryClient;
}) => {
  return {
    queryKey: [QUERY.characters, { page }],
    queryFn: async () => {
      const data = await fetchCharacters(page);

      if (!data.success) {
        throw new Error(data.message);
      }

      // Pre-Fetching each character to get more details and setting them in the cache
      const responses = data.data?.items.map(async (character) => {
        const response = await fetch(`/api/character/${character.id}`);
        const data = await response.json();

        return data.data;
      });

      const responseData = await resolvePromisesSeq(
        responses as Promise<ExtendedCharacterType>[]
      );

      for (const character of responseData) {
        queryClient?.setQueryData(
          [QUERY.character, { id: character.id }],
          character
        );
      }

      return data.data;
    },
  };
};

export const useCharaters = ({ page }: { page: number }) => {
  return useQuery(getCharacters({ page }));
};

export const useCharacter = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: [QUERY.character, { id }],
    queryFn: async () => {
      const data = await fetchCharacter(id);

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data;
    },
  });
};
