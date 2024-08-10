import { QueryClient, useQuery } from "@tanstack/react-query";

import { QUERY } from "@/query-constants";
import { fetchCharacter, resolvePromisesSeq } from "@/utils/api";
import { ExtendedCharacterType } from "@/schemas/character";
import { charactersAction } from "@/actions";

//* To Prefetch the characters and their details, need to use a server-action or to fetch directly from the API
//* The ROUTE API call is not available in the server prefetched data.

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
      const data = await charactersAction({ page });

      if (!data.success) {
        throw new Error(data.message);
      }

      // Pre-Fetching each character to get more details and setting them in the cache
      const responses = data.data?.items.map(async (character) => {
        const response = await fetch(
          `https://dragonball-api.com/api/characters/${character.id}`
        );
        const data = await response.json();

        return data;
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
