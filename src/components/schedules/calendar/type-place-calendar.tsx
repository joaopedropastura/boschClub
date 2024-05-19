"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import UserSchedulesHistory from "@/actions/user-history-schedules";
import { getPlacesByTypeId } from "@/data/place/place";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { GetEventsByPlaceId } from "@/actions/event/event";

export default function CalendarItem({ typeId }: { typeId: string }) {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });


  useEffect(() => {
    const fetchData = async () => {
      const data = await GetEventsByPlaceId(typeId);
      setEvents(data.events.map((e: { date: Date, type: String }) => ({ date: e.date, type: e.type})));
      console.log(data)
    };
    fetchData();
  }, []);


  return (
    <div className="flex w-full flex-col gap-4">
      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        events={events}
        className="rounded-md w-full h-fit border"
        disabled={(date) =>
          date < new Date() ||
          date >
            new Date(
              new Date().getFullYear() + 1,
              new Date().getMonth(),
              new Date().getDate()
            )
        }
      /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Selecione a data do evento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
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
                      selected={date}
                      onSelect={setDate}
                      events={events}
                      className="rounded-md border"
                      disabled={(date) =>
                        date < new Date() ||
                        date >
                          new Date(
                            new Date().getFullYear() + 1,
                            new Date().getMonth(),
                            new Date().getDate()
                          )
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
