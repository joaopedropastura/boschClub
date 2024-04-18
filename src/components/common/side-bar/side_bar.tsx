import Image from "next/image";
import Link from "next/link";
import Profile from "../../../../public/profile.svg";
import Field from "../../../../public/field.svg";
import Menu from "../../../../public/menu.svg";
import Callendar from "../../../../public/callendar.svg";
import Feed from "../../../../public/feed.svg";
import ClubeBoschLogo from "../../../../public/clubBosch.svg";

import BtnLogout from "../btn-logout/btn-logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserOptions from "../user-options/user-options";

type UserData = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

export default async function menu(){

  const session = await getServerSession();
  if (!session){
    redirect("/login")
  }
  
  return (
    <ul className="menu">
      <li>
        <Link href="/">
          <Image
            src={ClubeBoschLogo}
            alt={"icone do clube bosch"}
            height={42}
            width={42}
          ></Image>
        </Link>
      </li>
      <li>
        <Link href="/profile">
          <Image
            src={Profile}
            alt={"icone de perfil"}
            height={32}
            width={32}
          ></Image>
        </Link>
      </li>

      <li>
        <Link href="/cursos">cursos</Link>
      </li>

      <li>
        <Image
          src={Field}
          alt={"icone do campo de futebol"}
          height={32}
          width={32}
        ></Image>
      </li>

      <li>
        <Image
          src={Menu}
          alt={"icone do cardapio"}
          height={32}
          width={32}
        ></Image>
      </li>

      <li>
        <BtnLogout />
      </li>
      <li>
        <Image
          src={Callendar}
          alt={"icone de um calendário"}
          height={21}
          width={21}
        ></Image>
      </li>
      <li>
        <Image
          src={Feed}
          alt={"icone da pagina de feed"}
          height={21}
          width={21}
        ></Image>
      </li>

      <li>
        <UserOptions/>
      </li>
    </ul>
  );
};
