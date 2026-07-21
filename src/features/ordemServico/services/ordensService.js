import { supabase } from "../../../services/supabase";

export async function listarOrdens() {
  const { data, error } = await supabase
    .from("ordens_servico")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function criarOrdem(ordem) {
  const { error } = await supabase
    .from("ordens_servico")
    .insert(ordem);

  if (error) throw error;
}

export async function atualizarOrdem(id, ordem) {
  const { error } = await supabase
    .from("ordens_servico")
    .update(ordem)
    .eq("id", id);

  if (error) throw error;
}

export async function excluirOrdem(id) {
  if (!window.confirm("Excluir esta Ordem de Serviço?")) return;

  const { error } = await supabase
    .from("ordens_servico")
    .delete()
    .eq("id", id);

  if (error) throw error;
}