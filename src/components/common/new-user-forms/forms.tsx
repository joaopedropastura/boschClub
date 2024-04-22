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

import { POST } from "@/app/api/user/route";
import apiError from "@/app/api/error/api-error";

const formSchema = z
  .object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
    passwordConfirm: z.string(),
    edv: z.string().min(8),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "as senhas não coincidem",
      path: ["passwordConfirm"],
    }
  );
export default function Forms() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      edv: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formValue = {
      email: values.email,
      name: values.name,
      password: values.password,
      edv: values.edv,
    };
    try {
      const response = await fetch(`${process.env.URI}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });
    } catch (error: unknown) {
      return apiError(error);
    }
  };

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>endereço de email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="endereço de email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>insira o seu nome</FormLabel>
                  <FormControl>
                    <Input placeholder="nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="edv"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>insira o edv</FormLabel>
                  <FormControl>
                    <Input placeholder="EDV" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>senha</FormLabel>
                  <FormControl>
                    <Input placeholder="senha" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>confirme a senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="confirme a senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            cadastrar
          </Button>
        </form>
      </Form>
    </main>
  );
}
