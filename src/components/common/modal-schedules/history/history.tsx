"use server";
import UserSchedulesHistory from "@/actions/user-history-schedules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UserCardSchedulesHistory from "../cardHistory";

type EventModel = {
  _id: string;
  name: string;
  date: string;
  place: {
    name: string;
    maxPeople: number;
  };
  renter: {
    name: string;
    email: string;
  };
  avaliable: boolean;
};

export default async function HistorySchedules() {
  const data = await UserSchedulesHistory();
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Histórico</AccordionTrigger>
        {data ? (
          <AccordionContent className="flex flex-col gap-4">
            <UserCardSchedulesHistory />
          </AccordionContent>
        ) : (
          <AccordionContent>nenhum envento cadastrado</AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
}
