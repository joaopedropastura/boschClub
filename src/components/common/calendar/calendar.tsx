"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import UserSchedulesHistory from "@/actions/user-history-schedules";

export default function CalendarItem() {
  const [events, setEvents] = useState([]); 
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const data = await UserSchedulesHistory();
      setEvents(data.eventsWithRenter.map((e: { date: Date, type: String }) => ({ date: e.date, type: e.type})));
    };
    fetchData();
  }, []);


  return (
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
            new Date().getFullYear(),
            new Date().getMonth() + 2,
            new Date().getDate()
          )
      }

    />
  );
}
