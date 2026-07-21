import { supabase } from "../../../services/supabase";

export async function listarMovimentacoes() {
  const { data, error } = await supabase
    .from("movimentacoes_estoque")
    .select(`
      *,
      produtos (
        nome,
        codigo
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function movimentarEstoque({
  produto_id,
  tipo,
  quantidade,
  observacao,
}) {

  const { data: produto } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", produto_id)
    .single();

  const novaQuantidade =
    tipo === "Entrada"
      ? produto.quantidade + quantidade
      : produto.quantidade - quantidade;

  await supabase
    .from("produtos")
    .update({
      quantidade: novaQuantidade,
    })
    .eq("id", produto_id);

  const { error } = await supabase
    .from("movimentacoes_estoque")
    .insert({
      produto_id,
      tipo,
      quantidade,
      observacao,
    });

  if (error) throw error;
}