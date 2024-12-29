import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (data: {
    amount: number;
    category: string;
    description: string;
    date: string;
    type: 'income' | 'expense';
  }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split('T')[0],
      type,
    });
    
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            required
          />
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Groceries"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Enter description"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Add Transaction</span>
      </button>
    </form>
  );
};

export default TransactionForm;