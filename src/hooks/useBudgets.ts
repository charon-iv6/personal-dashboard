import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { startOfMonth, endOfMonth } from 'date-fns';

export interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  month: string;
}

export function useBudgets(userId: string) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgets();
  }, [userId]);

  const fetchBudgets = async () => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());

    // First get budgets
    const { data: budgetData } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', userId)
      .eq('month', start.toISOString().slice(0, 7));

    // Then get actual spending
    const { data: transactions } = await supabase
      .from('transactions')
      .select('category, amount')
      .eq('user_id', userId)
      .eq('type', 'expense')
      .gte('date', start.toISOString())
      .lte('date', end.toISOString());

    const spending = transactions?.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    const budgetsWithSpending = budgetData?.map(budget => ({
      ...budget,
      spent: spending[budget.category] || 0
    }));

    setBudgets(budgetsWithSpending || []);
    setLoading(false);
  };

  return {
    budgets,
    loading,
    refresh: fetchBudgets
  };
}