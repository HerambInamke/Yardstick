import { TrendingUp, AlertCircle } from 'lucide-react';
import TransactionForm from '../TransactionForm';
import TransactionList from '../TransactionList';

const TransactionsPage = ({ 
  transactions, 
  categories, 
  onSaveTransaction, 
  onEditTransaction, 
  onDeleteTransaction,
  editTransaction 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-violet-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Transactions</h1>
            <p className="text-slate-600">Manage your income and expenses</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Add Transaction Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg font-semibold text-slate-800">Add Transaction</h2>
            </div>
            <TransactionForm 
              categories={categories}
              onSave={onSaveTransaction}
              editTransaction={editTransaction}
            />
          </div>
        </div>

        {/* Right Column - Transaction List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">All Transactions</h2>
                <p className="text-sm text-slate-600">
                  {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} total
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">
                  ₹{transactions.reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : -t.amount), 0).toFixed(2)}
                </div>
                <div className="text-sm text-slate-600">Net Balance</div>
              </div>
            </div>
            
            <TransactionList 
              transactions={transactions}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
              showActions={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage 