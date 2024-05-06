"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";

export default function NewVerificationForm() {
  const searchParams = useSearchParams();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Token não encontrado");
      return;
    }

    newVerification(token!)
      .then((data) => {
        setError(data?.error!);
        setSuccess(data?.message!);
      })
      .catch(() => {
        setError("algo deu errado! Tente novamente mais tarde.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel={""}
      backButtonLabel={"voltar para o login"}
      backButtonHref={"/auth/login"}
    >
      <div className="flex flex-col gap-8 items-center w-full justify-center">
        <span>Confirmando sua verificação</span>
        {!success && !error && (
          <BeatLoader size={10} color={"#000"} loading={true} />
        )}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
