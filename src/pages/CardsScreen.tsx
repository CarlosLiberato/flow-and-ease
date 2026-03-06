import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Plus, CreditCard as CreditCardIcon, Wallet, TrendingUp, X } from 'lucide-react';
import FinanceCard from '@/components/FinanceCard';
import GlassModal from '@/components/GlassModal';
import PageHeader from '@/components/PageHeader';
import { mockCards, CardData, formatCurrency } from '@/data/mockData';

const CardsScreen = () => {
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openAddModal = () => {
    setEditingCard(null);
    setShowCardModal(true);
  };

  const openEditModal = (card: CardData) => {
    setEditingCard(card);
    setShowCardModal(true);
  };

  const closeCardModal = () => {
    setShowCardModal(false);
    setEditingCard(null);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <PageHeader
        title="Carteira"
        subtitle="Seus cartões e contas"
        rightAction={
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={openAddModal}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center"
          >
            <Plus className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        }
      />

      {/* Vertical Carousel */}
      <div
        ref={scrollRef}
        className="px-4 pb-8 space-y-4 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 140px)' }}
      >
        {mockCards.map((card, i) => (
          <CardCarouselItem
            key={card.id}
            card={card}
            index={i}
            onClick={() => setSelectedCard(card)}
            onLongPress={() => openEditModal(card)}
          />
        ))}
      </div>

      {/* Add / Edit Card Modal */}
      <GlassModal
        isOpen={showCardModal}
        onClose={closeCardModal}
        title={editingCard ? 'Editar cartão' : 'Novo cartão'}
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome do cartão</label>
            <input
              className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Ex: Nubank"
              defaultValue={editingCard?.name ?? ''}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Últimos 4 dígitos</label>
            <input
              className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="0000"
              maxLength={4}
              defaultValue={editingCard?.lastDigits ?? ''}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Limite</label>
              <input
                className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="R$ 0,00"
                defaultValue={editingCard?.limit ? String(editingCard.limit) : ''}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Vencimento</label>
              <input
                className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Dia"
                type="number"
                defaultValue={editingCard?.dueDay ? String(editingCard.dueDay) : ''}
              />
            </div>
          </div>
          {editingCard && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full p-4 rounded-2xl bg-destructive/10 text-destructive text-sm font-semibold"
            >
              Excluir cartão
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full p-4 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold"
          >
            {editingCard ? 'Salvar alterações' : 'Adicionar cartão'}
          </motion.button>
        </div>
      </GlassModal>

      {/* Card Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <>
            <motion.div
              className="fixed inset-0 glass-overlay z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 bg-card rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="w-10 h-1 rounded-full bg-border mx-auto mb-6" />

              <div className={`rounded-2xl p-5 mb-6 ${selectedCard.gradient}`}>
                <p className="text-primary-foreground/70 text-xs mb-1">{selectedCard.name}</p>
                <p className="text-primary-foreground text-2xl font-bold">{formatCurrency(selectedCard.balance)}</p>
                <p className="text-primary-foreground/60 text-xs mt-1">•••• {selectedCard.lastDigits}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-secondary rounded-2xl p-3 text-center">
                  <Wallet className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Saldo</p>
                  <p className="text-sm font-bold text-foreground">{formatCurrency(selectedCard.balance)}</p>
                </div>
                <div className="bg-secondary rounded-2xl p-3 text-center">
                  <TrendingUp className="w-5 h-5 text-success mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Limite</p>
                  <p className="text-sm font-bold text-foreground">{selectedCard.limit > 0 ? formatCurrency(selectedCard.limit) : '—'}</p>
                </div>
                <div className="bg-secondary rounded-2xl p-3 text-center">
                  <CreditCardIcon className="w-5 h-5 text-warning mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Venc.</p>
                  <p className="text-sm font-bold text-foreground">{selectedCard.dueDay > 0 ? `Dia ${selectedCard.dueDay}` : '—'}</p>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-foreground mb-3">Últimas compras</h4>
              <div className="space-y-2">
                {['Supermercado', 'Restaurante', 'Farmácia'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded-xl">
                    <span className="text-sm text-foreground">{item}</span>
                    <span className="text-sm font-medium text-expense">{formatCurrency(Math.random() * 300 + 50)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Individual carousel card with drag effects */
const CardCarouselItem = ({
  card,
  index,
  onClick,
  onLongPress,
}: {
  card: CardData;
  index: number;
  onClick: () => void;
  onLongPress: () => void;
}) => {
  const y = useMotionValue(0);
  const scale = useTransform(y, [-80, 0, 80], [0.96, 1, 0.96]);
  const rotateX = useTransform(y, [-80, 0, 80], [4, 0, -4]);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const handlePointerDown = () => {
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      onLongPress();
    }, 500);
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    if (!didLongPress.current) onClick();
  };

  const handlePointerCancel = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  return (
    <motion.div
      className={`h-48 rounded-3xl p-6 shadow-xl cursor-pointer ${card.gradient}`}
      style={{ scale, rotateX, perspective: 800, y }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.3}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <div className="flex flex-col h-full justify-between text-primary-foreground select-none">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium opacity-90">{card.name}</span>
          <div className="flex items-center gap-1.5">
            <CreditCardIcon className="w-4 h-4 opacity-70" />
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

export default CardsScreen;
