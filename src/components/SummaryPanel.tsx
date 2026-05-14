import React, { useMemo } from 'react';
import { TrendingUp, Zap } from 'lucide-react';
import { CATEGORIES, CATEGORY_META } from './ExpenseForm';

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface SummaryPanelProps {
  expenses: Expense[];
}

export default function SummaryPanel({ expenses }: SummaryPanelProps) {
  const total = useMemo(() => expenses.reduce((sum, exp) => sum + exp.amount, 0), [expenses]);

  const categoryTotals = useMemo(() => CATEGORIES.map(cat => {
    const amount = expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { name: cat, amount };
  }), [expenses]);

  const scaleCeiling = useMemo(() => {
    if (total === 0) return 1000;
    return Math.ceil(total / 500) * 500;
  }, [total]);

  return (
    <div className="bento-card border-white/5 overflow-hidden group !p-5 sm:!p-8">
      {/* Decorative background typography */}
      <div className="hidden sm:block absolute top-10 right-10 text-[160px] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter group-hover:text-mojito-accent/[0.04] transition-colors duration-1000 uppercase">
        DATA
      </div>

      <h2 className="section-label relative z-10">SPENDING ANALYSIS</h2>
      
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
        <div className="p-5 sm:p-7 bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2rem] group/card hover:border-mojito-accent/40 transition-all shadow-xl">
          <p className="text-[9px] sm:text-[10px] font-black text-charcoal-500 tracking-[0.3em] uppercase mb-1 sm:mb-2">Total Spent</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-4xl font-black font-mono tracking-[-0.08em] text-white group-hover/card:text-mojito-accent transition-colors leading-none">
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        <div className="p-5 sm:p-7 bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2rem] group/card hover:border-mojito-accent/40 transition-all shadow-xl">
          <p className="text-[9px] sm:text-[10px] font-black text-charcoal-500 tracking-[0.3em] uppercase mb-1 sm:mb-2">Scale View</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-4xl font-black font-mono tracking-[-0.08em] text-charcoal-400 leading-none">
              ${scaleCeiling}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 space-y-6 sm:space-y-8">
        <div className="flex justify-between items-center px-1">
          <p className="text-[10px] sm:text-[11px] font-black text-charcoal-400 tracking-[0.4em] uppercase">Category Breakdown</p>
          <div className="flex items-center gap-2">
             <div className="p-1 sm:p-1.5 bg-mojito-accent/10 rounded-lg">
                <TrendingUp size={12} className="sm:text-[14px] text-mojito-accent" />
             </div>
          </div>
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          {categoryTotals.map(cat => {
            const meta = CATEGORY_META[cat.name];
            const volumePct = (cat.amount / scaleCeiling) * 100;
            const actualPct = total > 0 ? (cat.amount / total) * 100 : 0;
            const Icon = meta.icon;
            
            return (
              <div key={cat.name} className="group/bar space-y-3">
                <div className="flex justify-between text-[11px] sm:text-[13px] font-black">
                  <div className="items-center gap-3 hidden sm:flex">
                    <div className={`w-8 h-8 rounded-lg ${meta.bg} flex items-center justify-center border ${meta.border} group-hover/bar:scale-110 transition-transform`}>
                       <Icon size={14} className={meta.color} />
                    </div>
                    <span className="text-charcoal-400 group-hover/bar:text-white transition-colors uppercase tracking-tight">{cat.name}</span>
                  </div>
                  {/* Mobile view label */}
                  <div className="flex items-center gap-2 sm:hidden">
                    <span className={`w-2 h-2 rounded-full ${meta.bg} ${meta.color.replace('text-', 'bg-')}`} />
                    <span className="text-charcoal-400 uppercase tracking-tight">{cat.name}</span>
                  </div>
                  <div className="flex gap-3 sm:gap-6 items-baseline font-mono">
                    <span className="text-charcoal-600 text-[9px] sm:text-[11px] font-bold">{actualPct.toFixed(1)}%</span>
                    <span className="text-sm sm:text-base text-white tracking-tighter">${cat.amount.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="relative h-3 bg-charcoal-950 rounded-full overflow-hidden border border-white/5 shadow-inner p-[1.5px]">
                  <div className={`absolute inset-0 ${meta.bg} opacity-5`} />
                  <div 
                    className={`relative h-full transition-all duration-1000 ease-out rounded-full ${meta.color.replace('text-', 'bg-')}`}
                    style={{ 
                      width: `${volumePct}%`,
                      background: `linear-gradient(90deg, currentColor 0%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between opacity-50">
        <div className="flex items-center gap-2">
          <Zap size={12} className="text-mojito-accent" />
          <span className="text-[9px] font-black uppercase tracking-widest text-charcoal-500">Live Updates Enabled</span>
        </div>
      </div>
    </div>
  );
}
