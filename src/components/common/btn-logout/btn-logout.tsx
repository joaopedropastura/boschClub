"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Exit from "../../../../public/exit.svg";
import { redirect } from "next/navigation";


const logOut = () => {
  signOut();  
  redirect("/auth/login");


}


export default function BtnLogout() {
  return (
    <button onClick={() => logOut()} style={{border: "none", backgroundColor: "#d1002300"}}>
      Sair
    </button>
  );
}
