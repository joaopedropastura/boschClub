import { NavBar } from "./_components/navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <div className="h-full w-full flex flex-col items-center justify-center">
        {/* <Menu /> */}
        <NavBar />
        {children}
      </div>
  );
}
