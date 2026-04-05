import React from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

const SummaryCards = () => {
  const { transactions } = useFinanceStore();

  // DERIVED DATA: We calculate these based on our mock data array
  // 1. Calculate Total Income (Sum of all 'income' types)
  const totalIncome = transactions
    .filter(item => item.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 2. Calculate Total Expenses (Sum of all 'expense' types)
  const totalExpenses = transactions
    .filter(item => item.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // 3. Calculate Final Balance
  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      {/* Total Balance Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div>
          <p className="text-sm text-gray-500 font-medium dark:text-gray-400">Total Balance</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">${totalBalance.toLocaleString()}</h3>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Wallet size={28} />
        </div>
      </div>

      {/* Income Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div>
          <p className="text-sm text-gray-500 font-medium dark:text-gray-400">Total Income</p>
          <h3 className="text-3xl font-bold text-green-600">+${totalIncome.toLocaleString()}</h3>
        </div>
        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
          <ArrowUpCircle size={28} />
        </div>
      </div>

      {/* Expenses Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div>
          <p className="text-sm text-gray-500 font-medium dark:text-gray-400">Total Expenses</p>
          <h3 className="text-3xl font-bold text-red-600">-${totalExpenses.toLocaleString()}</h3>
        </div>
        <div className="p-3 bg-red-50 text-red-600 rounded-xl">
          <ArrowDownCircle size={28} />
        </div>
      </div>

    </div>
  );
};

export default SummaryCards;