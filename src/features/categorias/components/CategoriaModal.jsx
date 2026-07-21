import { useState } from "react";
import { criarCategoria } from "../services/categoriasService";

export default function CategoriaModal({
  open,
  onClose,
  atualizarLista,
}) {
  const [nome, setNome] = useState("");

  if (!open) return null;

  async function salvar() {
    if (!nome.trim()) return;

    try {
      await criarCategoria(nome);

      atualizarLista();

      setNome("");

      onClose();

    } catch (e) {
      console.error(e);
      alert("Erro ao cadastrar categoria.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[400px]">

        <h2 className="text-2xl font-bold mb-5">
          Nova Categoria
        </h2>

        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome da categoria"
          className="border rounded-lg w-full p-3"
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={salvar}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Salvar
          </button>

        </div>

      </div>

    </div>
  );
}