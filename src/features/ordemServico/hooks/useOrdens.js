import { useEffect, useState } from "react";
import { listarOrdens } from "../services/ordensService";

export function useOrdens() {
  const [ordens, setOrdens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    atualizarLista();
  }, []);

  async function atualizarLista() {
    setLoading(true);

    try {
      const dados = await listarOrdens();
      setOrdens(dados);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return {
    ordens,
    loading,
    atualizarLista,
  };
}