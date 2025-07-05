# Personal Finance Visualizer

A beautiful, modern web application for tracking personal finances, built with the MERN stack (React + Vite + Tailwind CSS for frontend, Express + MongoDB for backend structure). **No authentication required.**

## Features

### Stage 1: Basic Transaction Tracking
- Add/Edit/Delete transactions (amount, date, description)
- Transaction list view
- Monthly expenses bar chart
- Basic form validation

### Stage 2: Categories & Analytics
- Predefined categories for transactions
- Category-wise pie chart
- Dashboard with summary cards: total expenses, category breakdown, most recent transactions

### Stage 3: Budgeting & Insights
- Set monthly category budgets
- Budget vs actual comparison chart
- Simple spending insights
- Enhanced UI/UX with whitespace, icons, gradients, and beautiful colors
- Responsive design

## Demo Data
- **Static dummy data** is used for demo purposes and is located in `client/src/dummyData.js`.
- A copy of the dummy data is also available in `server/dummyData.js` for reference.
- The app currently loads and displays all data from the client-side dummy data file.

## Getting Started

1. **Install dependencies:**
   ```bash
   cd client
   npm install
   ```
2. **Run the frontend:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

## Folder Structure

```
client/   # Frontend (React + Vite + Tailwind)
  src/
    components/
    dummyData.js   # Static demo data used in the app
server/   # Backend (Express + MongoDB structure)
  dummyData.js     # Reference copy of demo data
```

## Notes
- All data is currently static and loaded from the client folder for demo purposes.
- No authentication or login is implemented.
- For evaluation, all features are visible and functional with the provided dummy data.

---

**Enjoy your personal finance journey!** 