import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import MovimentacaoModal from "../../features/estoque/components/MovimentacaoModal";
import { listarMovimentacoes } from "../../features/estoque/services/estoqueService";

export default function Estoque() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movimentacoes, setMovimentacoes] = useState([]);

  useEffect(() => {
    atualizarLista();
  }, []);

  async function atualizarLista() {
    setLoading(true);

    try {
      const lista = await listarMovimentacoes();
      setMovimentacoes(lista);
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Estoque
          </h1>

          <p className="text-gray-500">
            Controle de entrada e saída de produtos
          </p>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          <Plus size={20} />
          Nova Movimentação
        </button>

      </div>

      <MovimentacaoModal
        open={open}
        onClose={() => setOpen(false)}
        atualizarLista={atualizarLista}
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">
                Data
              </th>

              <th className="p-4 text-left">
                Produto
              </th>

              <th className="p-4 text-center">
                Tipo
              </th>

              <th className="p-4 text-center">
                Quantidade
              </th>

              <th className="p-4 text-left">
                Observação
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8"
                >
                  Carregando...
                </td>
              </tr>

            ) : movimentacoes.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8"
                >
                  Nenhuma movimentação encontrada.
                </td>
              </tr>

            ) : (

              movimentacoes.map((mov) => (

                <tr
                  key={mov.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="p-4">
                    {new Date(mov.created_at).toLocaleString("pt-BR")}
                  </td>

                  <td className="p-4">
                    {mov.produtos?.codigo} - {mov.produtos?.nome}
                  </td>

                  <td
                    className={`p-4 text-center font-bold ${
                      mov.tipo === "Entrada"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {mov.tipo}
                  </td>

                  <td className="p-4 text-center">
                    {mov.quantidade}
                  </td>

                  <td className="p-4">
                    {mov.observacao}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
}