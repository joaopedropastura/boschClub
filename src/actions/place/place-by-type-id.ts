"use server";

const domain = process.env.NEXT_PUBLIC_APP_URL

export async function GetPlacesByTypeId(id : string) {
    const response = await fetch(`${domain}/api/place/type-id/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    
    const data = await response.json();
    return data.events;
  }