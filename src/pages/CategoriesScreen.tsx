import { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Plus, Trash2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import GlassModal from '@/components/GlassModal';
import { categories as initialCategories, formatCurrency, Category } from '@/data/mockData';

const CategoriesScreen = () => {
  const [cats, setCats] = useState<Category[]>(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', icon: '', color: 'hsl(220 65% 48%)', budget: '' });
  const [longPressTimer, setLongPressTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

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

  const openNew = () => {
    setEditCat(null);
    setForm({ name: '', icon: '', color: 'hsl(220 65% 48%)', budget: '' });
    setModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditCat(cat);
    setForm({ name: cat.name, icon: cat.icon, color: cat.color, budget: cat.budget?.toString() || '' });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.icon) return;
    if (editCat) {
      setCats(prev => prev.map(c => c.id === editCat.id ? { ...c, name: form.name, icon: form.icon, color: form.color, budget: form.budget ? Number(form.budget) : undefined } : c));
    } else {
      setCats(prev => [...prev, { id: `c${Date.now()}`, name: form.name, icon: form.icon, color: form.color, budget: form.budget ? Number(form.budget) : undefined }]);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (editCat) {
      setCats(prev => prev.filter(c => c.id !== editCat.id));
      setModalOpen(false);
    }
  };

  const handlePointerDown = (cat: Category) => {
    const timer = setTimeout(() => openEdit(cat), 500);
    setLongPressTimer(timer);
  };

  const handlePointerUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const colorOptions = [
    'hsl(220 65% 48%)', 'hsl(25 90% 55%)', 'hsl(152 55% 38%)',
    'hsl(0 72% 56%)', 'hsl(270 55% 50%)', 'hsl(38 92% 56%)',
    'hsl(340 65% 50%)', 'hsl(195 75% 45%)',
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Categorias" subtitle="Análise de gastos" />

      {/* Pie Chart */}
      <div className="px-5 mb-6">
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border">
          <div className="h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
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
          <motion.div className="bg-card rounded-2xl p-4 shadow-sm border border-border text-center" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-xs text-muted-foreground mb-1">Fixos</p>
            <p className="text-lg font-bold text-foreground">{formatCurrency(2631.00)}</p>
            <p className="text-xs text-primary mt-1">57%</p>
          </motion.div>
          <motion.div className="bg-card rounded-2xl p-4 shadow-sm border border-border text-center" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
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
          {[...chartData].sort((a, b) => b.value - a.value).map((cat, i) => {
            const pct = (cat.value / total) * 100;
            const catInfo = cats.find(c => c.name === cat.name);
            return (
              <motion.div
                key={cat.name}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border cursor-pointer select-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.97 }}
                onPointerDown={() => catInfo && handlePointerDown(catInfo)}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
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

      {/* Add category FAB */}
      <div className="px-5 mt-6 pb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={openNew}
          className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nova Categoria
        </motion.button>
      </div>

      {/* Modal */}
      <GlassModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editCat ? 'Editar Categoria' : 'Nova Categoria'}>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Nome</label>
            <input
              className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Ex: Educação"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Ícone (emoji)</label>
            <input
              className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.icon}
              onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
              placeholder="📚"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Cor</label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map(c => (
                <button
                  key={c}
                  onClick={() => setForm(f => ({ ...f, color: c }))}
                  className="w-8 h-8 rounded-full border-2 transition-all"
                  style={{ backgroundColor: c, borderColor: form.color === c ? 'hsl(var(--foreground))' : 'transparent' }}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Orçamento (opcional)</label>
            <input
              className="w-full bg-secondary/50 rounded-xl px-4 py-3 text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
              value={form.budget}
              onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
              placeholder="R$ 0,00"
              type="number"
            />
          </div>

          <motion.button whileTap={{ scale: 0.97 }} onClick={handleSave} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold">
            {editCat ? 'Salvar Alterações' : 'Criar Categoria'}
          </motion.button>

          {editCat && (
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleDelete} className="w-full py-3 rounded-xl bg-destructive/10 text-destructive font-semibold flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" />
              Excluir Categoria
            </motion.button>
          )}
        </div>
      </GlassModal>
    </div>
  );
};

export default CategoriesScreen;
