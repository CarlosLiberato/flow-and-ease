import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import ExpenseItem from '@/components/ExpenseItem';
import GlassModal from '@/components/GlassModal';
import { mockExpensesFixed, Expense } from '@/data/mockData';

const MonthlyExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpensesFixed);
  const [showAdd, setShowAdd] = useState(false);

  const handlePaid = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader title="Contas Fixas" subtitle="Fevereiro 2025" />

      <div className="px-5">
        <AnimatePresence>
          {expenses.map(expense => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onSwipeLeft={() => handlePaid(expense.id)}
              onSwipeRight={() => {}}
            />
          ))}
        </AnimatePresence>

        {expenses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-4xl mb-3">🎉</p>
            <p className="text-sm font-medium text-foreground">Tudo pago!</p>
            <p className="text-xs text-muted-foreground mt-1">Nenhuma conta pendente</p>
          </motion.div>
        )}
      </div>

      {/* Fixed Add Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowAdd(true)}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full px-6 py-3.5 shadow-lg flex items-center gap-2 z-30"
      >
        <Plus className="w-5 h-5" />
        <span className="text-sm font-semibold">Adicionar Conta</span>
      </motion.button>

      <GlassModal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Nova conta fixa">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição</label>
            <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" placeholder="Ex: Aluguel" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Valor</label>
              <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" placeholder="R$ 0,00" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Vencimento</label>
              <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" placeholder="Dia" type="number" />
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full p-4 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold"
          >
            Adicionar
          </motion.button>
        </div>
      </GlassModal>
    </div>
  );
};

export default MonthlyExpenses;
