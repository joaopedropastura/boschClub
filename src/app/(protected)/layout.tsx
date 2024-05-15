import { NavBar } from "./_components/navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <div className="h-full w-full flex flex-col items-center p-4">
        {/* <Menu /> */}
        <NavBar />
        {children}
      </div>
  );
}
