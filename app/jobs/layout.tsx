import { MainNav } from "@/components/main-nav";

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNav />
      <main>{children}</main>
    </>
  );
}