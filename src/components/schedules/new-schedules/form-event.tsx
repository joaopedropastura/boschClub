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
import { RegisterEvent } from "@/actions/event";
import { useTransition, useState } from "react";
import { CardContent } from "@/components/ui/card";
import NewEventDataPicker from "@/components/schedules/new-schedules/datapicker";
import SelectPlaces from "@/components/schedules/new-schedules/select-places";

export default function newEventForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [identity, setIdentity] = useState<string>("");
  
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      place: {
        name: "",
        maxPeople: 0,
      },
      renter: {
        name: "",
        email: "",
      },
    }
  });

  const onSubmit = async (values: z.infer<typeof eventSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <SelectPlaces />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <FormError message={identity} />
          <Button className="w-full" type="submit" disabled={isPending}>
            criar evento
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}
