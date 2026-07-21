import StatCard from "../../../components/ui/StatCard";
import { useDashboard } from "../hooks/useDashboard";

export default function DashboardCards() {
  const {
    produtos,
    categorias,
    estoqueBaixo,
    valorEstoque,
  } = useDashboard();

  return (
    <div className="grid grid-cols-4 gap-5">
      <StatCard
        titulo="Produtos"
        valor={produtos}
      />

      <StatCard
        titulo="Categorias"
        valor={categorias}
      />

      <StatCard
        titulo="Estoque Baixo"
        valor={estoqueBaixo}
      />

      <StatCard
        titulo="Valor em Estoque"
        valor={`R$ ${valorEstoque.toFixed(2)}`}
      />
    </div>
  );
}