"use server";

import { resetSchema } from "@/schemas/user";
import * as z from "zod";
import { getUserByEmail } from "@/data/user/user";
import { sendPassowrdResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const Reset = async (values: z.infer<typeof resetSchema>) => {
  const validateFields = resetSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: validateFields.error.errors[0].message,
    };
  }

  const { email } = validateFields.data;
  const exitstingUser = await getUserByEmail(email);

  if (!exitstingUser) {
    return {
      error: "Email não encontrado",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPassowrdResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Email enviado com sucesso" };
};
