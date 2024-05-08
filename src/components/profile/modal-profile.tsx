import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormIdConfirm from "@/components/profile/form-id-confirm";
// import AvatarIcon from "../../common/avatar-icon/avatar";
// import ModalHead from "./head";
// import HistorySchedules from "./record";

export default function ProfileCard({
}: {
}) {
  
  return (
    <Card>
      <CardHeader>
        Perfil
      </CardHeader>
      <CardContent>
        <FormIdConfirm />
      </CardContent>
    </Card>
  );
}
