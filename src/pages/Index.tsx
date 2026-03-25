import { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { CreditCard, Receipt, BarChart3, PieChart, Settings } from 'lucide-react';
import CardsScreen from '@/pages/CardsScreen';
import BillsScreen from '@/pages/BillsScreen';
import Dashboard from '@/pages/Dashboard';
import CategoriesScreen from '@/pages/CategoriesScreen';
import SettingsScreen from '@/pages/SettingsScreen';

const modules = [
  { id: 0, label: 'Home', icon: BarChart3, component: Dashboard },
  { id: 1, label: 'Contas', icon: Receipt, component: BillsScreen },
  { id: 2, label: 'Carteira', icon: CreditCard, component: CardsScreen },
  { id: 3, label: 'Categorias', icon: PieChart, component: CategoriesScreen },
  { id: 4, label: 'Config', icon: Settings, component: SettingsScreen },
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

      {/* Bottom Tab Bar - Floating */}
      <div className="px-4 pb-4 pt-2 safe-bottom">
        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-lg">
          <div className="flex items-center justify-around px-2 py-2">
            {modules.map((mod) => {
              const isActive = page === mod.id;
              return (
                <motion.button
                  key={mod.id}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setPage([mod.id, mod.id > page ? 1 : -1])}
                  className="flex flex-col items-center gap-0.5 py-1 px-3 relative"
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
    </div>
  );
};

export default Index;
