import { useEffect, useState } from "react";
import {
  criarProduto,
  atualizarProduto,
} from "../services/produtosService";
import { buscarCategoriasSelect } from "../../categorias/services/categoriasService";

export default function ProdutoForm({
  produto,
  atualizarLista,
  fecharModal,
}) {
  const [categorias, setCategorias] = useState([]);

  const [form, setForm] = useState({
    codigo: "",
    nome: "",
    marca: "",
    categoria_id: "",
    quantidade: 0,
    valor_compra: "",
    valor_venda: "",
  });

  useEffect(() => {
    carregarCategorias();
  }, []);

  useEffect(() => {
    if (produto) {
      setForm({
        codigo: produto.codigo || "",
        nome: produto.nome || "",
        marca: produto.marca || "",
        categoria_id: produto.categoria_id || "",
        quantidade: produto.quantidade || 0,
        valor_compra: produto.valor_compra || "",
        valor_venda: produto.valor_venda || "",
      });
    }
  }, [produto]);

  async function carregarCategorias() {
    try {
      const lista = await buscarCategoriasSelect();
      setCategorias(lista);
    } catch (e) {
      console.error(e);
    }
  }

  function alterarCampo(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function salvar(e) {
    e.preventDefault();

    try {
      const dados = {
        ...form,
        quantidade: Number(form.quantidade),
        valor_compra: Number(form.valor_compra),
        valor_venda: Number(form.valor_venda),
      };

      if (produto) {
        await atualizarProduto(produto.id, dados);
      } else {
        await criarProduto(dados);
      }

      atualizarLista();
      fecharModal();

    } catch (erro) {
      console.error(erro);
      alert("Erro ao salvar produto.");
    }
  }

  return (
    <form onSubmit={salvar} className="space-y-4">

      <input
        name="codigo"
        placeholder="Código"
        value={form.codigo}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
      />

      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
        required
      />

      <input
        name="marca"
        placeholder="Marca"
        value={form.marca}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
      />

      <select
        name="categoria_id"
        value={form.categoria_id}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
        required
      >
        <option value="">
          Selecione uma categoria
        </option>

        {categorias.map((categoria) => (
          <option
            key={categoria.id}
            value={categoria.id}
          >
            {categoria.nome}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="quantidade"
        placeholder="Quantidade"
        value={form.quantidade}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
      />

      <div className="grid grid-cols-2 gap-4">

        <input
          type="number"
          step="0.01"
          name="valor_compra"
          placeholder="Valor Compra"
          value={form.valor_compra}
          onChange={alterarCampo}
          className="border rounded-lg p-3"
        />

        <input
          type="number"
          step="0.01"
          name="valor_venda"
          placeholder="Valor Venda"
          value={form.valor_venda}
          onChange={alterarCampo}
          className="border rounded-lg p-3"
        />

      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded-lg"
      >
        {produto ? "Salvar Alterações" : "Salvar Produto"}
      </button>

    </form>
  );
}