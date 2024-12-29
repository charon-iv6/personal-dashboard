import { Transaction } from '../types';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';

export const calculateMonthlySpending = (transactions: Transaction[]) => {
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    
    const monthlyTransactions = transactions.filter(t => 
      t.type === 'expense' &&
      new Date(t.date) >= start &&
      new Date(t.date) <= end
    );

    const amount = monthlyTransactions.reduce((sum, t) => sum + t.amount, 0);

    return {
      month: format(date, 'MMM'),
      amount: Math.round(amount)
    };
  }).reverse();

  return months;
};