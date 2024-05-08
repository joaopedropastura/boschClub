"use server";



export async function GetPlaces() {
    const response = await fetch(`${process.env.URI}/api/party-places`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    return data.places;
  }