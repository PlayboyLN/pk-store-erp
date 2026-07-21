export default function Table({ children }) {
  return (
    <table
      style={{
        width: "100%",
        background: "#fff",
        borderCollapse: "collapse",
      }}
    >
      {children}
    </table>
  );
}