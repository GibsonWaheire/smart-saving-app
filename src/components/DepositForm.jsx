

import React, { useState } from "react";
import "./DepositForm.css";

function DepositForm({ goals, setGoals }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("success");

  function handleSubmit(e) {
    e.preventDefault();
    const goal = goals.find((g) => g.id == selectedGoalId);
    if (!goal) {
      setAlertType("error");
      setAlert("Please select a valid goal.");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setAlertType("error");
      setAlert("Please enter a valid deposit amount.");
      return;
    }
    if (goal.savedAmount >= goal.targetAmount) {
      setAlertType("error");
      setAlert("You cannot deposit to a completed goal.");
      return;
    }
    if (Number(goal.savedAmount) + Number(amount) > Number(goal.targetAmount)) {
      setAlertType("error");
      setAlert("Deposit exceeds the target amount for this goal.");
      return;
    }
    const updatedGoal = {
      ...goal,
      savedAmount: Number(goal.savedAmount || 0) + Number(amount),
    };
    fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    })
      .then((r) => r.json())
      .then(() => {
        fetch("http://localhost:3000/goals")
          .then((r) => r.json())
          .then((data) => setGoals(data));
        setAlertType("success");
        setAlert("Deposit added successfully!");
      });
    setSelectedGoalId("");
    setAmount("");
  }

  return (
    <div className="deposit-form-container">
      {alert && (
        <div className={`alert-floating ${alertType === "error" ? "alert-error" : "alert-success"}`} onClick={() => setAlert("")}>{alert} <span style={{cursor:'pointer',marginLeft:'1rem'}}>&times;</span></div>
      )}
      <h2 className="deposit-title">Make a Deposit</h2>
      <p className="deposit-subtitle">
        Add funds to your savings goals and track your progress
      </p>
      <form className="deposit-form" onSubmit={handleSubmit}>
        <label>
          🏁 Select Goal
          <select
            value={selectedGoalId}
            onChange={(e) => setSelectedGoalId(e.target.value)}
          >
            <option value="">Choose a goal to deposit to</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          💵 Deposit Amount
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <button type="submit">📈 Add Deposit</button>
      </form>
      <div className="deposit-tips">
        <h3>💡 Deposit Tips</h3>
        <ul>
          <li>Make regular deposits to build momentum</li>
          <li>Consider setting up automatic transfers</li>
          <li>Celebrate milestones along the way</li>
          <li>Track your progress weekly or monthly</li>
        </ul>
      </div>
    </div>
  );
}

export default DepositForm;
