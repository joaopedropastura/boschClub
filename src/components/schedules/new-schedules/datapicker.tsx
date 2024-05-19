"use server";
import * as z from "zod";
import { eventSchema } from "@/schemas/event";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { FormControl, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { ControllerRenderProps } from "react-hook-form";
import { GetEventsByPlaceId } from "@/actions/event/event";

export default async function NewEventDataPicker(
  field: ControllerRenderProps<z.infer<typeof eventSchema>, "date">,
  placeId: string


) {

  const events = await GetEventsByPlaceId(placeId);


  return (
    <FormItem>
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
  );
}
