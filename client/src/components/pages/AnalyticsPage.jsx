import MonthlyExpensesChart from '../MonthlyExpensesChart';
import CategoryPieChart from '../CategoryPieChart';
import BudgetComparisonChart from '../BudgetComparisonChart';
import SpendingInsights from '../SpendingInsights';

export default function AnalyticsPage({ transactions, budgets, currentMonth }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Monthly Expenses Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
          <MonthlyExpensesChart transactions={transactions} />
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <CategoryPieChart transactions={transactions} />
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <BudgetComparisonChart 
              transactions={transactions} 
              budgets={budgets}
              currentMonth={currentMonth}
            />
          </div>
        </div>
        
        {/* Insights */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
          <SpendingInsights 
            transactions={transactions}
            budgets={budgets}
            currentMonth={currentMonth}
          />
        </div>
      </div>
    </div>
  );
} 