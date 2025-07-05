import { TrendingUp, AlertCircle } from 'lucide-react';
import TransactionForm from '../TransactionForm';
import TransactionList from '../TransactionList';

export default function TransactionsPage({ transactions, categories, onSaveTransaction, onEditTransaction, onDeleteTransaction, editTransaction }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6 sticky top-8">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-sky-600" />
              <h3 className="text-lg font-semibold text-slate-800">Add Transaction</h3>
            </div>
            <TransactionForm
              onSave={onSaveTransaction}
              editTransaction={editTransaction}
              categories={categories}
            />
          </div>
        </div>
        
        {/* Right Column - Transaction List */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/50 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-slate-800">All Transactions</h3>
            </div>
            <TransactionList
              transactions={transactions}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 