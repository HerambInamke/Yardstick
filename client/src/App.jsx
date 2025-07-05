import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import MonthlyExpensesChart from './components/MonthlyExpensesChart'
import CategoryPieChart from './components/CategoryPieChart'
import BudgetComparisonChart from './components/BudgetComparisonChart'
import BudgetManager from './components/BudgetManager'
import SpendingInsights from './components/SpendingInsights'
import Dashboard from './components/Dashboard'
import { Wallet, TrendingUp, AlertCircle, Target, BarChart3, Settings, Home, PieChart } from 'lucide-react'

// Dashboard Page Component
function DashboardPage({ transactions, categories, budgets, currentMonth, onSaveTransaction, onEditTransaction, onDeleteTransaction, onUpdateBudget }) {
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
          <Target className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Budget Management</h2>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Add Transaction</h3>
            </div>
            <TransactionForm
              onSave={onSaveTransaction}
              editTransaction={null}
              categories={categories}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">Transaction History</h3>
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <MonthlyExpensesChart transactions={transactions} />
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <CategoryPieChart transactions={transactions} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <BudgetComparisonChart 
              transactions={transactions} 
              budgets={budgets}
              currentMonth={currentMonth}
            />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <SpendingInsights 
              transactions={transactions}
              budgets={budgets}
              currentMonth={currentMonth}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Transactions Page Component
function TransactionsPage({ transactions, categories, onSaveTransaction, onEditTransaction, onDeleteTransaction, editTransaction }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">Add Transaction</h3>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">All Transactions</h3>
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
  )
}

// Analytics Page Component
function AnalyticsPage({ transactions, budgets, currentMonth }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Monthly Expenses Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <MonthlyExpensesChart transactions={transactions} />
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <CategoryPieChart transactions={transactions} />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <BudgetComparisonChart 
              transactions={transactions} 
              budgets={budgets}
              currentMonth={currentMonth}
            />
          </div>
        </div>
        
        {/* Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <SpendingInsights 
            transactions={transactions}
            budgets={budgets}
            currentMonth={currentMonth}
          />
        </div>
      </div>
    </div>
  )
}

// Budget Page Component
function BudgetPage({ categories, budgets, onUpdateBudget }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Budget Management */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Target className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Budget Management</h2>
          </div>
          <BudgetManager 
            categories={categories}
            budgets={budgets}
            onUpdateBudget={onUpdateBudget}
          />
        </div>
        
        {/* Budget Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Budget Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="text-sm font-medium text-green-800">Total Budget</div>
              <div className="text-2xl font-bold text-green-900">
                ₹{Object.values(budgets).reduce((sum, budget) => sum + budget, 0).toFixed(2)}
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-800">Categories</div>
              <div className="text-2xl font-bold text-blue-900">
                {Object.keys(budgets).filter(cat => budgets[cat] > 0).length}
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
              <div className="text-sm font-medium text-purple-800">Active Budgets</div>
              <div className="text-2xl font-bold text-purple-900">
                {Object.values(budgets).filter(budget => budget > 0).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Navigation Component
function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/transactions', label: 'Transactions', icon: AlertCircle },
    { path: '/analytics', label: 'Analytics', icon: PieChart },
    { path: '/budget', label: 'Budget', icon: Target },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Wallet className="w-8 h-8 text-indigo-600" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Finance Visualizer
            </h1>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [transactions, setTransactions] = useState([])
  const [editTransaction, setEditTransaction] = useState(null)
  const [budgets, setBudgets] = useState({})
  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7))

  // Predefined categories for Stage 2 & 3
  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Healthcare',
    'Utilities',
    'Education',
    'Travel',
    'Other'
  ]

  // Initialize budgets for all categories
  useEffect(() => {
    const defaultBudgets = {}
    categories.forEach(category => {
      if (!budgets[category]) {
        defaultBudgets[category] = 0
      }
    })
    if (Object.keys(defaultBudgets).length > 0) {
      setBudgets(prev => ({ ...prev, ...defaultBudgets }))
    }
  }, [categories])

  // Add or update transaction
  const handleSaveTransaction = (transaction) => {
    if (transaction.id) {
      setTransactions(transactions.map(t => t.id === transaction.id ? transaction : t))
    } else {
      setTransactions([
        ...transactions,
        { ...transaction, id: Date.now().toString() },
      ])
    }
    setEditTransaction(null)
  }

  // Delete transaction
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  // Edit transaction
  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction)
  }

  // Update budget
  const handleUpdateBudget = (category, amount) => {
    setBudgets(prev => ({
      ...prev,
      [category]: Number(amount)
    }))
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navigation />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <DashboardPage 
                transactions={transactions}
                categories={categories}
                budgets={budgets}
                currentMonth={currentMonth}
                onSaveTransaction={handleSaveTransaction}
                onEditTransaction={handleEditTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                onUpdateBudget={handleUpdateBudget}
              />
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <TransactionsPage 
                transactions={transactions}
                categories={categories}
                onSaveTransaction={handleSaveTransaction}
                onEditTransaction={handleEditTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                editTransaction={editTransaction}
              />
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <AnalyticsPage 
                transactions={transactions}
                budgets={budgets}
                currentMonth={currentMonth}
              />
            } 
          />
          <Route 
            path="/budget" 
            element={
              <BudgetPage 
                categories={categories}
                budgets={budgets}
                onUpdateBudget={handleUpdateBudget}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
