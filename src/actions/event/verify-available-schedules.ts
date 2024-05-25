"use server";

import * as z from "zod";

import { eventAvailableSchema } from "@/schemas/event";
const domain = process.env.NEXT_PUBLIC_APP_URL

function extractTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function calculateEventHours(startTimeString: string, endTimeString: string): number {
  const startDate = new Date(startTimeString);
  const endDate = new Date(endTimeString);
  const durationInMilliseconds = endDate.getTime() - startDate.getTime();
  return durationInMilliseconds / (1000 * 60 * 60);
}

function addSchedules(startTimeString: string, hours: number): string[] {
  const startDate = new Date(startTimeString);
  const schedules = [];
  for (let i = 0; i < hours; i++) {
    const newTime = new Date(startDate.getTime() + i * 60 * 60 * 1000);
    schedules.push(extractTime(newTime.toISOString()));
  }
  return schedules;
}

function generateTimeSlots(startHour: number, endHour: number): Date[] {
  const slots: Date[] = [];
  const currentDate = new Date();
  currentDate.setHours(startHour, 0, 0, 0);

  for (let i = startHour; i <= endHour; i++) {
    const slot = new Date(currentDate);
    slots.push(slot);
    currentDate.setHours(currentDate.getHours() + 1);
  }

  return slots;
}



export async function VerifyAvailableSchedules(values: z.infer<typeof eventAvailableSchema>) {
  
    const eventData = {
      date: values.date,
      placeId: values.placeId
  };

  const response = await fetch(`${domain}/api/event/events-by-place-id-and-date`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

    const data = await response.json();
    const schedules: string[] = [];
    const timeSlots = generateTimeSlots(9, 21);
    const temp = data.events.map((event: any) => {

      const eventDuration = calculateEventHours(event.startTime, event.endTime);
      const eventSchedules = addSchedules(event.startTime, eventDuration);
      schedules.push(...eventSchedules);
  
    })

    const res = {
      ...data.events,
      schedules: schedules,
    }
    return res


}