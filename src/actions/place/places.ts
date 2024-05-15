"use server";

const domain = process.env.NEXT_PUBLIC_APP_URL

export async function GetPlaces() {
    const response = await fetch(`${domain}/api/place`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    return data.places;
  }