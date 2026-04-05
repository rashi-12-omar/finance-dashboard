import React, { useState } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import { Search, Trash2, Plus, X } from 'lucide-react';

const TransactionTable = () => {
  const { transactions, role, deleteTransaction, addTransaction } = useFinanceStore();
  
  // States for Search/Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const [sortBy, setSortBy] = useState('newest'); // Default sort

// States for the "Add" Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({ amount: '', category: '', type: 'expense', date: new Date().toISOString().split('T')[0] });

  // Handle Form Submit
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTx.amount || !newTx.category) return alert("Please fill all fields");
    
    addTransaction({ ...newTx, amount: parseFloat(newTx.amount) });
    setIsModalOpen(false); // Close modal
    setNewTx({ amount: '', category: '', type: 'expense', date: new Date().toISOString().split('T')[0] }); // Reset form
  };

  let processedData = transactions.filter((t) => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  processedData = [...processedData].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'highest') return b.amount - a.amount;
    if (sortBy === 'lowest') return a.amount - b.amount;
    return 0;
  });

  const exportToJson = () => {
  // Create a blob from your transactions data
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "finance_report.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      
      {/* 1. SEARCH & FILTER BAR */}
      {/*<div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">*/}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full md:w-80">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search category..." 
            className="bg-transparent border-none outline-none text-sm w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
    {/* If you don't see an <h3> here, ADD THIS LINE manually */}
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Recent Transactions</h3>
    
    {/* This is the small text showing the role */}
          <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-1">
            Showing data for {role} access
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select 
            className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-white focus:outline-none transition-colors"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all" className="dark:bg-gray-800">All Types</option>
            <option value="income" className="dark:bg-gray-800">Income</option>
            <option value="expense" className="dark:bg-gray-800">Expense</option>
          </select>

          {/* --- Paste this right here --- */}
          <select 
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer font-medium text-blue-600"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Amount</option>
            <option value="lowest">Lowest Amount</option>
          </select>

          {/* ADD BUTTON (Requirement 3) */}
          {/* ADD & EXPORT BUTTONS (Requirement 3 & Optional Enhancement) */}
          {role === 'Admin' && (
            <div className="flex items-center gap-2">
               <button 
                   onClick={exportToJson}
                   className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-50 transition"
               >
                   Export JSON
               </button>
    
               <button 
                   onClick={() => setIsModalOpen(true)}
                   className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md"
               >
                   <Plus size={18} /> Add New
               </button>
            </div>
          )}


          {/* {role === 'Admin' && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-lg"
            >
              <Plus size={18} /> Add New
            </button>
          )} */}
        </div>
      </div>

      {/* 2. THE MODAL (Requirement 3 Pop-up) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add Transaction</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Category</label>
                <input 
                  type="text" required placeholder="e.g. Groceries" 
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500"
                  value={newTx.category}
                  onChange={(e) => setNewTx({...newTx, category: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Amount ($)</label>
                  <input 
                    type="number" required placeholder="0.00" 
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500"
                    value={newTx.amount}
                    onChange={(e) => setNewTx({...newTx, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Type</label>
                  <select 
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-500"
                    value={newTx.type}
                    onChange={(e) => setNewTx({...newTx, type: e.target.value})}
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition mt-4">
                Confirm Transaction
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. THE TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-bold">Date</th>
              <th className="px-6 py-4 font-bold">Category</th>
              <th className="px-6 py-4 font-bold">Type</th>
              <th className="px-6 py-4 font-bold">Amount</th>
              {role === 'Admin' && <th className="px-6 py-4 font-bold text-right">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
              {processedData.length > 0 ? (
    // CASE 1: If there is data, show the rows
                  processedData.map((t) => (
                      <tr key={t.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{t.date}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{t.category}</td>
                          <td className="px-6 py-4">
                              <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-full ${
                                  t.type === 'income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                  {t.type}
                              </span>
                          </td>
                          <td className={`px-6 py-4 text-sm font-bold ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-red-400'}`}>
                             {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                          </td>
                          {role === 'Admin' && (
                             <td className="px-6 py-4 text-right">
                                <button onClick={() => deleteTransaction(t.id)} className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                                   <Trash2 size={18} />
                                </button>
                             </td>
                          )}
                      </tr>
                  ))
            )  : (
    // CASE 2: If no data matches filters/search, show this empty state
               <tr>
                   <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-12 text-center">
                       <div className="flex flex-col items-center justify-center text-gray-400">
                          <p className="text-lg font-bold text-gray-500">No transactions found</p>
                          <p className="text-sm italic">Try adjusting your filters or search terms.</p>
                       </div>
                   </td>
               </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;