import { useState } from 'react';
import { DollarSign, Save, Edit3 } from 'lucide-react';

export default function BudgetManager({ categories, budgets, onUpdateBudget }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editAmount, setEditAmount] = useState('');

  const handleEdit = (category, currentAmount) => {
    setEditingCategory(category);
    setEditAmount(currentAmount.toString());
  };

  const handleSave = (category) => {
    if (editAmount && !isNaN(editAmount) && Number(editAmount) >= 0) {
      onUpdateBudget(category, editAmount);
    }
    setEditingCategory(null);
    setEditAmount('');
  };

  const handleCancel = () => {
    setEditingCategory(null);
    setEditAmount('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <h4 className="font-medium text-gray-800">{category}</h4>
              </div>
              {editingCategory === category ? (
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleSave(category)}
                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(category, budgets[category] || 0)}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {editingCategory === category ? (
              <div className="space-y-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter budget amount"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSave(category)}
                />
              </div>
            ) : (
              <div className="text-2xl font-bold text-gray-900">
                ₹{budgets[category] ? budgets[category].toFixed(2) : '0.00'}
              </div>
            )}
            
            <div className="text-xs text-gray-500 mt-1">
              Monthly budget
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 