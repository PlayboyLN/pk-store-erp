export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  const colors = {
    primary: "#2563eb",
    success: "#16a34a",
    danger: "#dc2626",
    warning: "#d97706",
    secondary: "#6b7280",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: colors[variant],
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}