import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AvatarIcon from "../../common/avatar-icon/avatar";
export default function ModalSchedules(
    {children} : {children: React.ReactNode}
) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        novo evento
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
