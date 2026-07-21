export default function EmptyState({
  text = "Nenhum registro encontrado."
}) {
  return (
    <div
      style={{
        padding: 40,
        textAlign: "center",
        color: "#777",
      }}
    >
      {text}
    </div>
  );
}