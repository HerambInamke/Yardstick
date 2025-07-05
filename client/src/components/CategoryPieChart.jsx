import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function getCategoryTotals(transactions) {
  const categoryTotals = {};
  transactions.forEach(({ amount, category }) => {
    const cat = category || 'Uncategorized';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
  });
  return categoryTotals;
}

export default function CategoryPieChart({ transactions }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    
    const categoryTotals = getCategoryTotals(transactions);
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (labels.length === 0) {
      return;
    }

    // Generate colors for each category
    const colors = [
      '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
      '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6B7280'
    ];

    chartInstance.current = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors.slice(0, labels.length),
            borderWidth: 2,
            borderColor: '#fff',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return `${context.label}: ₹${context.parsed.toFixed(2)} (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
        <div className="text-gray-500 text-center py-8">No transactions to display</div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Category Breakdown</h2>
      <canvas ref={chartRef} height={300}></canvas>
    </div>
  );
} 