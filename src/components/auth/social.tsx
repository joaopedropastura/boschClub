"use client";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Social() {

  const onClick = async (provider: "google" | "facebook") => {

    await signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT});
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        onClick={() => onClick("google")}
        size="lg"
        className="w-full"
        variant={"outline"}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => onClick("facebook")}
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
