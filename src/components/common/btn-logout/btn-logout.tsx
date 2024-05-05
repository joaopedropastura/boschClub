import { signOut } from "@/auth";
import Image from "next/image";
import Exit from "../../../../public/exit.svg";
import { redirect } from "next/navigation";


export default function BtnLogout() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <button type="submit">Sair</button>
    </form>
  );
}
