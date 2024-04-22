"use server";

import UserSchedulesHistory from "@/actions/user-history-schedules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  avaliable: boolean;
};

export default async function HistorySchedules() {
  const data = await UserSchedulesHistory();

  // console.log("TESTE:" + data.events[0].name);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Histórico</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          {data.map((event: any) => (
            <Card>
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
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
