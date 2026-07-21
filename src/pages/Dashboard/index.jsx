import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import StatCard from "../../components/ui/StatCard";
import { carregarDashboard } from "../../features/dashboard/services/dashboardService";

export default function Dashboard() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const res = await carregarDashboard();
    setDados(res);
  }

  if (!dados) {
    return (
      <AdminLayout>
        Carregando...
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">

        <StatCard titulo="Produtos" valor={dados.totalProdutos} />

        <StatCard titulo="Ordens" valor={dados.totalOS} />

        <StatCard titulo="Em Reparo" valor={dados.emReparo} />

        <StatCard titulo="Prontas" valor={dados.prontas} />

      </div>
    </AdminLayout>
  );
}