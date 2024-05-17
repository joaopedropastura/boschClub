"use server";

import UserSchedulesHistory from "@/actions/user-history-schedules";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type EventModel = {
  _id: string;
  name: string;
  date: string;
  place: {
    name: string;
    maxPeople: number;
    typeName: string;
  };
  renter: {
    name: string;
    email: string;
  };
};

export default async function UserCardSchedulesHistory() {
  const data = await UserSchedulesHistory();

  function formatDate(dateString : string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate();
  
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  console.log(data.eventsWithRenter);
  return data.eventsWithRenter.map((event: EventModel, index: number) => (
    <Card key={index}>
      <CardHeader className="pt-4 pl-4 pr-4 pb-0 flex justify-center">
        <CardTitle className="text-lg">{event.place.typeName} - {event.place.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex h-20 gap-16 p-4 w-full">
        <div className="flex flex-row gap-4 items-center justify-center">{event.name}</div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Separator orientation="vertical" />
          <div className="">{formatDate(event.date)}</div>
        </div>
      </CardContent>
    </Card>
  ));
}
