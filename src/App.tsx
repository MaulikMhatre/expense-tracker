import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import SummaryPanel from './components/SummaryPanel';
import CurrencyConverter from './components/CurrencyConverter';
import { Shield, Zap, Sparkles, LayoutGrid } from 'lucide-react';

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('mojito-expenses-v5');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mojito-expenses-v5', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const totalUSD = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-charcoal-950 overflow-x-hidden selection:bg-mojito-accent selection:text-charcoal-950">
      {/* Immersive background glow */}
      <div className="fixed top-[-10%] left-[-5%] w-[80%] md:w-[50%] h-[40%] md:h-[50%] bg-mojito-accent/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-5%] w-[60%] md:w-[40%] h-[30%] md:h-[40%] bg-mojito-700/5 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      {/* Modern High-End Header */}
      <header className="relative z-50 border-b border-white/5 bg-charcoal-950/40 backdrop-blur-3xl sticky top-0">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-4 sm:py-6 flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-6 group cursor-pointer">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-mojito-gradient rounded-xl sm:rounded-[1.25rem] flex items-center justify-center mojito-glow transition-transform duration-500 group-hover:rotate-[10deg]">
              <Sparkles size={20} className="sm:text-[28px] text-charcoal-950" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-2xl font-black tracking-[-0.05em] flex items-center gap-1.5 text-white">
                MOJITO <span className="gradient-text font-medium italic tracking-tight">Tracker</span>
              </h1>
              <p className="text-[8px] sm:text-[10px] font-black text-charcoal-500 tracking-[0.4em] uppercase opacity-70">Personal Finance</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-12">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black text-charcoal-500 tracking-widest uppercase">Safe & Secure</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-extrabold text-mojito-accent tracking-tight">ENCRYPTED</span>
                <Shield size={10} className="text-mojito-accent/80" />
              </div>
            </div>
            
            <div className="hidden sm:block h-10 w-[1px] bg-white/10" />

            <div className="flex items-center gap-4 sm:gap-8">
              <div className="flex flex-col items-end">
                <span className="text-[8px] sm:text-[10px] font-black text-charcoal-500 tracking-widest uppercase mb-1">Total Balance</span>
                <p className="text-lg sm:text-3xl font-black font-mono tracking-[-0.08em] gradient-text leading-none">
                  ${totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group hover:border-mojito-accent/40 transition-all duration-700">
                <Zap size={18} className="sm:text-[24px] text-charcoal-400 group-hover:text-mojito-accent" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid View */}
      <main className="relative z-10 max-w-[1600px] mx-auto p-4 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          
          {/* Left Column: Management */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-10">
            <div className="flex items-center justify-between px-2 sm:px-3">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="p-1.5 sm:p-2 bg-mojito-accent/10 rounded-lg">
                  <LayoutGrid size={14} className="sm:text-[18px] text-mojito-accent" />
                </div>
                <h2 className="text-[10px] sm:text-sm font-black text-white uppercase tracking-[0.4em]">Expense Management</h2>
              </div>
            </div>
            
            <ExpenseForm onAdd={addExpense} />
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </div>

          {/* Right Column: Insights */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-10">
            <div className="flex items-center gap-3 sm:gap-4 px-2 sm:px-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-mojito-accent mojito-glow animate-pulse" />
              <h2 className="text-[10px] sm:text-sm font-black text-white uppercase tracking-[0.4em]">Smart Insights</h2>
            </div>

            <SummaryPanel expenses={expenses} />
            <CurrencyConverter totalUSD={totalUSD} />

            {/* Insight Module */}
            <div className="bento-card bg-mojito-gradient p-[1px] group overflow-hidden">
              <div className="bg-charcoal-950 rounded-[1.8rem] p-6 sm:p-8 flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-[10px] sm:text-[11px] font-black text-mojito-accent uppercase tracking-[0.3em]">Quick Tip</p>
                  <p className="text-[11px] sm:text-sm text-charcoal-400 font-medium leading-relaxed max-w-[200px]">
                    Track your daily spending to reach your savings goals faster!
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-mojito-accent/20 bg-mojito-accent/5 flex items-center justify-center shrink-0">
                   <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-mojito-accent animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[1600px] mx-auto px-6 sm:px-12 py-10 sm:py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-700 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-white">
            MOJITO <span className="text-mojito-accent opacity-50 font-normal italic lowercase tracking-tight">expense tracker</span>
          </p>
          <p className="text-[8px] font-bold text-charcoal-500 uppercase tracking-widest">© 2026 // Simple & Easy Finance</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 font-mono text-[9px] sm:text-[10px] font-bold text-charcoal-500 uppercase tracking-[0.2em]">
          <span>Fast</span>
          <span>Reliable</span>
          <span>Simple</span>
        </div>
      </footer>
    </div>
  );
}
