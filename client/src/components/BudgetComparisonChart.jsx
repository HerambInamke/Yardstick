import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

function getMonthlyCategorySpending(transactions, currentMonth) {
  const monthlySpending = {};
  transactions
    .filter(t => t.date.startsWith(currentMonth))
    .forEach(({ amount, category }) => {
      const cat = category || 'Uncategorized';
      monthlySpending[cat] = (monthlySpending[cat] || 0) + amount;
    });
  return monthlySpending;
}

export default function BudgetComparisonChart({ transactions, budgets, currentMonth }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const monthlySpending = getMonthlyCategorySpending(transactions, currentMonth);
    const categories = Object.keys(budgets).filter(cat => budgets[cat] > 0);
    
    if (categories.length === 0) {
      return;
    }

    const budgetData = categories.map(cat => budgets[cat]);
    const actualData = categories.map(cat => monthlySpending[cat] || 0);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Budget',
            data: budgetData,
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 2,
          },
          {
            label: 'Actual Spending',
            data: actualData,
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ₹${context.parsed.y.toFixed(2)}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount (₹)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Categories',
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [transactions, budgets, currentMonth]);

  const monthlySpending = getMonthlyCategorySpending(transactions, currentMonth);
  const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);
  const totalSpent = Object.values(monthlySpending).reduce((sum, spent) => sum + spent, 0);
  const remaining = totalBudget - totalSpent;
  const isOverBudget = remaining < 0;

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Budget vs Actual Spending</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Total Budget</span>
          </div>
          <p className="text-2xl font-bold text-green-900 mt-1">₹{totalBudget.toFixed(2)}</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 mt-1">₹{totalSpent.toFixed(2)}</p>
        </div>
        
        <div className={`rounded-lg p-4 border ${
          isOverBudget 
            ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-200' 
            : 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200'
        }`}>
          <div className="flex items-center space-x-2">
            {isOverBudget ? (
              <TrendingDown className="w-5 h-5 text-red-600" />
            ) : (
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            )}
            <span className={`text-sm font-medium ${
              isOverBudget ? 'text-red-800' : 'text-emerald-800'
            }`}>
              {isOverBudget ? 'Over Budget' : 'Remaining'}
            </span>
          </div>
          <p className={`text-2xl font-bold mt-1 ${
            isOverBudget ? 'text-red-900' : 'text-emerald-900'
          }`}>
            ₹{Math.abs(remaining).toFixed(2)}
          </p>
        </div>
      </div>

      {Object.keys(budgets).filter(cat => budgets[cat] > 0).length > 0 ? (
        <canvas ref={chartRef} height={300}></canvas>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Set budgets for categories to see comparison</p>
        </div>
      )}
    </div>
  );
} 