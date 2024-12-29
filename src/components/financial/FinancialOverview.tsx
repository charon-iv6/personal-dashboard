import React from 'react';
import { Wallet, TrendingUp, TrendingDown, PieChart, LineChart } from 'lucide-react';
import { Transaction } from '../../types';
import { calculateTotals } from '../../utils/financialUtils';
import FinancialCard from './FinancialCard';
import TransactionList from './TransactionList';
import ChartCard from '../shared/ChartCard';

const FinancialOverview: React.FC = () => {
  const [transactions] = React.useState<Transaction[]>([
    {
      id: '1',
      amount: 5000,
      category: 'Salary',
      description: 'Monthly salary',
      date: '2024-03-01',
      type: 'income',
    },
    {
      id: '2',
      amount: 1200,
      category: 'Rent',
      description: 'Monthly rent',
      date: '2024-03-05',
      type: 'expense',
    },
  ]);

  const { totalIncome, totalExpenses, balance } = calculateTotals(transactions);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Financial Overview</h2>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FinancialCard
          icon={Wallet}
          title="Balance"
          amount={balance}
          iconColor="text-blue-500"
        />
        <FinancialCard
          icon={TrendingUp}
          title="Income"
          amount={totalIncome}
          iconColor="text-green-500"
        />
        <FinancialCard
          icon={TrendingDown}
          title="Expenses"
          amount={totalExpenses}
          iconColor="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="Expense Categories"
          icon={PieChart}
          placeholder="Pie chart coming soon"
        />
        <ChartCard
          title="Monthly Overview"
          icon={LineChart}
          placeholder="Line chart coming soon"
        />
      </div>

      <TransactionList transactions={transactions} />
    </div>
  );
};

export default FinancialOverview;