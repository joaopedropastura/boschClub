"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  events?: Array<{ date: string }>;
  disabledDays?: Array<{ date: string }>;
};

function Calendar({
  className,
  classNames,
  events = [],
  disabledDays = [],
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // Calculate the date two months from today
  const today = new Date();
  const twoMonthsLater = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());

  // Combine disabledDays with dates before today and after two months from today
  const allDisabledDays = [
    ...disabledDays.map((day) => new Date(day.date)),
    ...Array.from({ length: 60 }, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - i - 1)), // Dates before today
    ...Array.from({ length: 365 }, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + i + 1)).filter(date => date > twoMonthsLater) // Dates after two months from today
  ];

  const modifiers = {
    eventDay: events.map((event) => new Date(event.date)),
    disabled: allDisabledDays,
  };

  const modifiersStyles = {
    eventDay: {
      color: "white",
      backgroundColor: "red",
    },
    disabled: {
      color: "gray",
      backgroundColor: "lightred",
      pointerEvents: 'none' as 'none'
    },
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-80 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",

        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      modifiers={modifiers}
      modifiersStyles={modifiersStyles}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
