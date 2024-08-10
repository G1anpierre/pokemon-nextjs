import { NextResponse } from "next/server";

import { ResponseSchema } from "@/schemas/character";

export const GET = async (
  req: Request,
  { params }: { params: { page: string } }
) => {
  const { page } = params;

  try {
    const response = await fetch(
      `https://dragonball-api.com/api/characters?page=${page}`
    );

    if (!response.ok) {
      NextResponse.json({
        message: "An unknown error occurred",
        success: false,
      });
    }

    const data = await response.json();
    const validatedData = ResponseSchema.parse(data);

    return NextResponse.json({ data: validatedData, success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, success: false });
    } else {
      return NextResponse.json({
        message: "An unknown error occurred",
        success: false,
      });
    }
  }
};
