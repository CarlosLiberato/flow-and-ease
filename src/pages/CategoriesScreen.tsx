import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PageHeader from '@/components/PageHeader';
import { categories, formatCurrency } from '@/data/mockData';

const chartData = [
  { name: 'Moradia', value: 2043.75, color: 'hsl(220, 65%, 48%)' },
  { name: 'Alimentação', value: 1087.80, color: 'hsl(25, 90%, 55%)' },
  { name: 'Transporte', value: 564.50, color: 'hsl(152, 55%, 38%)' },
  { name: 'Saúde', value: 336.60, color: 'hsl(0, 72%, 56%)' },
  { name: 'Lazer', value: 55.90, color: 'hsl(270, 55%, 50%)' },
  { name: 'Serviços', value: 119.90, color: 'hsl(38, 92%, 56%)' },
  { name: 'Vestuário', value: 289.90, color: 'hsl(340, 65%, 50%)' },
];

const total = chartData.reduce((s, d) => s + d.value, 0);

const CategoriesScreen = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Categorias" subtitle="Análise de gastos" />

      {/* Pie Chart */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(total)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed vs Variable */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            className="bg-card rounded-2xl p-4 shadow-sm border border-border text-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-xs text-muted-foreground mb-1">Fixos</p>
            <p className="text-lg font-bold text-foreground">{formatCurrency(2631.00)}</p>
            <p className="text-xs text-primary mt-1">57%</p>
          </motion.div>
          <motion.div
            className="bg-card rounded-2xl p-4 shadow-sm border border-border text-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-xs text-muted-foreground mb-1">Variáveis</p>
            <p className="text-lg font-bold text-foreground">{formatCurrency(1210.70)}</p>
            <p className="text-xs text-warning mt-1">43%</p>
          </motion.div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="px-5">
        <h3 className="text-sm font-semibold text-foreground mb-3">Por categoria</h3>
        <div className="space-y-2">
          {chartData.sort((a, b) => b.value - a.value).map((cat, i) => {
            const pct = (cat.value / total) * 100;
            const catInfo = categories.find(c => c.name === cat.name);
            return (
              <motion.div
                key={cat.name}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">{catInfo?.icon}</span>
                  <span className="text-sm font-medium text-foreground flex-1">{cat.name}</span>
                  <span className="text-sm font-bold text-foreground">{formatCurrency(cat.value)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesScreen;
