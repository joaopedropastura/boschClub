import NewUserForms from "@/components/common/new-user-forms/forms";
import Model3d from "@/components/common/model3d/model3d";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";
import { signIn } from "next-auth/react";

export default async function SignUpPage() {
  return (
    <main className="mainFrame">


      <NewUserForms />
    </main>
  );
}
