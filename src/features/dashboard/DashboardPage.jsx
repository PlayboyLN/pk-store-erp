import AdminLayout from "../../layouts/AdminLayout";
import DashboardCards from "./components/DashboardCards";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <DashboardCards />
    </AdminLayout>
  );
}