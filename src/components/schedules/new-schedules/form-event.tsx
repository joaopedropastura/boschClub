"use client";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { eventSchema } from "@/schemas/event";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { GetEventsByPlaceId, RegisterEvent } from "@/actions/event/event";
import { useTransition, useState, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import useCurrentUser from "@/hooks/use-current-user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { GetPlaceByTypeId } from "@/actions/place/places";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VerifyAvailableSchedules } from "@/actions/event/verify-available-schedules";

export default function NewEventForm({
  placeId,
  maxCapacity,
  typeId,
}: {
  typeId: string;
  placeId: string;
  maxCapacity: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = useCurrentUser();
  const [events, setEvents] = useState([]);
  const [typeOfPlace, setTypeOfPlace] = useState<string>("");
  const [dateSelected, setDateSelected] = useState(false);
  const [Day, setDay] = useState<Date>(new Date());
  const [selectedStartHour, setSelectedStartHour] = useState<string>("");
  const [nextHourAvailable, setNextHourAvailable] = useState<boolean>(true);
  const [hoursUnavailable, setHoursUnavailable] = useState<Array<string>>([]);
  const [isWeekday, setIsWeekday] = useState<boolean>();
  const [avalilableSchedules, setAvailableSchedules] = useState<Event[]>([]);
  const [hoursAvailable, setHoursAvailable] = useState<Array<string>>([]);

  const hours = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  type Event = {
    id: string;
    name: string;
    placeId: string;
    renterId: string;
    startTime: string;
    endTime: string;
    date: Date;
  };

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      placeId: "",
      renterId: "",
      startTime: "",
      endTime: "",
    },
  });

  useEffect(() => {
    const temp = {
      date: Day,
      placeId,
    };
    async function fetchData() {
      const data = await VerifyAvailableSchedules(temp);
      setAvailableSchedules(data!);
      setHoursUnavailable(data.schedules);
    }
    fetchData();
  }, [Day]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.date) {
        const date = new Date(value.date);
        const day = date.getDay();
        let temp = day >= 1 && day <= 5;
        setIsWeekday(temp);
        setDay(date);
      }
      setDateSelected(!!value.date);
    });
    return () => subscription.unsubscribe();
  }, [form, isWeekday]);

  useEffect(() => {
    if (selectedStartHour) {
      const startHourIndex = hours.indexOf(selectedStartHour);
      const nextHour = hours[startHourIndex + 1];
      setNextHourAvailable(!hoursUnavailable.includes(nextHour));
    }
  }, [selectedStartHour, hoursUnavailable]);

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      values.renterId = userId?.id.toString()!;
      values.placeId = placeId;

      if (values.endTime === "") values.endTime = selectedStartHour;

      RegisterEvent(values).then((data) => {
        if (data.status === 500) {
          setError("verifique os dados");
          return;
        }
        setSuccess("cadastro efetuado com sucesso");
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetEventsByPlaceId(placeId);
      const placeType = await GetPlaceByTypeId(typeId);
      setEvents(
        data.events.map((e: { date: Date; type: String }) => ({
          date: e.date,
          type: e.type,
        }))
      );
      setTypeOfPlace(placeType.name);
    };
    fetchData();
  }, []);

  const getFilteredEndHours = () => {
    if (!selectedStartHour || !nextHourAvailable) return [];

    const startHourIndex = hours.indexOf(selectedStartHour);
    const filteredEndHours = [];

    const dayOfWeek = Day.getDay();
    const limitHour = dayOfWeek === 0 ? "15:30" : "21:00"; 

    for (let i = startHourIndex + 1; i < hours.length; i++) {
      const currentHour = hours[i];
      if (hoursUnavailable.includes(currentHour) || currentHour > limitHour) {
        break; 
      }
      filteredEndHours.push(currentHour);
      if (filteredEndHours.length >= 2) {
        break; 
      }
    }

    return filteredEndHours;
  };

  return (
    <CardContent className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {maxCapacity > 0 && (
                    <FormLabel>Máximo de convidados: {maxCapacity}</FormLabel>
                  )}
                  <FormControl>
                    <Input
                      placeholder="nome do evento"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() ||
                          date >
                            new Date(
                              new Date().getFullYear() + 1,
                              new Date().getMonth(),
                              new Date().getDate()
                            )
                        }
                        disabledDays={typeOfPlace.includes("Churrasqueira") ? events : []}
                        events={events}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              {(typeOfPlace?.includes("Campo") ||
                typeOfPlace?.includes("Quadra")) && (
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <Select
                      disabled={!dateSelected}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedStartHour(value);
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="horário início" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            Selecione um horário disponível
                          </SelectLabel>
                          {hours.map((hour) => {
                            const isAvailable = hoursUnavailable.includes(hour);
                            const dayOfWeek = Day.getDay();
                            const limitHour =
                              dayOfWeek === 0 ? "15:30" : "21:00"; 
                            return (
                              <SelectItem
                                key={hour}
                                value={hour}
                                disabled={isAvailable || hour > limitHour}
                              >
                                {hour}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
              {(typeOfPlace?.includes("Campo") ||
                typeOfPlace?.includes("Quadra")) && (
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <Select
                      disabled={!selectedStartHour || !nextHourAvailable}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="horário final" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            Selecione um horário disponível
                          </SelectLabel>
                          {getFilteredEndHours().map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            criar evento
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}
