import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function getMonthlyTotals(transactions) {
  const monthly = {};
  transactions.forEach(({ amount, date }) => {
    const month = date.slice(0, 7); // YYYY-MM
    monthly[month] = (monthly[month] || 0) + amount;
  });
  return monthly;
}

export default function MonthlyExpensesChart({ transactions }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const monthlyTotals = getMonthlyTotals(transactions);
    const labels = Object.keys(monthlyTotals).sort();
    const data = labels.map((m) => monthlyTotals[m]);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Monthly Expenses',
            data,
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Amount (₹)' },
          },
          x: {
            title: { display: true, text: 'Month' },
          },
        },
      },
    });
    // Cleanup
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [transactions]);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Monthly Expenses</h2>
      <canvas ref={chartRef} height={200}></canvas>
    </div>
  );
} 