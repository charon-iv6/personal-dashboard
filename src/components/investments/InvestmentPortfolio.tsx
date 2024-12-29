import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Investment } from '../../hooks/useInvestments';

interface InvestmentPortfolioProps {
  investments: Investment[];
}

const InvestmentPortfolio: React.FC<InvestmentPortfolioProps> = ({ investments }) => {
  const calculateReturn = (investment: Investment) => {
    const currentValue = investment.quantity * investment.current_price;
    const purchaseValue = investment.quantity * investment.purchase_price;
    return ((currentValue - purchaseValue) / purchaseValue) * 100;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-900">Investment Portfolio</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {investments.map(investment => {
          const returnPercentage = calculateReturn(investment);
          const isPositive = returnPercentage >= 0;

          return (
            <div key={investment.id} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{investment.name}</h4>
                  <p className="text-sm text-gray-500">{investment.symbol}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center space-x-1 ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(returnPercentage).toFixed(2)}%</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    ${(investment.quantity * investment.current_price).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvestmentPortfolio;