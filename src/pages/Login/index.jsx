import { supabase } from "../../services/supabase";

export default function Login() {
  async function testar() {
    const { data, error } = await supabase.auth.getSession();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    alert("Conexão com Supabase OK!");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>PK Store</h1>

      <button onClick={testar}>
        Testar conexão
      </button>
    </div>
  );
}