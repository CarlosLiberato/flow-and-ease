export interface CardData {
  id: string;
  name: string;
  lastDigits: string;
  balance: number;
  limit: number;
  dueDay: number;
  type: 'credit' | 'debit' | 'account';
  gradient: string;
  brand: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  cardId: string;
  date: string;
  paid: boolean;
  notes?: string;
  recurring: boolean;
  createdAt?: string;
  paidAt?: string;
  paidBy?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget?: number;
}

export const mockCards: CardData[] = [
  {
    id: '1',
    name: 'Nubank',
    lastDigits: '4521',
    balance: 3250.80,
    limit: 8000,
    dueDay: 15,
    type: 'credit',
    gradient: 'card-gradient-purple',
    brand: 'Mastercard',
  },
  {
    id: '2',
    name: 'Itaú',
    lastDigits: '7832',
    balance: 12450.00,
    limit: 0,
    dueDay: 0,
    type: 'account',
    gradient: 'card-gradient-orange',
    brand: 'Visa',
  },
  {
    id: '3',
    name: 'Inter',
    lastDigits: '9014',
    balance: 1890.50,
    limit: 5000,
    dueDay: 22,
    type: 'credit',
    gradient: 'card-gradient-green',
    brand: 'Mastercard',
  },
  {
    id: '4',
    name: 'C6 Bank',
    lastDigits: '3367',
    balance: 780.25,
    limit: 3000,
    dueDay: 10,
    type: 'credit',
    gradient: 'card-gradient-dark',
    brand: 'Visa',
  },
];

export const mockExpensesFixed: Expense[] = [
  { id: 'f1', title: 'Aluguel', amount: 1800, category: 'Moradia', cardId: '2', date: '2025-02-05', paid: false, recurring: true, createdAt: '2025-01-01' },
  { id: 'f2', title: 'Internet', amount: 119.90, category: 'Serviços', cardId: '2', date: '2025-02-10', paid: false, recurring: true, createdAt: '2025-01-01' },
  { id: 'f3', title: 'Energia', amount: 245.30, category: 'Moradia', cardId: '2', date: '2025-02-12', paid: false, recurring: true, createdAt: '2025-01-01' },
  { id: 'f4', title: 'Academia', amount: 89.90, category: 'Saúde', cardId: '1', date: '2025-02-15', paid: false, recurring: true, createdAt: '2025-01-01' },
  { id: 'f5', title: 'Streaming', amount: 55.90, category: 'Lazer', cardId: '1', date: '2025-02-20', paid: false, recurring: true, createdAt: '2025-01-01' },
  { id: 'f6', title: 'Seguro Auto', amount: 320, category: 'Transporte', cardId: '2', date: '2025-02-25', paid: false, recurring: true, createdAt: '2025-01-01' },
];

export const mockExpensesVariable: Expense[] = [
  { id: 'v1', title: 'Supermercado', amount: 432.50, category: 'Alimentação', cardId: '1', date: '2025-02-03', paid: true, recurring: false, createdAt: '2025-02-03', paidAt: '2025-02-03', paidBy: 'Nubank' },
  { id: 'v2', title: 'Restaurante', amount: 87.00, category: 'Alimentação', cardId: '1', date: '2025-02-06', paid: true, recurring: false, notes: 'Jantar aniversário', createdAt: '2025-02-06', paidAt: '2025-02-06', paidBy: 'Nubank' },
  { id: 'v3', title: 'Uber', amount: 34.50, category: 'Transporte', cardId: '3', date: '2025-02-07', paid: true, recurring: false, createdAt: '2025-02-07', paidAt: '2025-02-07', paidBy: 'Inter' },
  { id: 'v4', title: 'Farmácia', amount: 156.80, category: 'Saúde', cardId: '1', date: '2025-02-08', paid: true, recurring: false, createdAt: '2025-02-08', paidAt: '2025-02-08', paidBy: 'Nubank' },
  { id: 'v5', title: 'Roupas', amount: 289.90, category: 'Vestuário', cardId: '3', date: '2025-02-09', paid: true, recurring: false, notes: 'Camisa social + calça', createdAt: '2025-02-09', paidAt: '2025-02-09', paidBy: 'Inter' },
  { id: 'v6', title: 'Combustível', amount: 210.00, category: 'Transporte', cardId: '2', date: '2025-02-11', paid: true, recurring: false, createdAt: '2025-02-11', paidAt: '2025-02-11', paidBy: 'Itaú' },
];

export const mockPaidExpenses: Expense[] = [
  { id: 'p1', title: 'Aluguel - Jan', amount: 1800, category: 'Moradia', cardId: '2', date: '2025-01-05', paid: true, recurring: true, createdAt: '2024-12-01', paidAt: '2025-01-05', paidBy: 'Itaú' },
  { id: 'p2', title: 'Internet - Jan', amount: 119.90, category: 'Serviços', cardId: '2', date: '2025-01-10', paid: true, recurring: true, createdAt: '2024-12-01', paidAt: '2025-01-10', paidBy: 'Itaú' },
  { id: 'p3', title: 'Energia - Jan', amount: 198.45, category: 'Moradia', cardId: '2', date: '2025-01-12', paid: true, recurring: true, notes: 'Valor menor que o esperado', createdAt: '2024-12-01', paidAt: '2025-01-12', paidBy: 'Itaú' },
  { id: 'p4', title: 'Academia - Jan', amount: 89.90, category: 'Saúde', cardId: '1', date: '2025-01-15', paid: true, recurring: true, createdAt: '2024-12-01', paidAt: '2025-01-15', paidBy: 'Nubank' },
  { id: 'p5', title: 'Supermercado', amount: 567.30, category: 'Alimentação', cardId: '1', date: '2025-01-18', paid: true, recurring: false, notes: 'Compra mensal grande', createdAt: '2025-01-18', paidAt: '2025-01-18', paidBy: 'Nubank' },
];

export const categories: Category[] = [
  { id: 'c1', name: 'Moradia', icon: '🏠', color: 'hsl(220 65% 48%)', budget: 2500 },
  { id: 'c2', name: 'Alimentação', icon: '🍽️', color: 'hsl(25 90% 55%)', budget: 1200 },
  { id: 'c3', name: 'Transporte', icon: '🚗', color: 'hsl(152 55% 38%)', budget: 800 },
  { id: 'c4', name: 'Saúde', icon: '💊', color: 'hsl(0 72% 56%)', budget: 500 },
  { id: 'c5', name: 'Lazer', icon: '🎮', color: 'hsl(270 55% 50%)', budget: 400 },
  { id: 'c6', name: 'Serviços', icon: '📱', color: 'hsl(38 92% 56%)', budget: 300 },
  { id: 'c7', name: 'Vestuário', icon: '👕', color: 'hsl(340 65% 50%)', budget: 350 },
];

export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
