import {
  LayoutDashboard,
  Package,
  Tags,
  ClipboardList,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      nome: "Dashboard",
      icon: LayoutDashboard,
      rota: "/dashboard",
    },
    {
      nome: "Produtos",
      icon: Package,
      rota: "/produtos",
    },
    {
      nome: "Categorias",
      icon: Tags,
      rota: "/categorias",
    },
    {
      nome: "Ordens de Serviço",
      icon: ClipboardList,
      rota: "/os",
    },
  ];

  return (
    <aside className="w-72 bg-[#0b0b0b] border-r border-[#1f1f1f] text-white flex flex-col shadow-2xl">

      <div className="h-32 flex items-center justify-center border-b border-[#1f1f1f]">

        <img
          src={logo}
          alt="PK Store"
          className="w-40 object-contain"
        />

      </div>

      <nav className="flex-1 py-6 px-3">

        {menus.map((item) => {

          const Icon = item.icon;

          const ativo = location.pathname === item.rota;

          return (

            <Link
              key={item.rota}
              to={item.rota}
              className={`
                flex items-center
                gap-4
                px-5
                py-4
                rounded-xl
                mb-2
                transition-all
                duration-200
                ${
                  ativo
                    ? "bg-white text-black shadow-lg"
                    : "text-gray-300 hover:bg-[#1b1b1b] hover:text-white"
                }
              `}
            >

              <Icon size={20} />

              <span className="font-medium">
                {item.nome}
              </span>

            </Link>

          );

        })}

      </nav>

      <div className="border-t border-[#1f1f1f] p-5 text-center">

        <p className="text-xs text-gray-500">
          PK Store
        </p>

        <p className="text-[11px] text-gray-600 mt-1">
          v1.0
        </p>

      </div>

    </aside>
  );
}