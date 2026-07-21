import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import CategoriaModal from "./components/CategoriaModal";
import { useCategorias } from "./hooks/useCategorias";
import { excluirCategoria } from "./services/categoriasService";

export default function CategoriasPage() {
  const [open, setOpen] = useState(false);

  const {
    categorias,
    loading,
    atualizarLista,
  } = useCategorias();

  async function handleExcluir(id) {
    if (!confirm("Deseja excluir esta categoria?")) return;

    try {
      await excluirCategoria(id);
      atualizarLista();
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir categoria.");
    }
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Categorias
          </h1>

          <p className="text-gray-500">
            Organização dos produtos
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex gap-2 items-center"
        >
          <Plus size={18} />
          Nova Categoria
        </button>
      </div>

      <CategoriaModal
        open={open}
        onClose={() => setOpen(false)}
        atualizarLista={atualizarLista}
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">
                Categoria
              </th>

              <th className="text-center p-4">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="2"
                  className="text-center p-8"
                >
                  Carregando...
                </td>
              </tr>
            ) : categorias.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  className="text-center p-8"
                >
                  Nenhuma categoria cadastrada.
                </td>
              </tr>
            ) : (
              categorias.map((categoria) => (
                <tr
                  key={categoria.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">
                    {categoria.nome}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() =>
                        handleExcluir(categoria.id)
                      }
                    >
                      <Trash2
                        size={18}
                        className="text-red-600"
                      />
                    </button>
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