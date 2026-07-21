import StatusBadge from "../../components/ui/StatusBadge";
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import Search from "../../components/ui/Search";

import OrdemModal from "./components/OrdemModal";
import VisualizarOS from "./components/VisualizarOS";

import { useOrdens } from "./hooks/useOrdens";
import { excluirOrdem } from "./services/ordensService";

export default function OrdemServicoPage() {

  const [open, setOpen] = useState(false);
  const [visualizar, setVisualizar] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  const [busca, setBusca] = useState("");

  const {
    ordens,
    loading,
    atualizarLista,
  } = useOrdens();

  const lista = ordens.filter((o) =>
    `${o.numero} ${o.cliente_nome} ${o.marca} ${o.modelo}`
      .toLowerCase()
      .includes(busca.toLowerCase())
  );

  async function handleExcluir(id) {
    await excluirOrdem(id);
    atualizarLista();
  }

  return (
    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Ordens de Serviço
          </h1>

          <p className="text-gray-500">
            Controle das assistências
          </p>

        </div>

        <button
          onClick={() => {
            setOrdemSelecionada(null);
            setOpen(true);
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl flex gap-2 items-center"
        >
          <Plus size={18} />
          Nova OS
        </button>

      </div>

      <Search
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Pesquisar..."
      />

      <OrdemModal
        open={open}
        onClose={() => setOpen(false)}
        atualizarLista={atualizarLista}
        ordem={ordemSelecionada}
      />

      <VisualizarOS
        open={visualizar}
        onClose={() => setVisualizar(false)}
        ordem={ordemSelecionada}
      />

      <div className="bg-white rounded-xl shadow mt-5 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4">OS</th>
              <th>Cliente</th>
              <th>Equipamento</th>
              <th>Status</th>
              <th>Ações</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan={5} className="text-center p-8">
                  Carregando...
                </td>
              </tr>

            ) : lista.length === 0 ? (

              <tr>
                <td colSpan={5} className="text-center p-8">
                  Nenhuma Ordem encontrada.
                </td>
              </tr>

            ) : (

              lista.map((ordem) => (

                <tr
                  key={ordem.id}
                  className="border-t"
                >

                  <td className="p-4">
                    #{ordem.numero}
                  </td>

                  <td>
                    {ordem.cliente_nome}
                  </td>

                  <td>
                    {ordem.marca} {ordem.modelo}
                  </td>

                  <td className="text-center">
                     <StatusBadge status={ordem.status} />
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => {
                          setOrdemSelecionada(ordem);
                          setVisualizar(true);
                        }}
                      >
                        <Eye
                          size={18}
                          className="text-green-600"
                        />
                      </button>

                      <button
                        onClick={() => {
                          setOrdemSelecionada(ordem);
                          setOpen(true);
                        }}
                      >
                        <Pencil
                          size={18}
                          className="text-blue-600"
                        />
                      </button>

                      <button
                        onClick={() => handleExcluir(ordem.id)}
                      >
                        <Trash2
                          size={18}
                          className="text-red-600"
                        />
                      </button>

                    </div>

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