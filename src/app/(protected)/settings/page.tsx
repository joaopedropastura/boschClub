import { auth, signOut } from "@/auth";

export default async function SettingPage() {
  const session = await auth();
  return (
    <div>
      <div>
        <h1>Settings</h1>
        <p>This is the settings page</p>
        {JSON.stringify(session)}
      </div>

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sair</button>
      </form>
    </div>
  );
}
