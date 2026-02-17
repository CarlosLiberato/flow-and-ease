import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, CreditCard as CreditCardIcon, Wallet, TrendingUp, X } from 'lucide-react';
import FinanceCard from '@/components/FinanceCard';
import GlassModal from '@/components/GlassModal';
import PageHeader from '@/components/PageHeader';
import { mockCards, CardData, formatCurrency } from '@/data/mockData';

const CardsScreen = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [showCardActions, setShowCardActions] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background relative">
      <PageHeader
        title="Carteira"
        subtitle="Seus cartões e contas"
        rightAction={
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        }
      />

      {/* Card Stack */}
      <div className="relative" style={{ height: mockCards.length * 68 + 180 }}>
        {mockCards.map((card, i) => (
          <FinanceCard
            key={card.id}
            card={card}
            index={i}
            total={mockCards.length}
            onClick={() => setSelectedCard(card)}
            onLongPress={() => setShowCardActions(card.id)}
          />
        ))}
      </div>

      {/* Card Actions Modal */}
      <GlassModal
        isOpen={!!showCardActions}
        onClose={() => setShowCardActions(null)}
        title="Opções do cartão"
      >
        <div className="space-y-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full p-4 rounded-2xl bg-secondary text-left flex items-center gap-3"
          >
            <CreditCardIcon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Editar cartão</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full p-4 rounded-2xl bg-destructive/10 text-left flex items-center gap-3"
          >
            <X className="w-5 h-5 text-destructive" />
            <span className="text-sm font-medium text-destructive">Excluir cartão</span>
          </motion.button>
        </div>
      </GlassModal>

      {/* Add Card Modal */}
      <GlassModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Novo cartão"
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome do cartão</label>
            <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30" placeholder="Ex: Nubank" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Últimos 4 dígitos</label>
            <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30" placeholder="0000" maxLength={4} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Limite</label>
              <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30" placeholder="R$ 0,00" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Vencimento</label>
              <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground border-0 outline-none focus:ring-2 focus:ring-primary/30" placeholder="Dia" type="number" />
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full p-4 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold"
          >
            Adicionar cartão
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

export default CardsScreen;
