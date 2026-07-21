import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import logo from "../assets/logo.png";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#f5f5f5]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Navbar />

        {/* Marca d'água */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <img
              src={logo}
              alt="PK Store"
              className="
              absolute
              inset-0
              w-full
              h-full
              object-contain
              opacity-[0.03]
            "
          />
        </div>

        {/* Conteúdo */}
        <main className="relative z-10 flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}