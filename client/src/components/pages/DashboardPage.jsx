import { Target, TrendingUp, AlertCircle } from 'lucide-react';
import TransactionForm from '../TransactionForm';
import TransactionList from '../TransactionList';
import MonthlyExpensesChart from '../MonthlyExpensesChart';
import CategoryPieChart from '../CategoryPieChart';
import BudgetComparisonChart from '../BudgetComparisonChart';
import BudgetManager from '../BudgetManager';
import SpendingInsights from '../SpendingInsights';
import Dashboard from '../Dashboard';

const DashboardPage = ({ 
  transactions, 
  categories, 
  budgets, 
  currentMonth,
  onSaveTransaction,
  onEditTransaction,
  onDeleteTransaction,
  onUpdateBudget,
  editTransaction
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Summary */}
      <div className="mb-8">
        <Dashboard 
          transactions={transactions} 
          budgets={budgets} 
          currentMonth={currentMonth} 
        />
      </div>

      {/* Budget Management */}
      <div className="mb-8">
        <BudgetManager 
          categories={categories} 
          budgets={budgets} 
          onUpdateBudget={onUpdateBudget} 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms and Lists */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Add Transaction</h2>
            <TransactionForm 
              categories={categories}
              onSave={onSaveTransaction}
              editTransaction={editTransaction}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Transactions</h2>
            <TransactionList 
              transactions={transactions.slice(0, 5)}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
              showActions={true}
            />
          </div>
        </div>

        {/* Right Column - Charts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Monthly Expenses</h2>
            <MonthlyExpensesChart transactions={transactions} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Category Breakdown</h2>
              <CategoryPieChart transactions={transactions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Budget vs Actual</h2>
              <BudgetComparisonChart transactions={transactions} budgets={budgets} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Spending Insights</h2>
            <SpendingInsights transactions={transactions} budgets={budgets} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage 