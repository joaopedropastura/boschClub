import { ExtendedUser } from "@/next-auth";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export function UserInfo({ user, label }: UserInfoProps) {
  return (
    <div>
      <div>{label}</div>
      <div>{user?.name}</div>
      <div>{user?.email}</div>
    </div>
  );
}
