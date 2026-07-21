import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { listarMovimentacoes } from "./services/listarMovimentacoes";

export default function MovimentacoesPage() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const dados = await listarMovimentacoes();
      setMovimentacoes(dados);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="text-4xl font-bold mb-8">
        Histórico de Movimentações
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Data</th>
              <th className="text-left">Produto</th>
              <th className="text-center">Tipo</th>
              <th className="text-center">Quantidade</th>
              <th className="text-left">Observação</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-8 text-center">
                  Carregando...
                </td>
              </tr>
            ) : (
              movimentacoes.map((mov) => (
                <tr key={mov.id} className="border-t">
                  <td className="p-4">
                    {new Date(mov.created_at).toLocaleString("pt-BR")}
                  </td>

                  <td>
                    {mov.produtos?.codigo} - {mov.produtos?.nome}
                  </td>

                  <td
                    className={`text-center font-bold ${
                      mov.tipo === "ENTRADA"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {mov.tipo}
                  </td>

                  <td className="text-center">
                    {mov.quantidade}
                  </td>

                  <td>{mov.observacao || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}