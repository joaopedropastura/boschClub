"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "@/components/common/form-error";

type RoleGateProps = {
  children: React.ReactNode;
  allowRole: UserRole;
};

export function RoleGate({ children, allowRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowRole) {
    return <FormError message="Você não tem permissão" />;
  }

  return (
    <>
        {children}
    </>
    );
}
