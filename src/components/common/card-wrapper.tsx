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
  backButtonLabel?: string;
  backButtonHref?: string;
}

export function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className="flex w-full justify-center p-4">
            {headerLabel}

        </div>
        
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter>
        {
            backButtonHref && backButtonLabel &&
            <BackButton
                label={backButtonLabel}
                href={backButtonHref}
            />
        }

      </CardFooter>
    </Card>
  );
}
