"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerPlaceSchema } from "@/schemas/place";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { useTransition, useState, useEffect } from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DeleteEvent } from "@/actions/event/cancel-event";

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

type CancelEventProps = {
  event: EventModel;
};

export function CancelEvent({ event }: CancelEventProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [placeName, setPlaceName] = useState("");

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  useEffect(() => {
    setPlaceName(event.place.name);
  }, []);

  function formatTime(timeString: string) {
    const date = new Date(timeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  const onSubmit = async (id: string) => {
    setError("");
    setSuccess("");
    setPlaceName("");

    startTransition(() => {
      DeleteEvent(id).then((data) => {
        if (data.status === 500) {
          setError("ocorreu algo de errado, tente novamente mais tarde");
          return;
        }

        if (data.status === 200) {
          setSuccess("evento cancelado com sucesso");
        }
      });
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Reserva</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja concelar sua reserva?
        </DialogDescription>
      </DialogHeader>
      <div className="">
        <div className="flex flex-col w-full">
          <div>
            <Label>Nome:</Label>
            <Input disabled value={placeName} />
          </div>
          <div>
            <Label>Horário:</Label>
            <Input
              disabled
              value={`${formatDate(event.date)} ${formatTime(
                event.startTime
              )} ~ ${formatTime(event.endTime)}`}
            />
          </div>
        </div>
      </div>
      <DialogFooter >
        <div className="flex w-full flex-col gap-2 justify-center items-center">
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className="flex w-full justify-center items-center">
          <Button
            variant={"destructive"}
            className="w-full"
            onClick={() => onSubmit(event.id)}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </div>
        </div>
      </DialogFooter>
    </>
  );
}
