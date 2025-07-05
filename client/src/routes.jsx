import { Routes, Route } from 'react-router-dom';
import DashboardPage from './components/pages/DashboardPage';
import TransactionsPage from './components/pages/TransactionsPage';
import AnalyticsPage from './components/pages/AnalyticsPage';
import BudgetPage from './components/pages/BudgetPage';

export default function AppRoutes({
  transactions,
  categories,
  budgets,
  currentMonth,
  onSaveTransaction,
  onEditTransaction,
  onDeleteTransaction,
  onUpdateBudget,
  editTransaction
}) {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <DashboardPage 
            transactions={transactions}
            categories={categories}
            budgets={budgets}
            currentMonth={currentMonth}
            onSaveTransaction={onSaveTransaction}
            onEditTransaction={onEditTransaction}
            onDeleteTransaction={onDeleteTransaction}
            onUpdateBudget={onUpdateBudget}
          />
        } 
      />
      <Route 
        path="/transactions" 
        element={
          <TransactionsPage 
            transactions={transactions}
            categories={categories}
            onSaveTransaction={onSaveTransaction}
            onEditTransaction={onEditTransaction}
            onDeleteTransaction={onDeleteTransaction}
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
            onUpdateBudget={onUpdateBudget}
          />
        } 
      />
    </Routes>
  );
} 