import Menu from "@/components/common/top-bar/top-bar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="">
            <Menu/>
            {children}
        </div>
      );
  }
  