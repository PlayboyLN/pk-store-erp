import { useEffect, useState } from "react";
import { Plus, Trash2, Wrench } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import Modal from "../../components/ui/Modal";

import ProdutosOSModal from "../../features/ordemServico/components/ProdutosOSModal";

import {
  listarOrdens,
  excluirOrdem,
} from "../../features/ordemServico/services/ordensService";

import OrdemForm from "../../features/ordemServico/components/OrdemForm";

export default function OrdemServico() {
  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [openProdutos, setOpenProdutos] = useState(false);
  const [ordemSelecionada, setOrdemSelecionada] = useState(null);

  useEffect(() => {
    atualizarLista();
  }, []);

  async function atualizarLista() {
    try {
      setLoading(true);

      const dados = await listarOrdens();

      setOrdens(dados || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleExcluir(id) {
    try {
      await excluirOrdem(id);
      atualizarLista();
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir OS.");
    }
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Ordens de Serviço
          </h1>

          <p className="text-gray-500">
            Gerenciamento das OS
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          <Plus size={20} />
          Nova OS
        </button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nova Ordem de Serviço"
      >
        <OrdemForm
          atualizarLista={atualizarLista}
          fecharModal={() => setOpen(false)}
        />
      </Modal>

      <ProdutosOSModal
        open={openProdutos}
        onClose={() => {
          setOpenProdutos(false);
          setOrdemSelecionada(null);
        }}
        ordem={ordemSelecionada}
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                Cliente
              </th>

              <th className="p-4 text-left">
                Contato
              </th>

              <th className="p-4 text-left">
                Marca
              </th>

              <th className="p-4 text-left">
                Modelo
              </th>

              <th className="p-4 text-right">
                Valor
              </th>

              <th className="p-4 text-center">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-8"
                >
                  Carregando...
                </td>
              </tr>
            ) : ordens.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-8"
                >
                  Nenhuma ordem cadastrada.
                </td>
              </tr>
            ) : (
              ordens.map((ordem) => (
                <tr
                  key={ordem.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {ordem.cliente_nome}
                  </td>

                  <td className="p-4">
                    {ordem.cliente_telefone}
                  </td>

                  <td className="p-4">
                    {ordem.marca}
                  </td>

                  <td className="p-4">
                    {ordem.modelo}
                  </td>

                  <td className="p-4 text-right">
                    R$ {Number(ordem.valor || 0).toFixed(2)}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() => {
                          setOrdemSelecionada(ordem);
                          setOpenProdutos(true);
                        }}
                      >
                        <Wrench
                          size={18}
                          className="text-green-600"
                        />
                      </button>

                      <button
                        onClick={() =>
                          handleExcluir(ordem.id)
                        }
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