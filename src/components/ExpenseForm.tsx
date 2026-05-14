import React, { useState } from 'react';
import { Plus, Utensils, Plane, Megaphone, Zap, Box } from 'lucide-react';
import { Select, SelectTrigger, SelectContent, SelectItem } from './ui/select';

export const CATEGORIES = ["Food", "Travel", "Marketing", "Utilities", "Other"];

export const CATEGORY_META: Record<string, { icon: any, color: string, bg: string, border: string }> = {
  Food:      { icon: Utensils, color: "text-blue-300", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  Travel:    { icon: Plane, color: "text-purple-300", bg: "bg-purple-600/10", border: "border-purple-600/20" },
  Marketing: { icon: Megaphone, color: "text-mojito-accent", bg: "bg-mojito-accent/10", border: "border-mojito-accent/20" },
  Utilities: { icon: Zap, color: "text-emerald-300", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  Other:     { icon: Box, color: "text-charcoal-400", bg: "bg-charcoal-800/10", border: "border-charcoal-800/20" },
};

interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseFormProps {
  onAdd: (expense: Expense) => void;
}

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    onAdd({
      id: Date.now(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString()
    });
    setName("");
    setAmount("");
  };

  return (
    <div className="bento-card !p-5 sm:!p-8">
      <h2 className="section-label relative">
        ADD NEW EXPENSE
      </h2>
      <form onSubmit={handleSubmit} className={`space-y-6 sm:space-y-8 ${shake ? 'animate-shake' : ''}`}>
        <div className="space-y-2 sm:space-y-3">
          <label className="field-label">Expense Name</label>
          <input
            type="text"
            placeholder="What did you spend on?"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-2 sm:space-y-3">
            <label className="field-label">Amount ($)</label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal-600 font-mono text-sm sm:text-[16px] font-black group-focus-within:text-mojito-accent transition-colors">$</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                className="input-field pl-10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <label className="field-label">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger 
                placeholder="Pick a category…" 
                className="w-full bg-charcoal-950/60 border-white/5 rounded-2xl h-[50px] sm:h-[54px] text-sm sm:text-[15px] font-medium"
              />
              <SelectContent className="bg-charcoal-900 border-white/10 rounded-2xl shadow-2xl">
                {CATEGORIES.map((cat, index) => {
                  const Icon = CATEGORY_META[cat].icon;
                  return (
                    <SelectItem 
                      key={cat} 
                      index={index} 
                      value={cat} 
                      icon={Icon}
                      className="hover:bg-white/5 text-charcoal-400 data-[selected=true]:text-mojito-accent"
                    >
                      {cat}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <button
          type="submit"
          className="glass-button w-full flex items-center justify-center gap-3 py-4 sm:py-5 text-xs sm:text-sm"
        >
          <Plus size={18} strokeWidth={4} /> ADD TO LIST
        </button>
      </form>
    </div>
  );
}
