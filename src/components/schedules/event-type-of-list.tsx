"use server";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { GetTypeOfPlaces } from "@/actions/place/type-of-place";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CalendarItem from "@/components/common/calendar/calendar";
import EventDialog from "@/components/schedules/event-dialog";

type PlaceModel = {
  id: string;
  name: string;
  maxCapacity: number;
  typeId: string;
};

export default async function EventTypeOfList() {
  const places: PlaceModel[] = await GetTypeOfPlaces();
  return (
    <div className="flex flex-col space-y-4">
      {places.map((place, index) => (
        <Card className="flex justify-between items-center p-4" key={index}>

          <EventDialog place={place}>
            <Button variant="ghost" value={place.id}>
              <ChevronDown />
            </Button>
          </EventDialog>
        </Card>
      ))}
    </div>
  );
}
