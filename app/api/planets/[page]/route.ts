import { NextResponse } from "next/server";

import { PlanetsResponseSchema } from "@/schemas";

export const GET = async (
  req: Request,
  { params }: { params: { page: string } }
) => {
  const { page } = params;

  try {
    const response = await fetch(
      `https://dragonball-api.com/api/planets?page=${page}`
    );

    if (!response.ok) {
      return NextResponse.json({
        message: "An unknown error occurred",
        success: false,
      });
    }

    const data = await response.json();
    const validatedData = PlanetsResponseSchema.parse(data);

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
