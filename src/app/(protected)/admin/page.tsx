"use client";

import admin from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/common/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

export default function AdminPage() {

  const onServerActionClick = () => {
    admin()
      .then((data) => {
        if(data.error) {
          toast.error(data.error)
        }
        if(data.success) {
          toast.success(data.success)
        }
      })
    }
  const onApiRouteClick = () => {
    fetch('/api/admin')
      .then((response) => {
        if(response.ok) {
          toast.success('api route ok')
        } else {
          toast.error('api route error')
        }

      })
  }

  return (
    <Card className="w-11/12">
      <CardHeader>
        <span className="text-2xl font-semibold text-center">Admin</span>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowRole={UserRole.ADMIN}>
          <FormSuccess message="Você é um admin" />
        </RoleGate>
        
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <span className="text-sm font-medium">adm api route</span>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <span className="text-sm font-medium">adm api server action</span>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
