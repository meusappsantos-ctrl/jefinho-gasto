import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Fev', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Abr', value: 800 },
  { name: 'Mai', value: 500 },
  { name: 'Jun', value: 900 },
];

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const stats = [
    { 
      label: 'Saldo Total', 
      value: 'R$ 12.450,00', 
      change: '+2.5%', 
      trend: 'up', 
      icon: Wallet,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    { 
      label: 'Entradas', 
      value: 'R$ 5.200,00', 
      change: '+12%', 
      trend: 'up', 
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    { 
      label: 'Saídas', 
      value: 'R$ 2.150,00', 
      change: '-4%', 
      trend: 'down', 
      icon: TrendingDown,
      color: 'text-rose-600',
      bg: 'bg-rose-50'
    },
    { 
      label: 'Economia', 
      value: '58%', 
      change: '+5%', 
      trend: 'up', 
      icon: ArrowUpRight,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Olá, {currentUser?.displayName?.split(' ')[0] || 'Jefinho'}!
          </h1>
          <p className="text-slate-500">Aqui está o resumo das suas finanças hoje.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50">
            <Calendar className="h-4 w-4" />
            Últimos 30 dias
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald-500">
            <Plus className="h-4 w-4" />
            Novo Gasto
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-xl ${stat.bg} p-2.5 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Fluxo de Caixa</h3>
            <select className="rounded-lg border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 focus:ring-emerald-500">
              <option>Mensal</option>
              <option>Semanal</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-bold text-slate-900">Últimas Atividades</h3>
          <div className="space-y-6">
            {[
              { label: 'Supermercado', date: 'Hoje, 14:30', amount: '- R$ 250,00', type: 'expense' },
              { label: 'Salário Mensal', date: 'Ontem, 09:00', amount: '+ R$ 5.000,00', type: 'income' },
              { label: 'Assinatura Netflix', date: '28 Fev, 10:15', amount: '- R$ 55,90', type: 'expense' },
              { label: 'Venda de Item', date: '27 Fev, 16:45', amount: '+ R$ 200,00', type: 'income' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    activity.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {activity.type === 'income' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{activity.label}</p>
                    <p className="text-xs text-slate-500">{activity.date}</p>
                  </div>
                </div>
                <p className={`text-sm font-bold ${
                  activity.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {activity.amount}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50">
            Ver Tudo
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
