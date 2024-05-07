import verifySession from "@/actions/verify-session";
import AvatarIcon from "@/components/common/avatar-icon/avatar";
import CalendarItem from "@/components/common/calendar/calendar";
import ModalHead from "@/components/schedules/record/head";
import ModalSchedules from "@/components/schedules/record/modal-schedules";
import React from "react";

export default function EventSchedulingPage() {
  return (
    <main>
      <div className="h-full flex-col flex items-center justify-center">
        <div className="flex">
          <ModalSchedules>
            <CalendarItem />
          </ModalSchedules>
        </div>
      </div>
    </main>
  );
}
