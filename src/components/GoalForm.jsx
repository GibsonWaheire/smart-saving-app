

import React, { useState, useEffect } from "react";
import "./GoalForm.css";

function GoalForm({ setGoals, goal, onClose }) {
  const [name, setName] = useState(goal ? goal.name : "");
  const [targetAmount, setTargetAmount] = useState(goal ? goal.targetAmount : "");
  const [category, setCategory] = useState(goal ? goal.category : "");
  const [deadline, setDeadline] = useState(goal ? goal.deadline : "");
  const [alert, setAlert] = useState("");
  const [savedAmount, setSavedAmount] = useState(goal ? goal.savedAmount : 0);

  useEffect(() => {
    if (goal) {
      setName(goal.name);
      setTargetAmount(goal.targetAmount);
      setCategory(goal.category);
      setDeadline(goal.deadline);
      setSavedAmount(goal.savedAmount);
    }
  }, [goal]);

  function handleSubmit(e) {
    e.preventDefault();
    if (goal) {
      // Update existing goal
      const updatedGoal = {
        ...goal,
        name,
        targetAmount: parseFloat(targetAmount),
        category,
        deadline,
      };
      fetch(`http://localhost:3000/goals/${goal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGoal),
      })
        .then((r) => r.json())
        .then((updated) => {
          setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
          setAlert("Goal updated successfully!");
          if (onClose) onClose();
        });
    } else {
      // Create new goal
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
          setAlert("Goal created successfully!");
        });
    }
  }

  function handleDelete() {
    if (!goal) return;
    fetch(`http://localhost:3000/goals/${goal.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setGoals((prev) => prev.filter((g) => g.id !== goal.id));
        setAlert("Goal deleted successfully!");
        if (onClose) onClose();
      })
      .catch((error) => {
        setAlert("Failed to delete goal.");
      });
  }

  const percent = targetAmount ? Math.min(Math.round((savedAmount / targetAmount) * 100), 100) : 0;
  const remaining = targetAmount ? Math.max(targetAmount - savedAmount, 0) : 0;

  return (
    <div className="goal-form-container">
      {alert && (
        <div className="alert-success alert-floating" onClick={() => setAlert("")}>{alert} <span style={{cursor:'pointer',marginLeft:'1rem'}}>&times;</span></div>
      )}
      <h2 className="goal-title">{goal ? "Edit Goal" : "Create New Goal"}</h2>
      <p className="goal-subtitle">
        {goal ? "Update your savings goal details" : "Set up a new savings goal to track your progress"}
      </p>
      {goal && (
        <div className="progress-bar-container">
          <label>Progress</label>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${percent}%`, background: "linear-gradient(90deg, #10b981 0%, #34d399 100%)" }}
            ></div>
          </div>
          <p>{percent}%</p>
          <div className="amount-info">
            <p><strong>KES {savedAmount?.toLocaleString() || "0"}</strong> of {targetAmount?.toLocaleString() || "0"}</p>
            <p className="remaining">KES {remaining?.toLocaleString() || "0"} remaining</p>
          </div>
        </div>
      )}
      <form className="goal-form" onSubmit={handleSubmit}>
        <label>
          💡 Goal Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Emergency Fund, Vacation to Japan"
            style={{ borderColor: "#10b981" }}
          />
        </label>
        <label>
          💰 Target Amount
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="10000"
            style={{ borderColor: "#10b981" }}
          />
        </label>
        <label>
          📂 Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ borderColor: "#10b981" }}
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
            style={{ borderColor: "#10b981" }}
          />
        </label>
        <button type="submit" style={{ background: "#10b981" }}>{goal ? "Update Goal" : "🎯 Create Savings Goal"}</button>
        {goal && (
          <button type="button" className="delete-button" style={{ marginTop: 16 }} onClick={handleDelete}>🗑️ Delete Goal</button>
        )}
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
