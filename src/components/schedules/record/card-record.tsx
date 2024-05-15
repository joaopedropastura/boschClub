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
  };
  renter: {
    name: string;
    email: string;
  };
};

export default async function UserCardSchedulesHistory() {
  const data = await UserSchedulesHistory();


  return data.map((event: EventModel, index: number) => (
    <Card key={index}>
      <CardHeader>
        <CardTitle className="text-lg">{event.place.name}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex h-20 gap-16 p-4 w-full">
        <div className="w-4/5">{event.name}</div>
        <div className=" flex flex-row gap-4 items-center">
          <Separator orientation="vertical" />
          <div className="">{event.date}</div>
        </div>
      </CardContent>
    </Card>
  ));
}
