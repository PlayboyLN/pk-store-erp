export default function Search({
  value,
  onChange,
  placeholder = "Pesquisar..."
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded-lg px-4 py-3 mb-6 outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}