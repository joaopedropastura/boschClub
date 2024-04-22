"use server";

import verifySession from "@/actions/verify-session";
import AvatarIcon from "../avatar-icon/avatar";

export default async function ModalHead() {
    const session = await verifySession();
  
    return (
    <div className="flex flex-col align gap-4">
        <AvatarIcon style={"w-20 h-20 self-center"}/>
        <p>Agendamentos de {session.user?.name}</p>    
    </div>
  );
}
