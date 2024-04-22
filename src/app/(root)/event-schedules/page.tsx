import verifySession from "@/actions/verify-session";
import AvatarIcon from "@/components/common/avatar-icon/avatar";
import CalendarItem from "@/components/common/calendar/calendar";
import ModalHead from "@/components/common/modal-schedules/head";
import ModalSchedules from "@/components/common/modal-schedules/modal-schedules";
import React from "react";

export default function EventSchedulingPage() {
  return (
    <main>
      <div className="h-full flex-col flex items-center justify-center">
        <h1>event scheduling page</h1>
        <div className="flex">
          <ModalSchedules>
            <CalendarItem />
          </ModalSchedules>
        </div>
      </div>
    </main>
  );
}
