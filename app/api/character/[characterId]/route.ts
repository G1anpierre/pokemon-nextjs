import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: {
      characterId: string;
    };
  }
) => {
  const { characterId } = params;

  try {
    const response = await fetch(
      `https://dragonball-api.com/api/characters/${characterId}`
    );

    if (!response.ok) {
      NextResponse.json({
        message: "An unknown error occurred",
        success: false,
      });
    }

    const data = await response.json();

    return NextResponse.json({ data, success: true });
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
