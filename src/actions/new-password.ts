"use server";

import * as z from "zod";
import { newPasswordSchema } from "@/schemas/user";
import {
  getPasswordResetTokenByEmail,
  getPasswordResetTokenByToken,
} from "@/data/user/password-reset-token";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user/user";


export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string
) => {
  if (!token) {
    return {
      error: "Token inválido",
    };
  }

  const validetedFields = newPasswordSchema.safeParse(values);

  if (!validetedFields.success) {
    return {
      error: "Campos inválidos",
    };
  }

  const { password } = validetedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token inválido",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return {
      error: "Token expirado",
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "Usuário não encontrado",
    };
  }
  const hashPassword = await bcryptjs.hash(password, 10);

  try {
      await db.user.update({
        where: { id: existingUser.id },
        data: {
          password: hashPassword,
        },
      });
    
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    
      return {
        success: "Senha alterada com sucesso",
      };

  } catch (error) {
    return {
      error: "Erro ao alterar senha",
    };
  }

};
