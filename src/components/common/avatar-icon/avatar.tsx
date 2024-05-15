"use server"
import verifySession from "@/actions/verify-session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AvatarIcon( 
    {style} : {style: string}
) {
  const session = await verifySession();


  return (
    <Avatar className={`${style} `}>
      <AvatarImage src={`${session?.user?.image}`} alt="@shadcn" />
      <AvatarFallback className="text-2xl">
        {session?.user?.name && session?.user?.name[0].toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
