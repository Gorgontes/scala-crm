import AppLayout from "@/app/_components/app-layout/app-layout";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}