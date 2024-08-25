import {
  CharactersResponseType,
  ExtendedCharacterType,
  ExtendedResponseType,
} from "@/schemas";
import { PlanetsResponseType } from "@/schemas";

export const fetchCharacters = async (
  page: number
): Promise<CharactersResponseType> => {
  const response = await fetch(`/api/characters/${page}`);
  const data: CharactersResponseType = await response.json();

  return data;
};

export const fetchCharacter = async (
  id: number
): Promise<ExtendedResponseType> => {
  const response = await fetch(`/api/character/${id}`);
  const data: ExtendedResponseType = await response.json();

  return data;
};

export const fetchPlanets = async (
  page: number
): Promise<PlanetsResponseType> => {
  const response = await fetch(`/api/planets/${page}`);
  if (!response.ok) throw new Error("Failed to fetch planets");
  return response.json();
};

export const resolvePromisesSeq = async (
  promises: Promise<ExtendedCharacterType>[]
): Promise<ExtendedCharacterType[]> => {
  const result = [];

  for (const promise of promises) {
    result.push(await promise);
  }

  return result;
};
