import { supabase } from "../../../services/supabase";

export async function listarProdutosOS(ordemId) {
  const { data, error } = await supabase
    .from("ordem_produtos")
    .select(`
      *,
      produtos(
        nome,
        codigo
      )
    `)
    .eq("ordem_id", ordemId);

  if (error) throw error;

  return data;
}

export async function adicionarProdutoOS(dados) {
  const { error } = await supabase
    .from("ordem_produtos")
    .insert(dados);

  if (error) throw error;
}