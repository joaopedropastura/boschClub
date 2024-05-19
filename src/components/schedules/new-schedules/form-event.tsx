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
import NewEventDataPicker from "@/components/schedules/new-schedules/datapicker";
import SelectPlaces from "@/components/schedules/new-schedules/select-places";
import useCurrentUser from "@/hooks/use-current-user";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function NewEventForm({ placeId, maxCapacity }: { placeId: string, maxCapacity: number}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = useCurrentUser();
  const [events, setEvents] = useState([]);
  // const [identity, setIdentity] = useState<string>("");

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      placeId: "",
      renterId: "",
    },
  });

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
      setEvents(
        data.events.map((e: { date: Date; type: String }) => ({
          date: e.date,
          type: e.type,
        }))
      );
      console.log(data);
    };
    fetchData();
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
                  {/* <FormLabel>
                    nome do evento
                  
                  </FormLabel> */}
                  <FormLabel>máximo de convidados: {maxCapacity}</FormLabel>
                  
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
            {/* <FormField
              control={form.control}
              name="placeId"
              render={({ field }) => (
                <FormItem>
                  <SelectPlaces {...field} />
                </FormItem>
              )}
            /> */}
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
