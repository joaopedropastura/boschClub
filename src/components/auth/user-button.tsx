"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useCurrentUser from "@/hooks/use-current-user";
import LogOutButton from "@/components/auth/logout-button";
import { LogOut, User, CalendarFold } from "lucide-react";
import Link from "next/link";

export default function UserButton() {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-primary-foreground">
            {user?.name && user?.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end">
      <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <Link href="/profile">
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>
      <DropdownMenuItem>
          <CalendarFold className="mr-2 h-4 w-4" />
          <Link href="/record-schedules">
            <span>Agendamentos</span>
          </Link>
        </DropdownMenuItem>
        <LogOutButton>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </DropdownMenuItem>
        </LogOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
