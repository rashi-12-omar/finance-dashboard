import React from 'react';
import { useFinanceStore } from './store/useFinanceStore';
import { 
  LayoutDashboard, 
  ReceiptText, 
  TrendingUp, 
  Wallet, 
  ShieldCheck, 
  CircleUser 
} from 'lucide-react';

// Import our custom components
import SummaryCards from './components/SummaryCards';
import TransactionTable from './components/TransactionTable';
import DashboardCharts from './components/DashboardCharts';

import { motion } from 'framer-motion';

// Wrap your cards or table like this:
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <SummaryCards />
</motion.div>

function App() {

   // 1. Add state for theme at the top of App function
  const [darkMode, setDarkMode] = React.useState(false);

// 2. Add this useEffect to update the HTML class
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Get state from Zustand store
  const { role, setRole, transactions } = useFinanceStore();

  // Logic for Step 4: Insights (Finding the highest expense)
  const expensesOnly = transactions.filter(t => t.type === 'expense');
  const highestExpense = expensesOnly.length > 0 
    ? [...expensesOnly].sort((a, b) => b.amount - a.amount)[0] 
    : null;

  return (
    
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 text-gray-800 dark:text-white flex flex-col transition-colors duration-300">
        <div className="p-8 text-2xl font-black text-blue-600 flex items-center gap-2 tracking-tight">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Wallet size={24} className="text-white" />
          </div>
          FinTrack
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold cursor-pointer">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div
          onClick={() => document.getElementById('transactions-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-3 p-3 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl cursor-pointer transition-all">
            <ReceiptText size={20} /> Transactions
          </div>
        </nav>

        {/* Status Indicator */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
            {role === 'Admin' ? (
              <ShieldCheck size={20} className="text-red-500" />
            ) : (
              <CircleUser size={20} className="text-green-500" />
            )}
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">Mode</p>
              <p className="text-sm font-bold text-gray-700">{role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-8 dark:text-gray-100">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Financial Overview</h1>
            <p className="text-xs text-gray-400 font-medium">Welcome back, {role}!</p>
          </div>
          
          {/* ROLE SWITCHER (Requirement 3) */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 transition-colors"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button 
              onClick={() => setRole('Viewer')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                role === 'Viewer' 
                ? 'bg-white shadow-md text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            > Viewer </button>
            <button 
              onClick={() => setRole('Admin')}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                role === 'Admin' 
                ? 'bg-white shadow-md text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
              }`}
            > Admin </button>
          </div>
        </header>

        {/* SCROLLABLE DASHBOARD AREA */}
        <section className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Requirement 1: Summary Cards */}
          <SummaryCards />

          {/* Requirement 4: Insights Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-xl shadow-blue-200 border border-blue-500">
              <div className="flex items-center gap-2 mb-3 text-blue-100">
                <TrendingUp size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Smart Insight</span>
              </div>
              {highestExpense ? (
                <p className="text-lg leading-relaxed">
                  Your biggest spending area is <span className="font-bold underline decoration-blue-300 decoration-2">{highestExpense.category}</span>. 
                  Consider reviewing your <span className="font-bold">${highestExpense.amount}</span> transaction from {highestExpense.date}.
                </p>
              ) : (
                <p className="text-lg text-blue-100 italic">Add more data to see spending insights.</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <h4 className="text-gray-400 text-xs font-bold uppercase mb-1">Monthly Goal</h4>
              <p className="text-gray-800 text-lg font-medium">
                You've saved <span className="text-green-600 font-bold">14% more</span> this week compared to your average. Keep it up! 🚀
              </p>
            </div>
          </div>

          {/* Requirement 1: Visualizations */}
          <DashboardCharts />

          {/* Requirement 2: Transactions Section */}
          <div id="transactions-section" className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
              <span className="text-xs text-gray-400 font-medium italic">Showing data for {role} access</span>
            </div>
            <TransactionTable />
          </div>

        </section>
      </main>
    </div>
  );
}

export default App;