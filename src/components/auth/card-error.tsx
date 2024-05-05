import { BackButton } from "@/components/auth/back-button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function CardError() {
  return (
    <CardWrapper
      headerLabel="Erro"
      backButtonHref="/auth/login"
      backButtonLabel="Voltar para o login"
    >
      <div className="w-full flex justify-center items-center"></div>
      <div className="w-full flex flex-row justify-center gap-4 items-center">
        <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />

        <h1 className="text-2xl font-bold">Ops! Algo deu errado</h1>

        <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
      </div>
    </CardWrapper>
  );
}
