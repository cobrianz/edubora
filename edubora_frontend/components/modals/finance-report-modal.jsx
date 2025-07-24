import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "../ui/dialog";
import { Button } from "../ui/button";
import { Table } from "../ui/table";
import { DatePickerWithRange } from "../ui/date-range-picker";

const mockTransactions = [
  { date: "2024-06-01", description: "Tuition Fee", category: "Income", amount: 5000 },
  { date: "2024-06-02", description: "Library Books", category: "Expense", amount: -300 },
  { date: "2024-06-03", description: "Uniform Sales", category: "Income", amount: 800 },
  { date: "2024-06-04", description: "Sports Equipment", category: "Expense", amount: -450 },
];

function getSummary(transactions) {
  const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
  return { income, expenses: Math.abs(expenses), net: income + expenses };
}

export default function FinanceReportModal({ open, onClose }) {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  // Filter logic can be added here
  const summary = getSummary(mockTransactions);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>Finance Report</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: 16 }}>
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} />
        </div>
        <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
          <div><strong>Total Income:</strong> ${summary.income}</div>
          <div><strong>Total Expenses:</strong> ${summary.expenses}</div>
          <div><strong>Net Balance:</strong> ${summary.net}</div>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((t, i) => (
              <tr key={i}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.category}</td>
                <td style={{ color: t.amount < 0 ? "red" : "green" }}>
                  {t.amount < 0 ? "-" : "+"}${Math.abs(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => window.print()}>Print</Button>
        <Button onClick={() => alert("Exported as CSV!")}>Export CSV</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
} 