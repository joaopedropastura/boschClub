"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Exit from "../../../../public/exit.svg";


export default function BtnLogout() {
  return (
    <button onClick={() => signOut()} style={{border: "none", backgroundColor: "#d1002300"}}>
      Sair
    </button>
  );
}
