import { supabase } from "../../../services/supabase";

export async function carregarDashboard() {
  const [
    { data: produtos },
    { data: ordens },
  ] = await Promise.all([
    supabase.from("produtos").select("*"),
    supabase.from("ordens_servico").select("*"),
  ]);

  const totalProdutos = produtos?.length || 0;

  const estoqueBaixo =
    produtos?.filter(
      (p) => p.quantidade <= p.estoque_minimo
    ).length || 0;

  const valorEstoque =
    produtos?.reduce(
      (t, p) =>
        t + Number(p.valor_compra || 0) * Number(p.quantidade || 0),
      0
    ) || 0;

  const totalOS = ordens?.length || 0;

  const recebidas =
    ordens?.filter((o) => o.status === "Recebido").length || 0;

  const emReparo =
    ordens?.filter((o) => o.status === "Em reparo").length || 0;

  const prontas =
    ordens?.filter((o) => o.status === "Pronto").length || 0;

  const faturamento =
    ordens?.reduce(
      (t, o) => t + Number(o.valor || 0),
      0
    ) || 0;

  return {
    totalProdutos,
    estoqueBaixo,
    valorEstoque,
    totalOS,
    recebidas,
    emReparo,
    prontas,
    faturamento,
    ultimasOS: (ordens || [])
      .sort(
        (a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
      )
      .slice(0, 5),
  };
}