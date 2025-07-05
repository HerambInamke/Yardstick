import { Target, BarChart3 } from 'lucide-react';
import BudgetManager from '../BudgetManager';

export default function BudgetPage({ categories, budgets, onUpdateBudget }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Budget Management */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Target className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-semibold text-slate-800">Budget Management</h2>
          </div>
          <BudgetManager 
            categories={categories}
            budgets={budgets}
            onUpdateBudget={onUpdateBudget}
          />
        </div>
        
        {/* Budget Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-violet-600" />
            <h3 className="text-lg font-semibold text-slate-800">Budget Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
              <div className="text-sm font-medium text-emerald-800">Total Budget</div>
              <div className="text-2xl font-bold text-emerald-900">
                ₹{Object.values(budgets).reduce((sum, budget) => sum + budget, 0).toFixed(2)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-4 border border-sky-200">
              <div className="text-sm font-medium text-sky-800">Categories</div>
              <div className="text-2xl font-bold text-sky-900">
                {Object.keys(budgets).filter(cat => budgets[cat] > 0).length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-4 border border-violet-200">
              <div className="text-sm font-medium text-violet-800">Active Budgets</div>
              <div className="text-2xl font-bold text-violet-900">
                {Object.values(budgets).filter(budget => budget > 0).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 