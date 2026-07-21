import { supabase } from "../../../services/supabase";

export async function listarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("nome");

  if (error) throw error;
  return data;
}

export async function criarProduto(produto) {
  const { error } = await supabase
    .from("produtos")
    .insert(produto);

  if (error) throw error;
}

export async function atualizarProduto(id, produto) {
  const { error } = await supabase
    .from("produtos")
    .update(produto)
    .eq("id", id);

  if (error) throw error;
}

export async function excluirProduto(id) {
  const confirmar = window.confirm(
    "Deseja realmente excluir este produto?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("produtos")
    .delete()
    .eq("id", id);

  if (error) throw error;
}