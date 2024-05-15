"use client"

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
import RegisterTypeOfPlace from "@/actions/place/register-type-of-place";


type TypeOfPlaceModel = {
    id: string;
    name: string;
  };
  
export default function RegisterTypeOfPlaceForm() {


    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [typeOfPlaces, setTypeOfPlaces] = useState<TypeOfPlaceModel[]>([]);


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
          RegisterTypeOfPlace(values).then((data) => {
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
          headerLabel="crie uma nova modalidade"
          backButtonLabel="voltar para o cadastro de locais"
          backButtonHref="/admin/register-place"
        >
          {/* <div className="flex w-full justify-center mb-8">
            <span>crie um local</span>
          </div> */}
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
                          placeholder="insira o nome da nova modalidade"
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
                criar local
              </Button>
            </form>
          </Form>
        </CardWrapper>
      );

}