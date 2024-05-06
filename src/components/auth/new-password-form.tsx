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
import { newPasswordSchema } from "@/schemas/user";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { useTransition, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

export function NewPasswordForm() {

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof newPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token!)
      .then((data ) => {
        setError(data?.error!);
        setSuccess(data?.success!);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="login"
      backButtonLabel="voltar para o login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full justify-center mb-8">
        <span>Digite a sua nova senha</span>

      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <div className="space-y-4">
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
          <Button className="w-full" type="submit" disabled={isPending}>
            resetar senha
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
