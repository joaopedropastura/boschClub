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
import { loginSchema } from "@/schemas/user";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import Login from "@/actions/login";
import { useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ?
  "Email já está sendo usado em outro provedor!" : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      Login(values)
      .then((data) => {
        setError(data?.error!);
        setSuccess(data?.success!);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="login"
      backButtonLabel="ainda não tem uma conta?"
      backButtonHref="/auth/register"
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
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            entrar
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
