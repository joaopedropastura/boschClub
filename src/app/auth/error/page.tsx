import CardError from "@/components/auth/card-error";

export default function AuthErrorPage() {
  return (
    <div className="bg-red w-full justify-center h-full flex items-center p-4"> 
      <CardError/>
    </div>
  );
}
