"use server";
import UserSchedulesHistory from "@/actions/user-history-schedules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import UserCardSchedulesRecord from "./card-record";

export default async function HistorySchedules() {
  const data = await UserSchedulesHistory();
  console.log(data);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Histórico</AccordionTrigger>
        {data ? (
          <AccordionContent className="flex flex-col gap-4">
            <UserCardSchedulesRecord />
          </AccordionContent>
        ) : (
          <AccordionContent>nenhum envento cadastrado</AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  );
}
