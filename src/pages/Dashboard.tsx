import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, PiggyBank, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { formatCurrency } from '@/data/mockData';

const stats = [
  { label: 'Saldo total', value: 18371.55, icon: TrendingUp, color: 'text-success', bg: 'bg-success/10' },
  { label: 'Gastos do mês', value: 4631.10, icon: TrendingDown, color: 'text-expense', bg: 'bg-destructive/10' },
  { label: 'Investido', value: 15000, icon: PiggyBank, color: 'text-primary', bg: 'bg-primary/10' },
];

const goals = [
  { title: 'Reserva de emergência', current: 15000, target: 30000 },
  { title: 'Viagem', current: 3200, target: 8000 },
  { title: 'Novo notebook', current: 1800, target: 5000 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Visão Geral" subtitle="Fevereiro 2025" />

      {/* Stats */}
      <div className="px-5 space-y-3 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(stat.value)}</p>
            </div>
            {stat.label === 'Gastos do mês' ? (
              <ArrowDownRight className="w-5 h-5 text-expense" />
            ) : (
              <ArrowUpRight className="w-5 h-5 text-success" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Monthly summary bar */}
      <div className="px-5 mb-8">
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Resumo mensal</p>
            <p className="text-xs text-muted-foreground">75% do mês</p>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden mb-2">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: '62%' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatCurrency(4631.10)} gasto</span>
            <span>{formatCurrency(7500)} orçamento</span>
          </div>
        </div>
      </div>

      {/* Financial Goals */}
      <div className="px-5">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Metas financeiras</h3>
        </div>
        <div className="space-y-3">
          {goals.map((goal, i) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <motion.div
                key={goal.title}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-foreground">{goal.title}</p>
                  <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden mb-1.5">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatCurrency(goal.current)}</span>
                  <span>{formatCurrency(goal.target)}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
