import { Target, BarChart3 } from 'lucide-react';
import BudgetManager from '../BudgetManager';

const BudgetPage = ({ categories, budgets, onUpdateBudget }) => {
  const totalBudget = Object.values(budgets).reduce((sum, amount) => sum + amount, 0);
  const activeCategories = Object.keys(budgets).filter(category => budgets[category] > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Budget Management</h1>
            <p className="text-slate-600">Set and track your spending limits</p>
          </div>
        </div>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Budget</p>
              <p className="text-2xl font-bold text-slate-800">₹{totalBudget.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Categories</p>
              <p className="text-2xl font-bold text-slate-800">{activeCategories.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Active Budgets</p>
              <p className="text-2xl font-bold text-slate-800">{activeCategories.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Management */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Set Budget Limits</h2>
        <BudgetManager 
          categories={categories} 
          budgets={budgets} 
          onUpdateBudget={onUpdateBudget} 
        />
      </div>
    </div>
  );
};

export default BudgetPage; 