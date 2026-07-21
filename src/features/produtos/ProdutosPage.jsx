import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import Search from "../../components/ui/Search";
import StatCard from "../../components/ui/StatCard";

import ProdutoModal from "./components/ProdutoModal";

import { useProdutos } from "./hooks/useProdutos";
import { excluirProduto } from "./services/produtosService";

export default function ProdutosPage() {
  const [open, setOpen] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const {
    produtos,
    loading,
    atualizarLista,
    busca,
    setBusca,
    totalProdutos,
    valorEstoque,
    semEstoque,
  } = useProdutos();

  async function handleExcluir(id) {
    try {
      await excluirProduto(id);
      atualizarLista();
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir.");
    }
  }

  function novoProduto() {
    setProdutoEditando(null);
    setOpen(true);
  }

  function editarProduto(produto) {
    setProdutoEditando(produto);
    setOpen(true);
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Produtos</h1>

          <p className="text-gray-500 mt-1">
            Controle de estoque
          </p>
        </div>

        <button
          onClick={novoProduto}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          <Plus size={20} />
          Novo Produto
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 mb-8">
        <StatCard
          titulo="Produtos"
          valor={totalProdutos}
        />

        <StatCard
          titulo="Valor em Estoque"
          valor={`R$ ${valorEstoque.toFixed(2)}`}
          cor="green"
        />

        <StatCard
          titulo="Sem Estoque"
          valor={semEstoque}
          cor="red"
        />
      </div>

      <Search
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Pesquisar por nome, marca ou código..."
      />

      <ProdutoModal
        open={open}
        onClose={() => {
          setOpen(false);
          setProdutoEditando(null);
        }}
        atualizarLista={atualizarLista}
        produto={produtoEditando}
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Código</th>
              <th className="p-4 text-left">Produto</th>
              <th className="p-4 text-left">Marca</th>
              <th className="p-4 text-left">Categoria</th>
              <th className="p-4 text-center">Quantidade</th>
              <th className="p-4 text-right">Compra</th>
              <th className="p-4 text-right">Venda</th>
              <th className="p-4 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center p-10">
                  Carregando...
                </td>
              </tr>
            ) : produtos.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-10">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              produtos.map((produto) => (
                <tr
                  key={produto.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">{produto.codigo}</td>

                  <td className="p-4 font-semibold">
                    {produto.nome}
                  </td>

                  <td className="p-4">
                    {produto.marca}
                  </td>

                  <td className="p-4">
                    {produto.categorias?.nome || "-"}
                  </td>

                  <td
                    className={`p-4 text-center font-bold ${
                      produto.quantidade > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {produto.quantidade}
                  </td>

                  <td className="p-4 text-right">
                    R$ {Number(produto.valor_compra).toFixed(2)}
                  </td>

                  <td className="p-4 text-right">
                    R$ {Number(produto.valor_venda).toFixed(2)}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-5">
                      <button
                        onClick={() => editarProduto(produto)}
                      >
                        <Pencil
                          size={18}
                          className="text-blue-600"
                        />
                      </button>

                      <button
                        onClick={() =>
                          handleExcluir(produto.id)
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