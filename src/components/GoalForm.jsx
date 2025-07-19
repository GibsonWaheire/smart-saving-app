

import React, { useState } from "react";
import "./GoalForm.css";

function GoalForm({ setGoals }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();


    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline,
      savedAmount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    })
      .then((r) => r.json())
      .then((newGoal) => {
        setGoals((prev) => [...prev, newGoal]);
        setName("");
        setTargetAmount("");
        setCategory("");
        setDeadline("");
      });
  }

  return (
    <div className="goal-form-container">
      <h2 className="goal-title">Create New Goal</h2>
      <p className="goal-subtitle">
        Set up a new savings goal to track your progress
      </p>

      <form className="goal-form" onSubmit={handleSubmit}>
        <label>
          💡 Goal Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Emergency Fund, Vacation to Japan"
          />
        </label>

        <label>
          💰 Target Amount
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="10000"
          />
        </label>

        <label>
          📂 Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
            <option value="Education">Education</option>
            <option value="Car">Car</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
        📅 Deadline
          <input
            type="date"
                value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>

        <button type="submit">🎯 Create Savings Goal</button>
      </form>

      <div className="goal-tips">
        <h3>🎓 Tips for Setting Great Goals</h3>
        <ul>
          <li>Make your goals specific and measurable</li>
          <li>Set realistic deadlines that motivate you</li>
          <li>Break large goals into smaller milestones</li>
          <li>Choose meaningful categories to track your progress</li>
        </ul>
      </div>
    </div>
  );
}

export default GoalForm;
