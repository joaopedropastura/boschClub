import UserSchedulesHistory from "@/actions/user-history-schedules";

export default async function useEventsUser() {
  const data = await UserSchedulesHistory();
  return data?.eventsWithRenter;
}
