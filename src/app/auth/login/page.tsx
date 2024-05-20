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
  // className="bg-red w-full h-full flex items-center p-4"
  return (
    <main className={cn("bg-red w-full h-full flex justify-center items-center p-4", font.className)}>
      <LoginForm/>
    </main>
  );
}
 