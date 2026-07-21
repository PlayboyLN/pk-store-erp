import { supabase } from "../../../services/supabase";

export async function movimentarEstoque({
  produto,
  tipo,
  quantidade,
  observacao,
}) {
  const novoEstoque =
    tipo === "ENTRADA"
      ? produto.quantidade + quantidade
      : produto.quantidade - quantidade;

  if (novoEstoque < 0) {
    throw new Error("Estoque insuficiente.");
  }

  const { error: erroMov } = await supabase
    .from("movimentacoes_estoque")
    .insert({
      produto_id: produto.id,
      tipo,
      quantidade,
      observacao,
    });

  if (erroMov) throw erroMov;

  const { error: erroProduto } = await supabase
    .from("produtos")
    .update({
      quantidade: novoEstoque,
    })
    .eq("id", produto.id);

  if (erroProduto) throw erroProduto;
}