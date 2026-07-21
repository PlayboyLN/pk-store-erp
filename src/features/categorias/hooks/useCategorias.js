import { useEffect, useState } from "react";
import { buscarCategoriasSelect } from "../services/categoriasService";

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarCategorias() {
    try {
      const lista = await buscarCategoriasSelect();
      setCategorias(lista || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return {
    categorias,
    loading,
    atualizarLista: carregarCategorias,
  };
}