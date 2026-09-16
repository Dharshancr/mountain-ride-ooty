import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // The /admin/login page has no session and renders its own full-page layout,
  // so we only apply the dashboard shell when a session exists.
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col md:flex-row">
      <AdminSidebar adminName={session.name} />
      <div className="flex-1 min-w-0">
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
