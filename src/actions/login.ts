"use server"

import * as z from "zod";

import { loginSchema } from "@/schemas/user-login";


export default async function Login(values: z.infer<typeof loginSchema>) {
  
  
  const response = await fetch(
    `${process.env.URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

  const data = await response.json();
  
  return {
    data: data,
    status: response.status
  };
}