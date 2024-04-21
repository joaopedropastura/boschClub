import Width from "@/components/common/width/width";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Menu from "@/components/common/top-bar/top-bar";
import ThemeSwitcher from "@/components/common/theme-switcher/theme-switcher";
import ModalSchedules from "@/components/common/modal-schedules/modal-schedules";
export default async function HomePage() {

  const session = await getServerSession();
  if (!session){
    redirect("/auth/login")
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">

      <h1>home page</h1>
    </div>
  );
}
