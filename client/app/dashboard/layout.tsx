export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen">
      <div className="bg-blue-900 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Organ Donation Management System</h1>
          <p className="text-blue-200 text-sm">AI for Good Initiative</p>
        </div>
      </div>
      <main className="py-4">{children}</main>
    </section>
  );
}
