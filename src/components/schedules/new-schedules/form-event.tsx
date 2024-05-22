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
import { useTransition, useState, use, useEffect } from "react";
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
import { eventAvailableSchema } from "@/schemas/event";

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
  const [dateInitial, setDateInitial] = useState<Array<string>>([]);
  const [dateFinal, setDateFinal] = useState<Array<string>>([]);
  const [hoursAvailable, setHoursAvailable] = useState<Array<string>>([]);
  const [isWeekday, setIsWeekday] = useState<boolean>();
  const [avalilableSchedules, setAvailableSchedules] = useState<Event[]>([]);
  const [Day, setDay] = useState<Date>(new Date());

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
    },
  });

  // useEffect(() => {
  //   async function fetchData() {
  //     const temp = {
  //       date: Day,
  //       placeId,
  //     };
  //     const data = await VerifyAvailableSchedules(temp);
  //     if (data !== undefined && data !== null) {
  //       setAvailableSchedules(data);
  //       console.log(data);
  //     }
  //   }
  //   fetchData();
  //   console.log(avalilableSchedules);
  // }, [Day]);

  useEffect(() => {
    const temp = {
      date: Day,
      placeId,
    };
    async function fetchData() {
      const data = await VerifyAvailableSchedules(temp);
      setAvailableSchedules(data!);
      console.log(data);
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

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      values.renterId = userId?.id.toString()!;
      values.placeId = placeId;
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
      console.log(placeType.name);
      setTypeOfPlace(placeType.name);
    };
    fetchData();
    console.log(typeOfPlace);
  }, []);

  return (
    <CardContent>
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
                        events={events}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {(typeOfPlace?.includes("Campo") ||
              typeOfPlace?.includes("Quadra")) && (
              <Select disabled={!dateSelected}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="selecione um horário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Selecione uma data disponível</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
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
