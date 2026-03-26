import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHeader from '@/components/PageHeader';
import ExpenseItem from '@/components/ExpenseItem';
import GlassModal from '@/components/GlassModal';
import { mockExpensesVariable } from '@/data/mockData';
import { Transaction, TransactionService } from '@/api/services/transactions.service';

const filterOptions = ['Todas', 'Data', 'Categoria', 'Cartão', 'Valor'];



const TransactionList = () => {
  const [transactios, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true)
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Todas');

useEffect(() => {
  async function getAllTransactions() {
    try{
    const data = await TransactionService.getFixed();
    setTransactions(data)
    } catch (error) {
      console.error('Ocorreu um erro ao carregar transações', error)
    } finally {
      setLoading(false)
    }}

    getAllTransactions()
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader
        title="Gastos Variáveis"
        subtitle="Fevereiro 2025"
        rightAction={
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFilter(true)}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        }
      />

      <div className="px-5">
        <ul>{transactios.map((transaction) => (
          <li key={transaction.id}>
            {transaction.name} {transaction.description}
          </li>
        ))}</ul>
        <AnimatePresence>
          {mockExpensesVariable.map(expense => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))}
        </AnimatePresence>
      </div>

      <GlassModal isOpen={showFilter} onClose={() => setShowFilter(false)} title="Filtrar por">
        <div className="space-y-2">
          {filterOptions.map(opt => (
            <motion.button
              key={opt}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveFilter(opt); setShowFilter(false); }}
              className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-colors ${activeFilter === opt ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'}`}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </GlassModal>
    </div>
  );
};


export default TransactionList;
