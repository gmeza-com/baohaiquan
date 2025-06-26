import PrimaryLayout from "@/coms/MasterLayout/PrimaryLayout";

export default function ({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PrimaryLayout>
      <div className="container">
        <div className="max-w-[660px] mx-auto py-4">{children}</div>
      </div>
    </PrimaryLayout>
  );
}
