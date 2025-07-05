import { DollarSign, TrendingUp, Clock, Target, AlertTriangle } from 'lucide-react';

function getCategoryBreakdown(transactions) {
  const breakdown = {};
  transactions.forEach(({ amount, category }) => {
    const cat = category || 'Uncategorized';
    breakdown[cat] = (breakdown[cat] || 0) + amount;
  });
  return breakdown;
}

function getTopCategories(transactions, limit = 3) {
  const breakdown = getCategoryBreakdown(transactions);
  return Object.entries(breakdown)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit);
}

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

export default function Dashboard({ transactions, categories, budgets, currentMonth }) {
  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);
  const topCategories = getTopCategories(transactions);
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Budget calculations
  const monthlySpending = getMonthlyCategorySpending(transactions, currentMonth);
  const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);
  const totalSpent = Object.values(monthlySpending).reduce((sum, spent) => sum + spent, 0);
  const remaining = totalBudget - totalSpent;
  const budgetPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Expenses Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Total Expenses</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-900 mb-1">₹{totalExpenses.toFixed(2)}</p>
          <p className="text-sm text-blue-700">
            {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Monthly Budget Status */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">Monthly Budget</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-900 mb-1">₹{totalBudget.toFixed(2)}</p>
          <p className="text-sm text-green-700">
            {budgetPercentage.toFixed(1)}% used
          </p>
        </div>

        {/* Monthly Spending */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-800">This Month</h3>
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-900 mb-1">₹{totalSpent.toFixed(2)}</p>
          <p className={`text-sm ${remaining >= 0 ? 'text-purple-700' : 'text-red-700'}`}>
            {remaining >= 0 ? `₹${remaining.toFixed(2)} left` : `₹${Math.abs(remaining).toFixed(2)} over`}
          </p>
        </div>

        {/* Budget Status */}
        <div className={`rounded-xl p-6 border shadow-sm ${
          remaining >= 0 
            ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200'
            : 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {remaining >= 0 ? (
                <Target className="w-6 h-6 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-red-600" />
              )}
              <h3 className={`text-lg font-semibold ${
                remaining >= 0 ? 'text-emerald-800' : 'text-red-800'
              }`}>
                Status
              </h3>
            </div>
          </div>
          <p className={`text-3xl font-bold mb-1 ${
            remaining >= 0 ? 'text-emerald-900' : 'text-red-900'
          }`}>
            {remaining >= 0 ? 'On Track' : 'Over Budget'}
          </p>
          <p className={`text-sm ${
            remaining >= 0 ? 'text-emerald-700' : 'text-red-700'
          }`}>
            {budgetPercentage.toFixed(1)}% of budget used
          </p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">Top Categories</h3>
          </div>
          {topCategories.length > 0 ? (
            <div className="space-y-3">
              {topCategories.map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm font-bold text-gray-900">₹{amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No transactions yet</p>
          )}
        </div>

        {/* Recent Transactions Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
          </div>
          {recentTransactions.length > 0 ? (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{transaction.description}</div>
                    <div className="text-xs text-gray-500">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">₹{transaction.amount.toFixed(2)}</span>
                    <div className="text-xs text-gray-500">{transaction.category}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No transactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
} 