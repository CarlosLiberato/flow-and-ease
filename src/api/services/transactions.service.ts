import axios from "axios";
import { api } from "../api";

export enum TypeTransictions {
    FIXO = 'fixed',
    VARIAVEL = 'variable'
}

export enum StatusTransaction {
    PENDENTE = 'pending',
    PAGO = 'paid'
}

export interface Transaction {
    id: string
    name: string
    description: string    
    amount: number
    type: TypeTransictions
    status: StatusTransaction
    paid_at: Date
    card_id: string
}

export interface nova {
  id: string;
  title: string;
  amount: number;
  category: string;
  cardId: string;
  date: string;
  paid: boolean;
  notes?: string;
  recurring: boolean;
}

export const TransactionService = {
    async getFixed() {
        const response = await api.get<Transaction[]>("/transactions/fixed");
        return response.data;
    },

    async getVariable() {
        const response = await api.get<Transaction[]>("/transactions/variable")
        return response.data
    }
}