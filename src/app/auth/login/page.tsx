"use client";

import Image from "next/image";
import ClubeBoschLogo from "@/../public/clubBosch.svg"

import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginButton } from "@/components/auth/login-button";
import Social from "@/components/auth/social";
import { LoginForm } from "@/components/auth/login-form";



const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Login() {
  
  return (
    <main className={cn("", font.className)}>
      <LoginForm/>
    </main>
  );
}
 