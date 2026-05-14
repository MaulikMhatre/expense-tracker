import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCcw, Info, DollarSign, Euro, PoundSterling, IndianRupee } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem } from './ui/select';

interface CurrencyConverterProps {
  totalUSD: number;
}

const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', icon: DollarSign },
  { code: 'EUR', symbol: '€', name: 'Euro', icon: Euro },
  { code: 'GBP', symbol: '£', name: 'British Pound', icon: PoundSterling },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', icon: IndianRupee },
];

export default function CurrencyConverter({ totalUSD }: CurrencyConverterProps) {
  const [targetCurrency, setTargetCurrency] = useState('INR');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.frankfurter.app/latest?from=USD');
      if (!response.ok) throw new Error('Update failed');
      const data = await response.json();
      setRates({ ...data.rates, USD: 1 });
      setLastUpdated(new Date().toLocaleTimeString('en-GB'));
    } catch (err: any) {
      setError('Live updates offline');
      setRates({ EUR: 0.92, GBP: 0.79, INR: 83.45, USD: 1 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  const currentRate = rates[targetCurrency] || 0;
  const convertedAmount = totalUSD * currentRate;
  const currencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === targetCurrency);

  return (
    <div className="bento-card border-dashed border-white/10 relative overflow-hidden group !p-5 sm:!p-8">
      <h2 className="section-label">CURRENCY PREVIEW</h2>
      
      <div className="relative z-10 flex gap-3 sm:gap-6 mb-8 sm:mb-10">
        <div className="flex-1 min-w-0">
          <Select value={targetCurrency} onValueChange={setTargetCurrency}>
            <SelectTrigger 
              placeholder="Currency…" 
              className="w-full bg-charcoal-900/50 border-white/5 rounded-2xl h-[50px] sm:h-[54px] text-[10px] sm:text-xs font-black uppercase tracking-widest hover:border-mojito-accent/40 transition-all"
            />
            <SelectContent className="bg-charcoal-900 border-white/10 rounded-2xl shadow-2xl">
              {SUPPORTED_CURRENCIES.map((c, index) => (
                <SelectItem 
                  key={c.code} 
                  index={index} 
                  value={c.code} 
                  icon={c.icon}
                  className="hover:bg-white/5 text-charcoal-400 data-[selected=true]:text-mojito-accent"
                >
                  {c.code} — {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <button
          onClick={fetchRates}
          disabled={loading}
          className="px-4 sm:px-5 bg-charcoal-900/50 border border-white/10 rounded-2xl hover:border-mojito-accent/50 hover:bg-mojito-accent/5 transition-all shadow-xl"
        >
          <RefreshCcw size={18} className={`${loading ? 'animate-spin text-mojito-accent' : 'text-charcoal-500 group-hover:text-mojito-accent'}`} />
        </button>
      </div>

      <div className="relative z-10 p-6 sm:p-8 bg-charcoal-950/90 border border-white/10 rounded-2xl sm:rounded-[2.5rem] space-y-6 sm:space-y-8 shadow-inner-glass group/data overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-mojito-accent/5 blur-[100px] rounded-full" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start gap-4 sm:gap-0 relative z-10">
          <div>
            <p className="text-[9px] sm:text-[11px] font-black text-charcoal-600 uppercase tracking-[0.3em] mb-2 sm:mb-3 ml-1">In {currencyInfo?.name}</p>
            <div className="flex items-baseline gap-2 sm:gap-3">
              <span className="text-3xl sm:text-5xl font-black font-mono tracking-[-0.1em] text-white group-hover/data:text-mojito-accent transition-colors duration-500">
                {currencyInfo?.symbol}{convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-mojito-accent text-[10px] sm:text-sm font-black font-mono tracking-tighter">{targetCurrency}</span>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-[9px] sm:text-[11px] font-black text-charcoal-600 uppercase tracking-[0.3em] mb-2 sm:mb-3 sm:mr-1">Live Rate</p>
            <p className="text-xs sm:text-[15px] font-mono font-bold text-white tracking-tighter">
              1 USD = {currentRate.toFixed(2)} {targetCurrency}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 sm:pt-8 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-2 sm:gap-3 text-charcoal-500">
            <Info size={12} className="sm:text-[14px] text-mojito-accent/60" />
            <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Verified Exchange Rate</span>
          </div>
          {lastUpdated && (
            <span className="text-[8px] sm:text-[10px] font-mono text-charcoal-700 font-black uppercase tracking-tight">Updated {lastUpdated}</span>
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-4 sm:mt-6 px-3 sm:px-4 py-2 sm:py-3 bg-red-400/5 border border-red-400/20 rounded-xl sm:rounded-2xl text-center">
           <p className="text-[8px] sm:text-[10px] text-red-400 font-black uppercase tracking-[0.3em] opacity-80">
            Rates are currently static
          </p>
        </div>
      )}
    </div>
  );
}
