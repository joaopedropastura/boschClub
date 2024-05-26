"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type PlaceModel = {
  id: string;
  name: string;
  maxCapacity: number;
  typeId: string;
};

export default function ToggleButton({ place }: { place: PlaceModel }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <Button variant="ghost" value={place.id} onClick={handleButtonClick}>
      {isSelected ? <ChevronUp /> : <ChevronDown />}
    </Button>
  );
}
