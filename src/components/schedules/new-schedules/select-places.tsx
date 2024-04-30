import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { GetPlaces } from "@/actions/places";

type PlaceModel = {
  _id: string;
  name: string;
  maxPeople: number;
};

export default function SelectPlaces() {
  const [places, setPlaces] = useState<PlaceModel[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await GetPlaces();
      setPlaces(data);
    }
    fetchData();
  }, []);

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione o local" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Churrasqueiras</SelectLabel>
          {places.map((place: PlaceModel, index: number) => (
            <SelectItem 
              // <div>
              
              // </div>
              key={index} 
              value={place.name}
              // className="flex bg-red justify-between"
            >
              {place.name}
              {place.maxPeople}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
