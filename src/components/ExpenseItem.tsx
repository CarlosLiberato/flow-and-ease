import { motion } from 'framer-motion';
import { Expense, formatCurrency } from '@/data/mockData';
import { MessageSquare } from 'lucide-react';

interface ExpenseItemProps {
  expense: Expense;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  showBadge?: boolean;
}

const ExpenseItem = ({ expense, onSwipeLeft, onSwipeRight, showBadge = false }: ExpenseItemProps) => {
  const categoryIcons: Record<string, string> = {
    'Moradia': '🏠',
    'Alimentação': '🍽️',
    'Transporte': '🚗',
    'Saúde': '💊',
    'Lazer': '🎮',
    'Serviços': '📱',
    'Vestuário': '👕',
  };

  return (
    <motion.div
      className="relative mb-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      drag="x"
      dragConstraints={{ left: -120, right: 120 }}
      dragElastic={0.3}
      onDragEnd={(_, info) => {
        if (info.offset.x < -80) onSwipeLeft?.();
        if (info.offset.x > 80) onSwipeRight?.();
      }}
    >
      {/* Swipe backgrounds */}
      <div className="absolute inset-0 rounded-2xl flex">
        <div className="flex-1 bg-success/20 rounded-l-2xl flex items-center pl-4">
          <span className="text-sm font-medium text-success">✏️ Editar</span>
        </div>
        <div className="flex-1 bg-primary/20 rounded-r-2xl flex items-center justify-end pr-4">
          <span className="text-sm font-medium text-primary">✓ Pago</span>
        </div>
      </div>

      <motion.div className="relative bg-card rounded-2xl p-4 shadow-sm border border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg">
            {categoryIcons[expense.category] || '💰'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground truncate">{expense.title}</p>
              {(showBadge && expense.notes) && (
                <div className="relative">
                  <MessageSquare className="w-3.5 h-3.5 text-primary" />
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{expense.category} • {new Date(expense.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</p>
          </div>
          <p className={`text-sm font-bold ${expense.paid ? 'text-success' : 'text-expense'}`}>
            {formatCurrency(expense.amount)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseItem;
