import { useEffect, useState } from "react";
import { listarProdutosOS } from "../services/ordemProdutosService";

export default function ListaProdutosOS({ ordemId }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregar();
  }, [ordemId]);

  async function carregar() {
    try {
      const lista = await listarProdutosOS(ordemId);
      setProdutos(lista);
    } catch (e) {
      console.error(e);
    }
  }

  if (produtos.length === 0) {
    return (
      <p className="text-gray-500 mt-2">
        Nenhuma peça utilizada.
      </p>
    );
  }

  return (
    <table className="w-full mt-3 border rounded-lg">
      <thead className="bg-slate-100">
        <tr>
          <th className="p-2 text-left">Peça</th>
          <th className="p-2 text-center">Qtd</th>
          <th className="p-2 text-right">Valor Unit.</th>
          <th className="p-2 text-right">Total</th>
        </tr>
      </thead>

      <tbody>
        {produtos.map((item) => (
          <tr key={item.id} className="border-t">
            <td className="p-2">
              {item.produtos.codigo} - {item.produtos.nome}
            </td>

            <td className="p-2 text-center">
              {item.quantidade}
            </td>

            <td className="p-2 text-right">
              R$ {Number(item.valor_unitario).toFixed(2)}
            </td>

            <td className="p-2 text-right font-semibold">
              R$ {(item.quantidade * item.valor_unitario).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}