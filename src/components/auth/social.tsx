"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        size="lg"
        className="w-full"
        variant={"outline"}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => signIn("facebook", { callbackUrl: "/" })}
        size="lg"
        className="w-full"
        variant={"outline"}
      >
        <FaFacebook className="h-5 w-5" />
      </Button>

      {/* <Button className="w-32" onClick={() => signIn("github", { callbackUrl: "/" })}>
              github
            </Button> */}
    </div>
  );
}
