export default function StatusBadge({ status }) {
  const cores = {
    "Recebido": "bg-gray-100 text-gray-700",
    "Em análise": "bg-yellow-100 text-yellow-700",
    "Aguardando peça": "bg-orange-100 text-orange-700",
    "Aguardando aprovação": "bg-purple-100 text-purple-700",
    "Em reparo": "bg-blue-100 text-blue-700",
    "Pronto": "bg-green-100 text-green-700",
    "Entregue": "bg-emerald-100 text-emerald-700",
    "Cancelado": "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${
        cores[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}