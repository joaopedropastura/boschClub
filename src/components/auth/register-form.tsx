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
import { CardWrapper } from "./card-wrapper";
import { registerSchema } from "@/schemas/user";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import RegisterUser from "@/actions/register-user";
import { useTransition, useState } from "react";

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reqEmail, setReqEmail] = useState("");
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      edv: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setError("");
    setSuccess("");
    setReqEmail("");

    startTransition(() => {
      RegisterUser(values).then((data) => {
        if (data.status === 500) {
          setError("verifique os dados");
          return;
        }
        if (data.status === 400) {
          if (data.data.message === "User already exists")
            setError("usuário ja cadastrado");

          if (data.data.message === "EDV already exists")
            setError("EDV ja cadastrado");
          return;
        }
        if (data.status === 201) {
          setSuccess("cadastro efetuado com sucesso");
          setReqEmail("um email de confirmação foi enviado");
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="registre uma conta"
      backButtonLabel="ja possui uma conta?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="endereço de email"
                      type="email"
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ensira seu nome"
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
              name="edv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>edv</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ensira seu edv"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <FormSuccess message={reqEmail} />
          <Button className="w-full" type="submit" disabled={isPending}>
            criar conta
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
