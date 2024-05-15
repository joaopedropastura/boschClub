import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request): Promise<Response> {
  try {
    const typeOfPlaces = await db.typeOfPlace.findMany();
    return NextResponse.json({ typeOfPlaces }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<Response> {
  const data = await req.json();

  const place = {
    name: data.name,
  };

  try {
    await db.typeOfPlace.create({
      data: place,
    });
    return NextResponse.json({ message: "Type of place created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
