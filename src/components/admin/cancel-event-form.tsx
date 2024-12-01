"use client";

import * as React from "react";
import { useState, useTransition, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DeleteEvent } from "@/actions/event/cancel-event";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { AdminDeleteEvent } from "@/actions/event/admin-cancel-event";

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
  const [placeName, setPlaceName] = useState(event.place.name);
  const [reason, setReason] = useState("");

  useEffect(() => {
    setPlaceName(event.place.name);
  }, [event.place.name]);

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

  const onSubmit = async (id: string, reason: string) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      AdminDeleteEvent(id, reason).then((data) => {
        if (data.status === 500) {
          setError("Ocorreu algo de errado, tente novamente mais tarde");
          return;
        }

        if (data.status === 200) {
          setSuccess("Evento cancelado com sucesso");
        }
      });
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Reserva</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja cancelar essa reserva?
        </DialogDescription>
      </DialogHeader>
      <div className="">
        <div className="flex flex-col w-full space-y-4">
          <div>
            <Label>Nome:</Label>
            <Input disabled value={placeName} />
          </div>
          <div>
            <Label>Horário:</Label>
            <Input
              disabled
              value={`${formatDate(event.date)} | ${event.startTime && event.endTime ? `${event.startTime} ~ ${event.endTime}` : "Dia inteiro"}`}
            />
          </div>
          <div>
            <Label>Motivo:</Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
        </div>
      </div>
      <DialogFooter>
        <div className="flex w-full flex-col gap-2 justify-center items-center">
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="flex w-full justify-center items-center">
            <Button
              variant={"destructive"}
              className="w-full"
              onClick={() => onSubmit(event.id, reason)}
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
