import React from 'react';
import { Trash2, Activity } from 'lucide-react';
import { CATEGORY_META } from './ExpenseForm';

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="bento-card !p-5 sm:!p-8">
        <h2 className="section-label">RECENT TRANSACTIONS</h2>
        <div className="flex flex-col items-center justify-center py-16 sm:py-24 opacity-20 group text-center">
          <Activity size={40} className="sm:text-[56px] text-mojito-accent mb-4 sm:mb-6 animate-pulse" />
          <p className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em]">No expenses yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bento-card h-full flex flex-col !p-5 sm:!p-8">
      <div className="flex justify-between items-center mb-6 sm:mb-10">
        <h2 className="section-label mb-0">RECENT TRANSACTIONS</h2>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline text-[11px] font-black text-charcoal-600 uppercase tracking-widest">Items:</span>
          <span className="bg-mojito-accent text-charcoal-950 text-[9px] sm:text-[11px] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-black tracking-tighter">
            {expenses.length.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 overflow-y-auto pr-1 sm:pr-3 custom-scrollbar flex-1 max-h-[400px] sm:max-h-[500px]">
        {[...expenses].reverse().map((expense) => {
          const meta = CATEGORY_META[expense.category];
          const Icon = meta.icon;
          return (
            <div 
              key={expense.id} 
              className={`group relative flex items-center gap-3 sm:gap-6 p-4 sm:p-6 bg-white/[0.02] border border-white/5 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:border-white/10 hover:shadow-2xl overflow-hidden`}
            >
              <div className={`absolute inset-0 ${meta.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              <div className="hidden sm:flex justify-center relative z-10">
                <div className={`p-2 rounded-xl bg-charcoal-900 border border-white/5 group-hover:border-white/20 transition-all`}>
                  <Icon size={16} className={meta.color} />
                </div>
              </div>
              
              <div className="flex-1 min-w-0 relative z-10">
                <p className="text-sm sm:text-[16px] font-black text-white truncate uppercase tracking-tight group-hover:translate-x-1 transition-transform">
                  {expense.name}
                </p>
                <div className="flex items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                  <span className={`text-[8px] sm:text-[10px] font-black px-1.5 sm:px-3 py-0.5 rounded-lg ${meta.bg} ${meta.color} border ${meta.border} uppercase tracking-tight`}>
                    {expense.category}
                  </span>
                  <span className="text-[8px] sm:text-[10px] text-charcoal-500 font-mono font-bold tracking-tighter opacity-60">
                    ID:{expense.id.toString().slice(-4)}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0 relative z-10">
                <p className="text-sm sm:text-xl font-black font-mono text-white tracking-[-0.08em] group-hover:scale-110 transition-transform origin-right">
                  ${expense.amount.toFixed(2)}
                </p>
                <p className="text-[8px] sm:text-[10px] text-charcoal-500 font-black uppercase tracking-[0.2em] mt-0.5 sm:mt-1 opacity-80">
                  {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                </p>
              </div>

              <div className="flex justify-end ml-1 sm:ml-0 relative z-10">
                <button
                  onClick={() => onDelete(expense.id)}
                  className="p-1.5 sm:p-3 rounded-xl text-charcoal-500 hover:text-red-400 hover:bg-red-400/20 transition-all opacity-40 sm:opacity-0 group-hover:opacity-100"
                  title="Delete"
                >
                  <Trash2 size={14} className="sm:text-[16px]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
