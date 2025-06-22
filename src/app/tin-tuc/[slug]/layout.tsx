import PrimaryLayout from "@/coms/MasterLayout/PrimaryLayout";

export default function ({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PrimaryLayout>
      <div className="bg-yellow-50">{children}</div>
    </PrimaryLayout>
  );
}
