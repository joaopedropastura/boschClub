import verifySession from "@/actions/verify-session";
import ProfileCard from "@/components/profile/modal-profile";

export default async function ProfilePage() {

    const session = await verifySession();

    return (
        <main>
            <ProfileCard />
        </main>
    );
}