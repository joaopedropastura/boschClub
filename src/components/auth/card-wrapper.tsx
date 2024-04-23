"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import ClubeBoschLogo from "@/../public/clubBosch.svg";
import Social from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="flex self-center">
          <Image
            src={ClubeBoschLogo}
            alt={"icone do clube bosch"}
            height={92}
            width={92}
          ></Image>
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>

        <BackButton
            label={backButtonLabel}
            href={backButtonHref}
        />

      </CardFooter>
    </Card>
  );
}
