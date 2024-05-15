// "use client"
"use server"

import { useEffect, useState } from "react";
import { GetPlaces } from "@/actions/place/places";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';


type PlaceModel = {
    id: string;
    name: string;
    maxCapacity: number;
    type: string;
  };
  

export default async function EventList() {
    // const [places, setPlaces] = useState<PlaceModel[]>([]);
    // useEffect(() => {
    //   async function fetchData() {
    //     const data = await GetPlaces();
    //     setPlaces(data);
    //   }
    //   fetchData();
    // }, []);
    const places : PlaceModel[] = await GetPlaces();

    console.log(places);

    return (
        <div className="flex flex-col space-y-4">
            {places.map((place, index) => (
            <Card
            className="flex justify-between items-center"
              key={index}
            >
              {place.name}


              <Button
                value={place.id}
                // style={"bg-blue-500"}
                // onClick={() => console.log(place.id)}
              >
              <ChevronRight />
              
              </Button>
            </Card>
          ))}
        </div>
    );
}