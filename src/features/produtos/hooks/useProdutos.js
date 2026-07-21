import { useEffect, useMemo, useState } from "react";
import { listarProdutos } from "../services/produtosService";

export function useProdutos() {

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  async function atualizarLista() {

    setLoading(true);

    try {

      const lista = await listarProdutos();

      setProdutos(lista || []);

    } catch (erro) {

      console.error(erro);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    atualizarLista();

  }, []);

  const produtosFiltrados = useMemo(() => {

    return produtos.filter((produto) => {

      const texto = busca.toLowerCase();

      return (
        produto.nome?.toLowerCase().includes(texto) ||
        produto.codigo?.toLowerCase().includes(texto) ||
        produto.marca?.toLowerCase().includes(texto)
      );

    });

  }, [produtos, busca]);

  const totalProdutos = produtos.length;

  const valorEstoque = produtos.reduce((total, produto) => {

    return total + (produto.quantidade * produto.valor_compra);

  }, 0);

  const estoqueBaixo = produtos.filter((produto) =>

    produto.quantidade <= produto.estoque_minimo &&
    produto.quantidade > 0

  ).length;

  const semEstoque = produtos.filter((produto) =>

    produto.quantidade === 0

  ).length;

  return {

    produtos: produtosFiltrados,

    loading,

    busca,

    setBusca,

    atualizarLista,

    totalProdutos,

    valorEstoque,

    estoqueBaixo,

    semEstoque,

  };

}