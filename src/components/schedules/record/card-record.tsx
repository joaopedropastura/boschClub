"use server";

import UserSchedulesHistory from "@/actions/user-history-schedules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CancelEvent } from "@/components/schedules/record/cancel-event-form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type EventModel = {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  place: {
    name: string;
    maxPeople: number;
    typeName: string;
  };
  typePlace: {
    name: string;
  };
  renter: {
    name: string;
    email: string;
  };
};

export default async function UserCardSchedulesHistory() {
  const data = await UserSchedulesHistory();

  data.eventsWithRenter.map((e: EventModel) => {});

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  function formatTime(timeString: string) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  return data.eventsWithRenter?.map((event: EventModel, index: number) => (
    <Card key={index}>
      <CardHeader className="pt-4 pl-4 pr-4 pb-0 flex justify-center">
        <CardTitle className="text-base flex justify-between items-center">
          {event.typePlace.name}
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <CancelEvent event={event} />
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex h-20 gap-16 justify-between p-4 w-full">
        <div className="flex flex-row gap-4 items-center justify-center">
          {event.place.name}
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <Separator orientation="vertical" />
          <div className="flex flex-col p-4 g-4">
            <div>{formatDate(event.date)}</div>
            <div className="text-xs">
              {formatTime(event.startTime) === "00:00"
                ? "Dia inteiro"
                : `${formatTime(event.startTime)} ~ ${formatTime(
                    event.endTime
                  )}`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
}
