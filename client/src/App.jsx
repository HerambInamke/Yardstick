import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import AppRoutes from './routes'
import { dummyTransactions, dummyBudgets, categories } from './dummyData'
import { useState } from 'react'

function App() {
  // Use static dummy data but make it editable
  const [transactions, setTransactions] = useState(dummyTransactions)
  const [budgets, setBudgets] = useState(dummyBudgets)
  const [editTransaction, setEditTransaction] = useState(null)
  const [currentMonth] = useState(new Date().toISOString().slice(0, 7))

  // Working handlers for edit functionality
  const handleSaveTransaction = (transaction) => {
    if (transaction.id) {
      // Update existing transaction
      setTransactions(transactions.map(t => t.id === transaction.id ? transaction : t))
    } else {
      // Add new transaction
      setTransactions([
        ...transactions,
        { ...transaction, id: Date.now().toString() },
      ])
    }
    setEditTransaction(null)
  }

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id))
  }

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction)
  }

  const handleUpdateBudget = (category, amount) => {
    setBudgets(prev => ({
      ...prev,
      [category]: Number(amount)
    }))
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-violet-50">
        <Navigation />
        <AppRoutes
          transactions={transactions}
          categories={categories}
          budgets={budgets}
          currentMonth={currentMonth}
          onSaveTransaction={handleSaveTransaction}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
          onUpdateBudget={handleUpdateBudget}
          editTransaction={editTransaction}
        />
      </div>
    </Router>
  )
}

export default App
