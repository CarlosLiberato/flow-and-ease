import { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { CreditCard, Receipt, ShoppingBag, CheckCircle2, BarChart3, PieChart } from 'lucide-react';
import CardsScreen from '@/pages/CardsScreen';
import MonthlyExpenses from '@/pages/MonthlyExpenses';
import VariableExpenses from '@/pages/VariableExpenses';
import PaidBills from '@/pages/PaidBills';
import Dashboard from '@/pages/Dashboard';
import CategoriesScreen from '@/pages/CategoriesScreen';

const modules = [
  { id: 0, label: 'Carteira', icon: CreditCard, component: CardsScreen },
  { id: 1, label: 'Fixas', icon: Receipt, component: MonthlyExpenses },
  { id: 2, label: 'Variáveis', icon: ShoppingBag, component: VariableExpenses },
  { id: 3, label: 'Pagas', icon: CheckCircle2, component: PaidBills },
  { id: 4, label: 'Dashboard', icon: BarChart3, component: Dashboard },
  { id: 5, label: 'Categorias', icon: PieChart, component: CategoriesScreen },
];

const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const Index = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const paginate = (newDirection: number) => {
    const next = page + newDirection;
    if (next >= 0 && next < modules.length) {
      setPage([next, newDirection]);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) paginate(1);
    else if (info.offset.x > threshold) paginate(-1);
  };

  const CurrentComponent = modules[page].component;

  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col" ref={containerRef}>
      {/* Content area with swipe */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 overflow-y-auto"
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Tab Bar */}
      <div className="bg-card/80 backdrop-blur-xl border-t border-border safe-bottom">
        <div className="flex items-center justify-around px-2 pt-2 pb-1">
          {modules.map((mod) => {
            const isActive = page === mod.id;
            return (
              <motion.button
                key={mod.id}
                whileTap={{ scale: 0.85 }}
                onClick={() => setPage([mod.id, mod.id > page ? 1 : -1])}
                className="flex flex-col items-center gap-0.5 py-1 px-2 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 w-5 h-0.5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <mod.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {mod.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
