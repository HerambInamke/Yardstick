import { Edit3, Trash2, DollarSign, Calendar, Tag } from 'lucide-react';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <DollarSign className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg font-medium">No transactions yet</p>
        <p className="text-gray-400 text-sm mt-1">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((t) => (
        <div key={t.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center space-x-1 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-gray-900">₹{t.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{t.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {t.category || 'Uncategorized'}
                  </span>
                </div>
              </div>
              <p className="text-gray-800 font-medium">{t.description}</p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(t)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit transaction"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(t.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 