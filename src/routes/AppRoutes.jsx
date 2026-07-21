import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Produtos from "../pages/Produtos";
import Categorias from "../pages/Categorias";

import OrdemServico from "../features/ordemServico/OrdemServicoPage";
import Movimentacoes from "../features/estoque/MovimentacoesPage";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/categorias" element={<Categorias />} />

      <Route path="/os" element={<OrdemServico />} />
      <Route path="/ordens-servico" element={<OrdemServico />} />

      <Route path="/estoque" element={<Movimentacoes />} />

    </Routes>
  );
}