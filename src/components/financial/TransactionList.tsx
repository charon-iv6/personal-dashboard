import React from 'react';
import { Transaction } from '../../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {transactions.map(transaction => (
          <div key={transaction.id} className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{transaction.description}</p>
              <p className="text-sm text-gray-500">{transaction.category}</p>
            </div>
            <p className={`font-medium ${
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;