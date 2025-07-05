import { Lightbulb, AlertTriangle, CheckCircle, TrendingUp, Calendar, Target } from 'lucide-react';

function getMonthlyCategorySpending(transactions, currentMonth) {
  const monthlySpending = {};
  transactions
    .filter(t => t.date.startsWith(currentMonth))
    .forEach(({ amount, category }) => {
      const cat = category || 'Uncategorized';
      monthlySpending[cat] = (monthlySpending[cat] || 0) + amount;
    });
  return monthlySpending;
}

function getInsights(transactions, budgets, currentMonth) {
  const monthlySpending = getMonthlyCategorySpending(transactions, currentMonth);
  const insights = [];

  // Calculate total spending and budget
  const totalSpent = Object.values(monthlySpending).reduce((sum, spent) => sum + spent, 0);
  const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);

  // Overall budget insight
  if (totalBudget > 0) {
    const percentage = (totalSpent / totalBudget) * 100;
    if (percentage > 100) {
      insights.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Over Budget',
        message: `You've exceeded your monthly budget by ₹${(totalSpent - totalBudget).toFixed(2)}`,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      });
    } else if (percentage > 80) {
      insights.push({
        type: 'warning',
        icon: AlertTriangle,
        title: 'Approaching Budget Limit',
        message: `You've used ${percentage.toFixed(1)}% of your monthly budget`,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      });
    } else {
      insights.push({
        type: 'success',
        icon: CheckCircle,
        title: 'On Track',
        message: `You've used ${percentage.toFixed(1)}% of your monthly budget`,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      });
    }
  }

  // Category-specific insights
  Object.entries(budgets).forEach(([category, budget]) => {
    if (budget > 0) {
      const spent = monthlySpending[category] || 0;
      const percentage = (spent / budget) * 100;
      
      if (percentage > 100) {
        insights.push({
          type: 'warning',
          icon: AlertTriangle,
          title: `${category} Over Budget`,
          message: `₹${(spent - budget).toFixed(2)} over your ₹${budget.toFixed(2)} budget`,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        });
      } else if (percentage > 90) {
        insights.push({
          type: 'warning',
          icon: AlertTriangle,
          title: `${category} Near Limit`,
          message: `${percentage.toFixed(1)}% of ₹${budget.toFixed(2)} budget used`,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        });
      }
    }
  });

  // Spending pattern insights
  const daysInMonth = new Date(currentMonth + '-01').getMonth() === new Date().getMonth() 
    ? new Date().getDate() 
    : new Date(new Date(currentMonth + '-01').getFullYear(), new Date(currentMonth + '-01').getMonth() + 1, 0).getDate();
  
  const daysElapsed = Math.min(daysInMonth, new Date().getDate());
  const monthProgress = (daysElapsed / daysInMonth) * 100;
  
  if (totalBudget > 0) {
    const spendingRate = (totalSpent / totalBudget) * 100;
    if (spendingRate > monthProgress + 10) {
      insights.push({
        type: 'warning',
        icon: TrendingUp,
        title: 'High Spending Rate',
        message: `You're spending faster than the month is progressing`,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      });
    }
  }

  // Top spending category
  const topCategory = Object.entries(monthlySpending)
    .sort(([,a], [,b]) => b - a)[0];
  
  if (topCategory && topCategory[1] > 0) {
    insights.push({
      type: 'info',
      icon: Target,
      title: 'Highest Spending',
      message: `${topCategory[0]} is your top spending category at ₹${topCategory[1].toFixed(2)}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    });
  }

  return insights;
}

export default function SpendingInsights({ transactions, budgets, currentMonth }) {
  const insights = getInsights(transactions, budgets, currentMonth);

  return (
    <div>
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-600" />
        <h2 className="text-xl font-semibold text-gray-800">Spending Insights</h2>
      </div>

      {insights.length > 0 ? (
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const IconComponent = insight.icon;
            return (
              <div 
                key={index}
                className={`${insight.bgColor} ${insight.borderColor} border rounded-lg p-4`}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${insight.color} mb-1`}>
                      {insight.title}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {insight.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Lightbulb className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 mb-2">No insights available yet</p>
          <p className="text-sm text-gray-400">
            Add transactions and set budgets to get personalized insights
          </p>
        </div>
      )}

      {/* Tips Section */}
      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
        <h3 className="font-semibold text-indigo-800 mb-3 flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Smart Tips</span>
        </h3>
        <ul className="space-y-2 text-sm text-indigo-700">
          <li>• Set realistic budgets for each category to track spending effectively</li>
          <li>• Review your spending patterns weekly to stay on track</li>
          <li>• Consider setting aside 20% of your income for savings</li>
          <li>• Use the budget comparison chart to identify overspending areas</li>
        </ul>
      </div>
    </div>
  );
} 