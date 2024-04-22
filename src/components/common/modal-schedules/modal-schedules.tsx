import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AvatarIcon from "../avatar-icon/avatar";
import ModalHead from "./head";
import HistorySchedules from "./history";

export default function ModalSchedules(
    {children} : {children: React.ReactNode}
) {
  return (
    <Card>
      <CardHeader>
        <ModalHead />
      </CardHeader>
      <CardContent>
        {children}
        <HistorySchedules />
      </CardContent>
    </Card>
  );
}
