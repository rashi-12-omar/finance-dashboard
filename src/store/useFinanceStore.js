import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Import persist

export const useFinanceStore = create(
  persist(
    (set) => ({
      role: 'Admin',
      transactions: [
        { id: 1, amount: 5000, category: 'Salary', type: 'income', date: '2026-03-01' },
        { id: 2, amount: 1200, category: 'Rent', type: 'expense', date: '2026-03-10' },
        { id: 3, amount: 150, category: 'Food', type: 'expense', date: '2026-03-15' },
        { id: 4, amount: 500, category: 'Freelance', type: 'income', date: '2026-03-20' },
      ],
      setRole: (newRole) => set({ role: newRole }),
      addTransaction: (newTx) => set((state) => ({ 
        transactions: [{ ...newTx, id: Date.now() }, ...state.transactions] 
      })),
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      })),
    }),
    {
      name: 'finance-storage', // Key name in LocalStorage
    }
  )
);