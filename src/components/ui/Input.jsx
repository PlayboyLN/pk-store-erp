export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        marginBottom: 15,
      }}
    >
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          outline: "none",
        }}
      />
    </div>
  );
}