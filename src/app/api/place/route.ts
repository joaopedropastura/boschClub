import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { TypeOfPlace } from "@prisma/client";

export async function GET(req: Request): Promise<Response> {
  try {
    const places = await db.place.findMany();
    return NextResponse.json({ places }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}

export async function POST(req: Request): Promise<Response> {
  const data = await req.json();

  const place = {
    name: data.name,
    typeId: data.typeId,
    maxCapacity: data.maxCapacity,
  };

  try {
    await db.place.create({
      data: place,
    });
    return NextResponse.json({ message: "Place created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
