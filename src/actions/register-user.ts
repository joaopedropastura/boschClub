"use server"
import bcrypt from "bcryptjs";
import * as z from "zod";

import { registerSchema } from "@/schemas/user";

export default async function RegisterUser(
  values: z.infer<typeof registerSchema>
) {


  const hashedPassword = await bcrypt.hash(values.password, 10);
  const newUser = {
    email: values.email,
    name: values.name,
    password: hashedPassword,
    edv: values.edv,
    authorized: false,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const data = await response.json();

  return {
    data: data,
    status: response.status,
  };
}
