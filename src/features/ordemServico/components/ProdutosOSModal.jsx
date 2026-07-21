import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { listarProdutos } from "../../produtos/services/produtosService";
import { adicionarProdutoOS } from "../services/ordemProdutosService";
import { movimentarEstoque } from "../../estoque/services/estoqueService";

export default function ProdutosOSModal({
  open,
  onClose,
  ordem,
}) {
  const [produtos, setProdutos] = useState([]);

  const [form, setForm] = useState({
    produto_id: "",
    quantidade: 1,
  });

  useEffect(() => {
    if (open) carregarProdutos();
  }, [open]);

  async function carregarProdutos() {
    const lista = await listarProdutos();
    setProdutos(lista);
  }

  function alterar(e) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "quantidade"
          ? Number(e.target.value)
          : e.target.value,
    });
  }

  async function salvar(e) {
    e.preventDefault();

    const produto = produtos.find(
      (p) => p.id === form.produto_id
    );

    if (!produto) return;

    try {

      await adicionarProdutoOS({
        ordem_id: ordem.id,
        produto_id: produto.id,
        quantidade: form.quantidade,
        valor_unitario: produto.valor_venda,
      });

      await movimentarEstoque({
        produto_id: produto.id,
        tipo: "Saída",
        quantidade: form.quantidade,
        observacao: `OS #${ordem.numero}`,
      });

      onClose();

    } catch (e) {
      console.error(e);
      alert("Erro ao adicionar peça.");
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Adicionar Peça"
    >
      <form
        onSubmit={salvar}
        className="space-y-4"
      >

        <select
          name="produto_id"
          value={form.produto_id}
          onChange={alterar}
          className="border rounded-lg w-full p-3"
          required
        >
          <option value="">
            Selecione o produto
          </option>

          {produtos.map((produto) => (

            <option
              key={produto.id}
              value={produto.id}
            >
              {produto.codigo} - {produto.nome} ({produto.quantidade})
            </option>

          ))}

        </select>

        <input
          type="number"
          min="1"
          name="quantidade"
          value={form.quantidade}
          onChange={alterar}
          className="border rounded-lg w-full p-3"
        />

        <button
          className="w-full bg-blue-600 text-white rounded-lg p-3"
        >
          Adicionar Peça
        </button>

      </form>
    </Modal>
  );
}