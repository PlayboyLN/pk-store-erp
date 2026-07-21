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