import { Target, TrendingUp, AlertCircle } from 'lucide-react';
import TransactionForm from '../TransactionForm';
import TransactionList from '../TransactionList';
import MonthlyExpensesChart from '../MonthlyExpensesChart';
import CategoryPieChart from '../CategoryPieChart';
import BudgetComparisonChart from '../BudgetComparisonChart';
import BudgetManager from '../BudgetManager';
import SpendingInsights from '../SpendingInsights';
import Dashboard from '../Dashboard';

export default function DashboardPage({ transactions, categories, budgets, currentMonth, onSaveTransaction, onEditTransaction, onDeleteTransaction, onUpdateBudget }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Dashboard with summary cards */}
      <Dashboard 
        transactions={transactions} 
        categories={categories} 
        budgets={budgets}
        currentMonth={currentMonth}
      />
      
      {/* Budget Management Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-6 h-6 text-emerald-600" />
          <h2 className="text-2xl font-semibold text-slate-800">Budget Management</h2>
        </div>
        <BudgetManager 
          categories={categories}
          budgets={budgets}
          onUpdateBudget={onUpdateBudget}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Forms and Lists */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              <h3 className="text-lg font-semibold text-slate-800">Add Transaction</h3>
            </div>
            <TransactionForm
              onSave={onSaveTransaction}
              editTransaction={null}
              categories={categories}
            />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-slate-800">Transaction History</h3>
            </div>
            <TransactionList
              transactions={transactions}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
            />
          </div>
        </div>
        
        {/* Right Column - Charts and Insights */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
              <MonthlyExpensesChart transactions={transactions} />
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
              <CategoryPieChart transactions={transactions} />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <BudgetComparisonChart 
              transactions={transactions} 
              budgets={budgets}
              currentMonth={currentMonth}
            />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <SpendingInsights 
              transactions={transactions}
              budgets={budgets}
              currentMonth={currentMonth}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 