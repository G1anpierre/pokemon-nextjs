"use server";
import { z } from "zod";

const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  ki: z.string(),
  maxKi: z.string(),
  race: z.string(),
  image: z.string(),
  gender: z.string(),
  description: z.string(),
  affiliation: z.string(),
});

const ExtendedCharacterSchema = CharacterSchema.extend({
  originPlanet: z.object({
    id: z.number(),
    name: z.string(),
    isDestroyed: z.boolean(),
    description: z.string(),
    image: z.string(),
  }),
  transformations: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      image: z.string(),
      ki: z.string(),
    })
  ),
});

const MetaSchema = z.object({
  totalItems: z.number(),
  itemCount: z.number(),
  itemsPerPage: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

const CharactersSchema = z.array(CharacterSchema);

const ResponseSchema = z.object({
  items: CharactersSchema,
  meta: MetaSchema,
});

export type CharacterType = z.infer<typeof CharacterSchema>;
export type Characters = z.infer<typeof CharactersSchema>;
export type Response = z.infer<typeof ResponseSchema>;

export type ExtendedCharacterType = z.infer<typeof ExtendedCharacterSchema>;

export const charactersAction = async ({ page }: { page: number }) => {
  try {
    const response = await fetch(
      `https://dragonball-api.com/api/characters?page=${page}`
    );
    const data = await response.json();
    const validatedData = ResponseSchema.parse(data);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: false,
        message: "An unknown error occurred",
      };
    }
  }
};

export const characterAction = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(
      `https://dragonball-api.com/api/characters/${id}`
    );
    const data = await response.json();
    const validatedData = ExtendedCharacterSchema.parse(data);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: false,
        message: "An unknown error occurred",
      };
    }
  }
};
