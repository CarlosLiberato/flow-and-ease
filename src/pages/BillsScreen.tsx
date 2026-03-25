import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Bell, SlidersHorizontal } from 'lucide-react';
import ExpenseItem from '@/components/ExpenseItem';
import GlassModal from '@/components/GlassModal';
import { mockExpensesFixed, mockExpensesVariable, mockPaidExpenses, Expense, formatCurrency } from '@/data/mockData';

const tabs = ['Fixas', 'Pendentes', 'Pagas'] as const;
type Tab = typeof tabs[number];

const BillsScreen = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Fixas');
  const [fixedExpenses, setFixedExpenses] = useState<Expense[]>(mockExpensesFixed);
  const [showAdd, setShowAdd] = useState(false);
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  const currentExpenses = useMemo(() => {
    switch (activeTab) {
      case 'Fixas': return fixedExpenses;
      case 'Pendentes': return mockExpensesVariable;
      case 'Pagas': return mockPaidExpenses;
    }
  }, [activeTab, fixedExpenses]);

  const totalAmount = useMemo(() => {
    return currentExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [currentExpenses]);

  const overdueCount = useMemo(() => {
    if (activeTab === 'Pagas') return 0;
    const now = new Date();
    return currentExpenses.filter(e => !e.paid && new Date(e.date) < now).length;
  }, [currentExpenses, activeTab]);

  const handlePaid = (id: string) => {
    setFixedExpenses(prev => prev.filter(e => e.id !== id));
  };

  const totalLabel = activeTab === 'Pagas' ? 'TOTAL PAGO' : 'TOTAL PENDENTE';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Minhas Contas</h1>
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
            </motion.button>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">U</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="flex bg-secondary rounded-2xl p-1">
          {tabs.map(tab => (
            <motion.button
              key={tab}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="px-5 mb-5">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-3xl font-bold text-foreground">{formatCurrency(totalAmount)}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">{totalLabel}</p>
            {overdueCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold">
                {overdueCount} VENCIDA{overdueCount > 1 ? 'S' : ''}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* List */}
      <div className="px-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {currentExpenses.map(expense => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                isPaid={activeTab === 'Pagas'}
                onSwipeLeft={activeTab === 'Fixas' ? () => handlePaid(expense.id) : undefined}
              />
            ))}

            {currentExpenses.length === 0 && (
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Add Button */}
      {activeTab !== 'Pagas' && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAdd(true)}
          className="fixed bottom-24 right-5 bg-primary text-primary-foreground rounded-full px-5 py-3.5 shadow-lg flex items-center gap-2 z-30"
        >
          <Plus className="w-5 h-5" />
          <span className="text-sm font-semibold">Nova Conta</span>
        </motion.button>
      )}

      {/* Add Modal */}
      <GlassModal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Nova conta">
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
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Categoria</label>
            <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" placeholder="Ex: Moradia" />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full p-4 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold"
            onClick={() => setShowAdd(false)}
          >
            Adicionar
          </motion.button>
        </div>
      </GlassModal>
    </div>
  );
};

export default BillsScreen;
