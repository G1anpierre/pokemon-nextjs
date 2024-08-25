"use server";

import {
  ExtendedCharacterSchema,
  ResponseSchema,
  PlanetsResponseSchema,
} from "@/schemas";

export const charactersAction = async ({
  page,
  filters,
}: {
  page: number;
  filters?: { [key: string]: string };
}) => {
  try {
    let url = `https://dragonball-api.com/api/characters?page=${page}`;

    if (filters) {
      const queryString = Object.entries(filters)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");

      url += `&${queryString}`;
    }
    const response = await fetch(url);
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

export const planetsAction = async ({ page }: { page: number }) => {
  try {
    const response = await fetch(
      `https://dragonball-api.com/api/planets?page=${page}`
    );
    const data = await response.json();
    const validatedData = PlanetsResponseSchema.parse(data);

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
