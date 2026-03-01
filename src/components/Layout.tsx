import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { 
  LayoutDashboard, 
  Receipt, 
  Target, 
  PieChart, 
  Settings, 
  LogOut,
  ChevronRight,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/expenses', icon: Receipt, label: 'Gastos' },
    { path: '/goals', icon: Target, label: 'Metas' },
    { path: '/reports', icon: PieChart, label: 'Relatórios' },
    { path: '/settings', icon: Settings, label: 'Ajustes' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 hidden h-full w-72 border-r border-slate-200 bg-white md:block">
        <div className="flex h-full flex-col p-6">
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-200">
              <span className="text-xl font-bold text-white">J</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Jefinho Pay</span>
          </div>

          <nav className="flex-1 space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <item.icon className={`h-5 w-5 transition-colors ${
                    isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`} />
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute right-2 h-1.5 w-1.5 rounded-full bg-emerald-600"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-bold">{currentUser?.displayName || 'Usuário'}</p>
                  <p className="truncate text-xs text-slate-400">{currentUser?.email}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-600 transition-all hover:bg-rose-50"
            >
              <LogOut className="h-5 w-5" />
              Sair da conta
            </button>
          </div>
        </div>
      </aside>

      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full border-t border-slate-200 bg-white/80 px-2 py-3 backdrop-blur-lg md:hidden">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-1 flex-col items-center gap-1 transition-all ${
                isActive ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              <item.icon className={`h-6 w-6 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNavMobile"
                  className="absolute -top-3 h-1 w-8 rounded-full bg-emerald-600"
                />
              )}
            </Link>
          );
        })}
      </nav>

      <main className="min-h-screen pb-24 md:pb-0 md:pl-72">
        <div className="mx-auto max-w-7xl p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
