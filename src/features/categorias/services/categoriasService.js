import { supabase } from "../../../services/supabase";

export async function listarCategorias() {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .order("nome");

  if (error) throw error;

  return data;
}

export async function buscarCategoriasSelect() {
  const { data, error } = await supabase
    .from("categorias")
    .select("id,nome")
    .order("nome");

  if (error) throw error;

  return data;
}

export async function criarCategoria(nome) {
  const { error } = await supabase
    .from("categorias")
    .insert([{ nome }]);

  if (error) throw error;
}

export async function excluirCategoria(id) {
  const { error } = await supabase
    .from("categorias")
    .delete()
    .eq("id", id);

  if (error) throw error;
}