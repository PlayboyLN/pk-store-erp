import { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { movimentarEstoque } from "../services/estoqueService";
import { listarProdutos } from "../../produtos/services/produtosService";

export default function MovimentacaoModal({
  open,
  onClose,
  atualizarLista,
}) {
  const [produtos, setProdutos] = useState([]);

  const [form, setForm] = useState({
    produto_id: "",
    tipo: "Entrada",
    quantidade: 1,
    observacao: "",
  });

  useEffect(() => {
    if (open) carregarProdutos();
  }, [open]);

  async function carregarProdutos() {
    try {
      const lista = await listarProdutos();
      setProdutos(lista);
    } catch (erro) {
      console.error(erro);
    }
  }

  function alterarCampo(e) {
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

    try {
      await movimentarEstoque(form);

      atualizarLista();

      setForm({
        produto_id: "",
        tipo: "Entrada",
        quantidade: 1,
        observacao: "",
      });

      onClose();

    } catch (erro) {

      console.error("ERRO COMPLETO:", erro);
      console.log(JSON.stringify(erro, null, 2));

      alert(
        erro.message ||
        erro.error_description ||
        "Erro ao movimentar estoque."
      );

    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Movimentação de Estoque"
    >
      <form
        onSubmit={salvar}
        className="space-y-4"
      >

        <select
          name="produto_id"
          value={form.produto_id}
          onChange={alterarCampo}
          className="border rounded-lg w-full p-3"
          required
        >
          <option value="">
            Selecione um produto
          </option>

          {produtos.map((produto) => (
            <option
              key={produto.id}
              value={produto.id}
            >
              {produto.codigo} - {produto.nome} (Estoque: {produto.quantidade})
            </option>
          ))}
        </select>

        <select
          name="tipo"
          value={form.tipo}
          onChange={alterarCampo}
          className="border rounded-lg w-full p-3"
        >
          <option value="Entrada">Entrada</option>
          <option value="Saída">Saída</option>
        </select>

        <input
          type="number"
          name="quantidade"
          min="1"
          value={form.quantidade}
          onChange={alterarCampo}
          className="border rounded-lg w-full p-3"
          required
        />

        <textarea
          name="observacao"
          value={form.observacao}
          onChange={alterarCampo}
          placeholder="Observação"
          className="border rounded-lg w-full p-3"
          rows={4}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3"
        >
          Salvar Movimentação
        </button>

      </form>
    </Modal>
  );
}