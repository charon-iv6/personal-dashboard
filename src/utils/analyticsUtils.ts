import { Transaction } from '../types';
import { startOfMonth, endOfMonth, subMonths } from 'date-fns';

export const calculateMonthlyTrends = (transactions: Transaction[]) => {
  const currentDate = new Date();
  const currentMonth = startOfMonth(currentDate);
  const lastMonth = startOfMonth(subMonths(currentDate, 1));

  const currentMonthTransactions = transactions.filter(t => 
    new Date(t.date) >= currentMonth && 
    new Date(t.date) <= endOfMonth(currentDate)
  );

  const lastMonthTransactions = transactions.filter(t =>
    new Date(t.date) >= lastMonth &&
    new Date(t.date) < currentMonth
  );

  // Calculate top expenses
  const topExpenses = Object.entries(
    currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>)
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([category, amount]) => ({ category, amount }));

  // Generate savings opportunities
  const savingsOpportunities = [];
  
  // Compare with last month
  const currentTotal = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const lastTotal = lastMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  if (currentTotal > lastTotal) {
    savingsOpportunities.push(
      `Spending is up ${Math.round((currentTotal - lastTotal) / lastTotal * 100)}% from last month`
    );
  }

  // Category-specific insights
  topExpenses.forEach(({ category, amount }) => {
    const lastMonthAmount = lastMonthTransactions
      .filter(t => t.type === 'expense' && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);

    if (amount > lastMonthAmount) {
      savingsOpportunities.push(
        `${category} spending increased by ${Math.round((amount - lastMonthAmount) / lastMonthAmount * 100)}%`
      );
    }
  });

  return {
    topExpenses,
    savingsOpportunities
  };
};