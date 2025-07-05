import MonthlyExpensesChart from '../MonthlyExpensesChart';
import CategoryPieChart from '../CategoryPieChart';
import BudgetComparisonChart from '../BudgetComparisonChart';
import SpendingInsights from '../SpendingInsights';

const AnalyticsPage = ({ transactions, budgets, currentMonth }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
            <p className="text-slate-600">Deep insights into your spending patterns</p>
          </div>
        </div>
      </div>

      {/* Monthly Expenses Chart */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Monthly Expenses Trend</h2>
          <MonthlyExpensesChart transactions={transactions} />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Category Breakdown</h2>
          <CategoryPieChart transactions={transactions} />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Budget vs Actual Spending</h2>
          <BudgetComparisonChart transactions={transactions} budgets={budgets} />
        </div>
      </div>

      {/* Spending Insights */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Spending Insights</h2>
        <SpendingInsights transactions={transactions} budgets={budgets} />
      </div>
    </div>
  );
};

export default AnalyticsPage; 