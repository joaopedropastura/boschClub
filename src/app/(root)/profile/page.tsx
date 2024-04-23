import verifySession from "@/actions/verify-session";

export default async function ProfilePage() {

    const session = await verifySession();

    return (
        <main>
        <h1>profile page</h1>
        {
            session ? (
                <div>
                    <h2>Profile</h2>
                    <p>{session?.user?.email}</p>
                    <p>{session?.user?.name}</p>
                </div>
            ) : (
                <div>
                    <h2>Not logged in</h2>
                </div>
            )
        }
        </main>
    );
}