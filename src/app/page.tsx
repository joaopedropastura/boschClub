import Width from "@/components/common/width/width";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Menu from "@/components/common/side-bar/side_bar";
export default async function HomePage() {

  const session = await getServerSession();
  if (!session){
    redirect("/signin")
  }

  return (
    <main>
      <h1>home page</h1>
        <Menu></Menu>
        <Width />
    </main>
  );
}
