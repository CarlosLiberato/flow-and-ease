import { motion } from 'framer-motion';
import { CreditCard, Building2, Wifi } from 'lucide-react';
import { CardData, formatCurrency } from '@/data/mockData';

interface FinanceCardProps {
  card: CardData;
  index: number;
  total: number;
  onClick?: () => void;
  onLongPress?: () => void;
}

const FinanceCard = ({ card, index, total, onClick, onLongPress }: FinanceCardProps) => {
  const offset = index * 68;

  return (
    <motion.div
      className={`absolute left-0 right-0 mx-4 h-48 rounded-3xl p-6 shadow-xl cursor-pointer ${card.gradient}`}
      style={{
        top: offset,
        zIndex: total - index,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress?.();
      }}
    >
      <div className="flex flex-col h-full justify-between text-primary-foreground">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium opacity-90">{card.name}</span>
          <div className="flex items-center gap-1.5">
            {card.type === 'account' ? (
              <Building2 className="w-4 h-4 opacity-70" />
            ) : (
              <CreditCard className="w-4 h-4 opacity-70" />
            )}
            <Wifi className="w-4 h-4 opacity-70 rotate-90" />
          </div>
        </div>

        <div>
          <p className="text-xs opacity-60 mb-0.5">
            {card.type === 'account' ? 'Saldo' : 'Fatura atual'}
          </p>
          <p className="text-2xl font-bold tracking-tight">
            {formatCurrency(card.balance)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium tracking-widest opacity-80">
            •••• {card.lastDigits}
          </span>
          <span className="text-xs font-medium opacity-60">{card.brand}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceCard;
