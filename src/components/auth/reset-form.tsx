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
import { resetSchema } from "@/schemas/user";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { Reset } from "@/actions/reset";
import { useTransition, useState } from "react";

export function ResetForm() {
  
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof resetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      Reset(values)
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
        <span>Esqueceu sua senha?</span>

      </div>
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
            
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            enviar email de recuperação
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
