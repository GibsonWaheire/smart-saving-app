

import React, { useState } from "react";
import "./DepositForm.css";
import { goalService } from "../services/goalService";

function DepositForm({ goals, setGoals, onGoalUpdate }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("success");

  async function handleSubmit(e) {
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
    
    try {
      const newSavedAmount = Number(goal.savedAmount || 0) + Number(amount);
      await goalService.updateSavedAmount(goal.id, newSavedAmount);
      
      // Update local state
      const updatedGoals = goals.map(g => 
        g.id === goal.id 
          ? { ...g, savedAmount: newSavedAmount }
          : g
      );
      setGoals(updatedGoals);
      
      setAlertType("success");
      setAlert("Deposit added successfully!");
      if (onGoalUpdate) onGoalUpdate();
    } catch (error) {
      console.error('Error adding deposit:', error);
      setAlertType("error");
      setAlert("Failed to add deposit. Please try again.");
    }
    
    setSelectedGoalId("");
    setAmount("");
  }

  return (
    <div
      className="deposit-form-container"
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
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
