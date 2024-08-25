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

const PlanetSchema = z.object({
  id: z.number(),
  name: z.string(),
  isDestroyed: z.boolean(),
  description: z.string(),
  image: z.string(),
  deletedAt: z.null(),
});

export type PlanetType = z.infer<typeof PlanetSchema>;

export const ExtendedCharacterSchema = CharacterSchema.extend({
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

export const ResponseSchema = z.object({
  items: CharactersSchema,
  meta: MetaSchema,
});

export const PlanetsResponseSchema = z.object({
  items: z.array(PlanetSchema),
  meta: MetaSchema,
});

export type PlanetsResponseType = z.infer<typeof PlanetsResponseSchema>;

export const CharactersResponseSchema = z.object({
  data: ResponseSchema,
  success: z.boolean(),
  message: z.string(),
});

export type CharactersResponseType = z.infer<typeof CharactersResponseSchema>;

export type CharacterType = z.infer<typeof CharacterSchema>;
export type Characters = z.infer<typeof CharactersSchema>;
export type Response = z.infer<typeof ResponseSchema>;

export type ExtendedCharacterType = z.infer<typeof ExtendedCharacterSchema>;

export const ExtendedResponseSchema = z.object({
  data: ExtendedCharacterSchema,
  success: z.boolean(),
  message: z.string(),
});

export type ExtendedResponseType = z.infer<typeof ExtendedResponseSchema>;
