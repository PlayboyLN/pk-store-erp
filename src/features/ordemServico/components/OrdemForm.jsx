import { useEffect, useState } from "react";
import {
  criarOrdem,
  atualizarOrdem,
} from "../services/ordensService";

export default function OrdemForm({
  ordem,
  atualizarLista,
  fecharModal,
}) {
  const hoje = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    cliente_nome: "",
    cliente_telefone: "",
    data: hoje,
    liga: "Liga",
    testado: "Não",
    serial: "",
    marca: "",
    modelo: "",
    valor: "",
    status: "Recebido",
    defeito: "",
    observacoes: "",
  });

  useEffect(() => {
    if (ordem) {
      setForm({
        cliente_nome: ordem.cliente_nome || "",
        cliente_telefone: ordem.cliente_telefone || "",
        data: ordem.data || hoje,
        liga: ordem.liga || "Liga",
        testado: ordem.testado || "Não",
        serial: ordem.serial || "",
        marca: ordem.marca || "",
        modelo: ordem.modelo || "",
        valor: ordem.valor || "",
        status: ordem.status || "Recebido",
        defeito: ordem.defeito || "",
        observacoes: ordem.observacoes || "",
      });
    } else {
      setForm({
        cliente_nome: "",
        cliente_telefone: "",
        data: hoje,
        liga: "Liga",
        testado: "Não",
        serial: "",
        marca: "",
        modelo: "",
        valor: "",
        status: "Recebido",
        defeito: "",
        observacoes: "",
      });
    }
  }, [ordem]);

  function alterarCampo(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function salvar(e) {
    e.preventDefault();

    const dados = {
      ...form,
      valor: Number(form.valor || 0),
    };

    try {
      if (ordem) {
        await atualizarOrdem(ordem.id, dados);
      } else {
        await criarOrdem(dados);
      }

      atualizarLista();
      fecharModal();
    } catch (erro) {
      console.error(erro);
      alert("Erro ao salvar Ordem de Serviço.");
    }
  }

  return (
    <form onSubmit={salvar} className="space-y-4">

      <input
        name="cliente_nome"
        placeholder="Nome"
        value={form.cliente_nome}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
        required
      />

      <input
        name="cliente_telefone"
        placeholder="Contato"
        value={form.cliente_telefone}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
      />

      <input
        type="date"
        name="data"
        value={form.data}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
      />

      <div className="grid grid-cols-2 gap-4">

        <select
          name="liga"
          value={form.liga}
          onChange={alterarCampo}
          className="border rounded-lg p-3"
        >
          <option>Liga</option>
          <option>Não Liga</option>
        </select>

        <select
          name="testado"
          value={form.testado}
          onChange={alterarCampo}
          className="border rounded-lg p-3"
        >
          <option>Não</option>
          <option>Sim</option>
        </select>

      </div>

      <input
        name="serial"
        placeholder="Número de Série"
        value={form.serial}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
      />

      <div className="grid grid-cols-2 gap-4">

        <input
          name="marca"
          placeholder="Marca"
          value={form.marca}
          onChange={alterarCampo}
          className="border rounded-lg p-3"
        />

        <input
          name="modelo"
          placeholder="Modelo"
          value={form.modelo}
          onChange={alterarCampo}
          className="border rounded-lg p-3"
        />

      </div>

      <input
        type="number"
        step="0.01"
        name="valor"
        placeholder="Valor do Serviço"
        value={form.valor}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
      />

      <select
        name="status"
        value={form.status}
        onChange={alterarCampo}
        className="border rounded-lg w-full p-3"
      >
        <option>Recebido</option>
        <option>Em análise</option>
        <option>Aguardando peça</option>
        <option>Aguardando aprovação</option>
        <option>Em reparo</option>
        <option>Pronto</option>
        <option>Entregue</option>
        <option>Cancelado</option>
      </select>

      <textarea
        name="defeito"
        placeholder="Defeito Reclamado"
        value={form.defeito}
        onChange={alterarCampo}
        rows={4}
        className="border rounded-lg w-full p-3"
      />

      <textarea
        name="observacoes"
        placeholder="Observações"
        value={form.observacoes}
        onChange={alterarCampo}
        rows={4}
        className="border rounded-lg w-full p-3"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
      >
        {ordem ? "Salvar Alterações" : "Cadastrar Ordem de Serviço"}
      </button>

    </form>
  );
}