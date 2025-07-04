import PrimaryLayout from "@/coms/MasterLayout/PrimaryLayout";

export default function ({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PrimaryLayout>{children}</PrimaryLayout>;
}
