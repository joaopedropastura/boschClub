"use client";

import logout from "@/actions/user/logout";

type LogOutProps = {
  children: React.ReactNode;
};

export default function LogOutButton({ children }: LogOutProps) {

    const onClick = () => {
        logout();
    }

  return(
    <span onClick={onClick} className="cursor-pointer">
        {children}
    </span>
    );
}
