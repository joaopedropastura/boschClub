"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import UserSchedulesHistory from "@/actions/user-history-schedules";
import { getPlacesByTypeId } from "@/data/place/place";

export default function CalendarItem({ typeId }: { typeId: string }) {
  const [events, setEvents] = useState([]); 
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlacesByTypeId(typeId);
      // setEvents(data.map((e: { date: Date, type: String }) => ({ date: e.date, type: e.type})));
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
        date < new Date() || date > new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())
      }

    />
  );
}
