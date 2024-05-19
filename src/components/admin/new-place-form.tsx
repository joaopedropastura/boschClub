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
import { CardWrapper } from "@/components/common/card-wrapper";
import { registerPlaceSchema } from "@/schemas/place";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { useTransition, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RegisterPlace from "@/actions/place/register-place";
import { GetTypeOfPlaces } from "@/actions/place/type-of-place";
import { Checkbox } from "@/components/ui/checkbox";
import { BackButton } from "../auth/back-button";

type TypeOfPlaceModel = {
  id: string;
  name: string;
};

export function RegisterPlaceForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [typeOfPlaces, setTypeOfPlaces] = useState<TypeOfPlaceModel[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await GetTypeOfPlaces();
      setTypeOfPlaces(data);
    }
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof registerPlaceSchema>>({
    resolver: zodResolver(registerPlaceSchema),
    defaultValues: {
      name: "",
      maxCapacity: 0,
      type: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerPlaceSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      RegisterPlace(values).then((data) => {
        if (data.status === 500) {
          setError("verifique os dados");
          return;
        }

        if (data.status === 201) {
          setSuccess("local criado com sucesso");
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="crie um local"
      backButtonLabel=""
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-6"}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nomeie o local"
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="selecione um local" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {typeOfPlaces.map((type, index) => (
                          <SelectItem
                            key={index}
                            value={type.id}
                            onClick={() => field.onChange(type.id)}
                          >
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2v w-full">
                    <label
                      htmlFor="terms"
                      className="text-sm w-full font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <BackButton href="/admin/new-type" label="Criar mais uma modalidade?" />
                      
                    </label>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>capacidade máxima</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="máximo de pessoas"
                      type="number"
                      disabled={isPending}
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
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
            criar local
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
