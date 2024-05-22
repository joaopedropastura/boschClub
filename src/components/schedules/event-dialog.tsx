"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Ham } from "lucide-react";
import { TbSoccerField } from "react-icons/tb";
import { ListPlus } from 'lucide-react';

import CalendarItem from "./calendar/type-place-calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { GetPlacesByTypeId } from "@/actions/place/place-by-type-id";
import { LandPlot } from "lucide-react";
import { BiFootball } from "react-icons/bi";
import { Users } from "lucide-react";
import NewEventForm from "./new-schedules/form-event";

type EventDialogProps = {
  children: React.ReactNode;
  place: { name: string; id: string; maxCapacity: number; typeId: string };
};

type Place = {
  name: string;
  id: string;
  maxCapacity: number;
  typeId: string;
};

export default function EventDialog({ children, place }: EventDialogProps) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await GetPlacesByTypeId(place.id);
      setPlaces(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center justify-between">
          <h3 className="flex gap-4 text-sm font-semibold">
            {place.name.includes("Churras") && <Ham />}
            {place.name.includes("Quadra") && <LandPlot />}
            {place.name.includes("Campo") && <BiFootball size={"24"} />}
            {!place.name.includes("Churras") && !place.name.includes("Quadra") && !place.name.includes("Campo") && <ListPlus />}
            {place.name}

          </h3>
          <CollapsibleTrigger asChild>{children}</CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 mt-4">
          {places.length !== 0 ? (
            places.map((place: Place, index: number) => (
              <Sheet key={index}>
                <SheetTrigger className="flex w-full justify-between items-center ">
                  <Card
                    className="flex w-full justify-between items-center p-4"
                    key={index}
                  >
                    {place.name}
                    <div className="flex gap-1">
                      {place.maxCapacity > 0 && place.maxCapacity}
                      <Users />
                    </div>
                  </Card>
                </SheetTrigger>
                <SheetContent side={"bottom"}>
                  <SheetHeader>
                    <SheetTitle>Selecione a data - {place.name}</SheetTitle>
                    <SheetDescription>
                      <NewEventForm 
                        placeId={place.id}
                        typeId={place.typeId}
                        maxCapacity={place.maxCapacity}
                      
                      />
                      {/* <CalendarItem typeId={place.typeId} /> */}
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            ))
          ) : (
            <div>Nenhum local cadastrado...</div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
