"use client";

import Image from "next/image";
import ClubeBoschLogo from "@/../public/clubBosch.svg"

import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

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
 