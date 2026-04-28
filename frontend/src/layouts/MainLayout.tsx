import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Library, TerminalSquare, Trophy, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore'; // Importante

export const MainLayout = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore(); // Obtenemos el usuario y la función de logout

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/boveda', name: 'Mi Bóveda', icon: <FolderKanban size={20} /> },
    { path: '/biblioteca', name: 'Biblioteca', icon: <Library size={20} /> },
    { path: '/sandbox', name: 'Sandbox', icon: <TerminalSquare size={20} /> },
    { path: '/retos', name: 'Retos', icon: <Trophy size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-onyx-dark text-onyx-light font-sans overflow-hidden">
      
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-onyx-card border-r border-onyx-mint/10 flex flex-col">
        <div className="p-6 mb-4">
          <h1 className="text-2xl font-bold tracking-wider">
            Onyx <span className="text-onyx-mint">Study</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-onyx-mint/10 text-onyx-mint font-semibold border border-onyx-mint/20' 
                    : 'text-onyx-light/70 hover:bg-white/5 hover:text-onyx-light'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Perfil de Usuario y Logout */}
        <div className="p-4 border-t border-onyx-mint/10 space-y-2">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-onyx-mint/20 flex items-center justify-center text-onyx-mint font-bold uppercase">
              {user?.nombre?.charAt(0) || 'U'}
            </div>
            <div className="text-sm overflow-hidden">
              <p className="font-semibold text-onyx-light truncate">{user?.nombre || 'Usuario'}</p>
              <p className="text-xs text-onyx-light/50">Nivel {user?.nivel || 1}</p>
            </div>
          </div>
          
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Área de Contenido Principal */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <Outlet />
      </main>

    </div>
  );
};