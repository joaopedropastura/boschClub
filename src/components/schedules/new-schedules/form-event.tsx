"use client";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { eventSchema } from "@/schemas/event";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { RegisterEvent } from "@/actions/event/event";
import { useTransition, useState, use } from "react";
import { CardContent } from "@/components/ui/card";
import NewEventDataPicker from "@/components/schedules/new-schedules/datapicker";
import SelectPlaces from "@/components/schedules/new-schedules/select-places";
import useCurrentUser from "@/hooks/use-current-user";

export default function NewEventForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userId = useCurrentUser();
  // const [identity, setIdentity] = useState<string>("");
  
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      placeId: "",
      renterId: "",
    }
  });

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      values.renterId = userId?.id.toString()!;
      RegisterEvent(values).then((data) => {
        if (data.status === 500) {
          setError("verifique os dados");
          return;
        }
        setSuccess("cadastro efetuado com sucesso");
      });
    });
  };

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nome do evento"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <NewEventDataPicker {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placeId"
              render={({ field }) => (
                <FormItem>
                  <SelectPlaces {...field} />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            criar evento
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}
