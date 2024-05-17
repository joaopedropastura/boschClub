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
import NewEventForm from "../new-schedules/form-event";
import NewEvent from "@/components/schedules/new-schedules/modal-schedules";
import EventTypeOfList from "@/components/schedules/event-type-of-list";

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
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
