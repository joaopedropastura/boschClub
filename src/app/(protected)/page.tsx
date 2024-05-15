import Width from "@/components/common/width/width";
import ThemeSwitcher from "@/components/common/theme-switcher/theme-switcher";
import ModalSchedules from "@/components/schedules/record/modal-schedules";
import Model3d from "@/components/common/model3d/model3d";
import NewEventForm from "@/components/schedules/new-schedules/form-event";
import NewEvent from "@/components/schedules/new-schedules/modal-schedules";
import verifySession from "@/actions/verify-session";
import TabSchedules from "@/components/schedules/tab/tab-schedules";
export default async function HomePage() {
  const session = await verifySession();


  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="flex flex-row w-full">
        <div className="w-full">
          {/* <NewEvent>
            <NewEventForm />
          </NewEvent> */}
          <TabSchedules />
        </div>

        {/* <div className="w-5/6 h-[60vh]">
          <Model3d />
        </div> */}
      </div>
    </div>
  );
}
