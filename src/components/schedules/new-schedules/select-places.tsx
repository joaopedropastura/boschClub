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
import { GetPlaces } from "@/actions/place/places";
import { ControllerRenderProps } from "react-hook-form";
import { eventSchema } from "@/schemas/event";
import * as z from "zod";
import { FormControl } from "@/components/ui/form";

type PlaceModel = {
  id: string;
  name: string;
  maxCapacity: number;
  type: string;
};

export default function SelectPlaces(
  field: ControllerRenderProps<z.infer<typeof eventSchema>>
) {
  const [places, setPlaces] = useState<PlaceModel[]>([]);
  useEffect(() => {
    async function fetchData() {
      const data = await GetPlaces();
      setPlaces(data);
      // console.log(places);
    }
    fetchData();
  }, []);

  return (

    <Select onValueChange={field.onChange} defaultValue={field.value ? field.value.toString() : undefined}>
      <FormControl>
        <SelectTrigger className="">
          <SelectValue placeholder="Selecione o local" />
        </SelectTrigger>
      </FormControl>

      <SelectContent>
        <SelectGroup>
          {places.map((place, index) => (
            <SelectItem
              key={index}
              value={place.id}
              onClick={() => field.onChange(place.id)} // Passa o ID do lugar para o react-hook-form
            >
              {place.name} (Capacidade: {place.maxCapacity})
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
