import { useEffect, useState } from "react";
import { supabase } from "../../../services/supabase";

export function useDashboard() {
  const [dados, setDados] = useState({
    produtos: 0,
    categorias: 0,
    estoqueBaixo: 0,
    valorEstoque: 0,
  });

  async function carregar() {
    const { data: produtos } = await supabase
      .from("produtos")
      .select("*");

    const { data: categorias } = await supabase
      .from("categorias")
      .select("id");

    const totalProdutos = produtos?.length ?? 0;
    const totalCategorias = categorias?.length ?? 0;

    const estoqueBaixo =
      produtos?.filter(
        (p) => p.quantidade <= p.estoque_minimo
      ).length ?? 0;

    const valorEstoque =
      produtos?.reduce(
        (total, p) =>
          total + Number(p.valor_compra) * Number(p.quantidade),
        0
      ) ?? 0;

    setDados({
      produtos: totalProdutos,
      categorias: totalCategorias,
      estoqueBaixo,
      valorEstoque,
    });
  }

  useEffect(() => {
    carregar();
  }, []);

  return dados;
}