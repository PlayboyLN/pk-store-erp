export default function StatCard({
  titulo,
  valor,
  cor = "blue",
}) {
  const cores = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-gray-500">
            {titulo}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {valor}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-xl ${cores[cor]}`}
        />

      </div>

    </div>
  );
}