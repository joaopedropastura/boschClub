import Width from "@/components/common/width/width";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Menu from "@/components/common/top-bar/top-bar";
import ThemeSwitcher from "@/components/common/theme-switcher/theme-switcher";
import ModalSchedules from "@/components/schedules/record/modal-schedules";
import Model3d from "@/components/common/model3d/model3d";
import NewEventForm from "@/components/schedules/new-schedules/form-event";
import NewEvent from "@/components/schedules/new-schedules/modal-schedules";
export default async function HomePage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="flex flex-row w-full">
        <div className="w-3/6">
          <NewEvent>
            <NewEventForm />
          </NewEvent>
        </div>
        <div className="w-5/6 h-[60vh]">
          {/* <Model3d /> */}
        </div>
      </div>
    </div>
  );
}
