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
import { userSchema } from "@/schemas/user";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { RegisterEvent } from "@/actions/event/event";
import { useTransition, useState, useEffect } from "react";
import { CardContent } from "@/components/ui/card";
import NewEventDataPicker from "@/components/schedules/new-schedules/datapicker";
import SelectPlaces from "@/components/schedules/new-schedules/select-places";
import verifySession from "@/actions/verify-session";
import { Session } from "next-auth";

type User = {
  name: String,
  email: String,
  image: String
}

export default function IdConfirmationForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [identity, setIdentity] = useState<User>();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      edv: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    setError("");
    setSuccess("");

    // startTransition(() => {
    //   RegisterEvent(values).then((data) => {
    //     if (data.status === 500) {
    //       setError("verifique os dados");
    //       return;
    //     }
    //     setSuccess("cadastro efetuado com sucesso");
    //   });
    // });
  };

  // const [session, setSession] = useState<Session>();
  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await verifySession();
  //     setSession(data);
  //   }
  //   fetchData();
  // }, []);


  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="edv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    {/* <Input placeholder={identity.name} type="text" disabled {...field} /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="edv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EDV</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="digite aqui o seu EDV"
                      type="text"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          {/* <FormError message={identity} /> */}
          <Button className="w-full" type="submit" disabled={isPending}>
            confirmar identidade
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}
