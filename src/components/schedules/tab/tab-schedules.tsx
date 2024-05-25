import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import NewEventForm from "../new-schedules/form-event";
import NewEvent from "@/components/schedules/new-schedules/modal-schedules";
import EventTypeOfList from "@/components/schedules/event-type-of-list";
import ModalSchedules from "@/components/schedules/record/modal-schedules";
import CalendarItem from "@/components/schedules/calendar/type-place-calendar";

export default function TabSchedules() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="makeSchedule">Fazer reserva</TabsTrigger>
        <TabsTrigger value="recordSchedules">Minhas reservas</TabsTrigger>
      </TabsList>
      <TabsContent value="makeSchedule">
        <NewEvent>
          <EventTypeOfList />
        </NewEvent>
      </TabsContent>
      <TabsContent value="recordSchedules">
        <ModalSchedules>
          {/* <CalendarItem /> */}
          <div></div>
        </ModalSchedules>
      </TabsContent>
    </Tabs>
  );
}
