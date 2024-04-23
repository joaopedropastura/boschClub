import * as z from "zod";

import { registerSchema } from "@/schemas/user";

export default async function RegisterUser(
  values: z.infer<typeof registerSchema>
) {
  const newUser = {
    email: values.email,
    name: values.name,
    password: values.password,
    edv: values.edv,
    authorized: false,
  };

  const response = await fetch(`http://localhost:3000/api/user`, {
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
