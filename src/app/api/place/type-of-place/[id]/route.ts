import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

interface Context {
  params: {
    id: string;
  };
}

export async function GET(req: Request, context: Context): Promise<Response> {
  const { params } = context;

  try {
    const typeOfPlaces = await db.typeOfPlace.findUnique({
        where: {
            id: params.id,
        },
    });
    return NextResponse.json({ typeOfPlaces }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
