"use server";

const domain = process.env.NEXT_PUBLIC_APP_URL

export async function GetTypeOfPlaces() {
    const response = await fetch(`${domain}/api/place/type-of-place`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    return data.typeOfPlaces;
  }