import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Expense, formatCurrency, mockCards } from '@/data/mockData';
import { MessageSquare, Pencil, X, Trash2 } from 'lucide-react';
import GlassModal from './GlassModal';

interface ExpenseItemProps {
  expense: Expense;
  onSwipeLeft?: () => void;
  onDelete?: () => void;
  isPaid?: boolean;
  onTap?: () => void;
}

const categoryIcons: Record<string, string> = {
  'Moradia': '🏠',
  'Alimentação': '🍽️',
  'Transporte': '🚗',
  'Saúde': '💊',
  'Lazer': '🎮',
  'Serviços': '📱',
  'Vestuário': '👕',
};

const ExpenseItem = ({ expense, onSwipeLeft, onDelete, isPaid = false }: ExpenseItemProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const [noteText, setNoteText] = useState(expense.notes || '');

  const x = useMotionValue(0);
  const editOpacity = useTransform(x, [0, 80], [0, 1]);
  const paidOpacity = useTransform(x, [-80, 0], [1, 0]);

  const card = mockCards.find(c => c.id === expense.cardId);

  return (
    <>
      <motion.div
        className={`relative mb-3 ${isPaid ? 'pointer-events-auto' : ''}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
      >
        {/* Swipe backgrounds - only for non-paid */}
        {!isPaid && (
          <div className="absolute inset-0 rounded-2xl flex overflow-hidden">
            <div className="flex-1 bg-primary/15 rounded-l-2xl flex items-center gap-3 pl-4">
              <motion.div style={{ opacity: editOpacity }} className="flex items-center gap-3">
                <button
                  onPointerUp={() => setShowEdit(true)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                    <Pencil className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-medium text-primary">Editar</span>
                </button>
                <button
                  onPointerUp={() => setShowNote(true)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-9 h-9 rounded-full bg-accent/40 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">Nota</span>
                </button>
              </motion.div>
            </div>
            <div className="flex-1 bg-success/15 rounded-r-2xl flex items-center justify-end pr-4">
              <motion.span style={{ opacity: paidOpacity }} className="text-sm font-medium text-success">✓ Pago</motion.span>
            </div>
          </div>
        )}

        <motion.div
          className={`relative rounded-2xl p-4 shadow-sm border ${isPaid ? 'bg-success/5 border-success/20' : 'bg-card border-border'}`}
          style={!isPaid ? { x } : undefined}
          drag={!isPaid ? 'x' : false}
          dragConstraints={{ left: -120, right: 120 }}
          dragElastic={0.3}
          onDragEnd={(_, info) => {
            if (!isPaid) {
              if (info.offset.x < -80) onSwipeLeft?.();
            }
          }}
          onClick={() => setShowDetails(true)}
          whileTap={isPaid ? { scale: 0.98 } : undefined}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isPaid ? 'bg-success/10' : 'bg-secondary'}`}>
              {categoryIcons[expense.category] || '💰'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground truncate">{expense.title}</p>
                {expense.notes && (
                  <div className="relative">
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{expense.category} • {new Date(expense.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</p>
            </div>
            <p className={`text-sm font-bold ${isPaid ? 'text-success' : 'text-expense'}`}>
              {formatCurrency(expense.amount)}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Details Modal */}
      <GlassModal isOpen={showDetails} onClose={() => setShowDetails(false)} title="Detalhes da conta">
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl">
              {categoryIcons[expense.category] || '💰'}
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-foreground">{expense.title}</p>
              <p className="text-xs text-muted-foreground">{expense.category}</p>
            </div>
            <p className={`text-lg font-bold ${expense.paid ? 'text-success' : 'text-expense'}`}>
              {formatCurrency(expense.amount)}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className={`font-medium ${expense.paid ? 'text-success' : 'text-warning'}`}>
                {expense.paid ? '✓ Pago' : '⏳ Pendente'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Data de vencimento</span>
              <span className="text-foreground font-medium">
                {new Date(expense.date).toLocaleDateString('pt-BR')}
              </span>
            </div>
            {card && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cartão</span>
                <span className="text-foreground font-medium">{card.name} •••• {card.lastDigits}</span>
              </div>
            )}
            {expense.paidAt && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pago em</span>
                <span className="text-foreground font-medium">
                  {new Date(expense.paidAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}
            {expense.paidBy && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pago por</span>
                <span className="text-foreground font-medium">{expense.paidBy}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Criado em</span>
              <span className="text-foreground font-medium">
                {new Date(expense.createdAt || expense.date).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Recorrente</span>
              <span className="text-foreground font-medium">{expense.recurring ? 'Sim' : 'Não'}</span>
            </div>
          </div>

          {expense.notes && (
            <div className="p-3 rounded-xl bg-secondary/60 mt-2">
              <p className="text-xs text-muted-foreground mb-1 font-medium">📝 Nota</p>
              <p className="text-sm text-foreground">{expense.notes}</p>
            </div>
          )}
        </div>
      </GlassModal>

      {/* Edit Modal */}
      <GlassModal isOpen={showEdit} onClose={() => setShowEdit(false)} title="Editar conta">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Descrição</label>
            <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" defaultValue={expense.title} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Valor</label>
              <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" defaultValue={expense.amount} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Categoria</label>
              <input className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30" defaultValue={expense.category} />
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full p-4 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold"
            onClick={() => setShowEdit(false)}
          >
            Salvar alterações
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full p-4 rounded-2xl bg-destructive/10 text-destructive text-sm font-semibold flex items-center justify-center gap-2"
            onClick={() => { onDelete?.(); setShowEdit(false); }}
          >
            <Trash2 className="w-4 h-4" />
            Excluir conta
          </motion.button>
        </div>
      </GlassModal>

      {/* Note Modal */}
      <GlassModal isOpen={showNote} onClose={() => setShowNote(false)} title="Adicionar nota">
        <div className="space-y-4">
          <textarea
            className="w-full p-3 rounded-xl bg-secondary text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/30 min-h-[120px] resize-none"
            placeholder="Escreva uma nota sobre esta conta..."
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full p-4 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold"
            onClick={() => setShowNote(false)}
          >
            Salvar nota
          </motion.button>
        </div>
      </GlassModal>
    </>
  );
};

export default ExpenseItem;
