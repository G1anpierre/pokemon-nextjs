import { QueryClient, useQuery } from "@tanstack/react-query";

import {
  characterAction,
  charactersAction,
  ExtendedCharacterType,
} from "@/actions";
import { QUERY } from "@/query-constants";

const resolvePromisesSeq = async (
  promises: Promise<ExtendedCharacterType>[]
): Promise<ExtendedCharacterType[]> => {
  const result = [];

  for (const promise of promises) {
    result.push(await promise);
  }

  return result;
};

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

      const responses = data.data?.items.map(async (character) => {
        const response = await fetch(
          `https://dragonball-api.com/api/characters/${character.id}`
        );

        return await response.json();
      });

      const responseData = await resolvePromisesSeq(
        responses as Promise<ExtendedCharacterType>[]
      );

      responseData.forEach((character) => {
        queryClient?.setQueryData(
          [QUERY.character, { id: character.id }],
          character
        );
      });

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
      const data = await characterAction({ id });

      if (!data.success) {
        throw new Error(data.message);
      }

      return data.data;
    },
  });
};
