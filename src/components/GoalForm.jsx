

import React, { useState, useEffect } from "react";
import "./GoalForm.css";
import { goalService } from "../services/goalService";

function GoalForm({ setGoals, goal, onClose, onGoalUpdate }) {
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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (goal) {
        // Update existing goal
        const updatedGoal = await goalService.updateGoal(goal.id, {
          name,
          targetAmount: parseFloat(targetAmount),
          category,
          deadline,
        });
        
        // Transform the updated goal to match expected format
        const transformedGoal = {
          id: updatedGoal.id,
          name: updatedGoal.name,
          targetAmount: parseFloat(updatedGoal.target_amount),
          savedAmount: parseFloat(updatedGoal.saved_amount),
          category: updatedGoal.category,
          deadline: updatedGoal.deadline,
          createdAt: updatedGoal.created_at
        };
        
        setGoals((prev) => prev.map((g) => (g.id === transformedGoal.id ? transformedGoal : g)));
        setAlert("Goal updated successfully!");
        if (onClose) onClose();
        if (onGoalUpdate) onGoalUpdate();
      } else {
        // Create new goal
        const newGoal = await goalService.createGoal({
          name,
          targetAmount: parseFloat(targetAmount),
          category,
          deadline,
          savedAmount: 0,
        });
        
        // Transform the new goal to match expected format
        const transformedGoal = {
          id: newGoal.id,
          name: newGoal.name,
          targetAmount: parseFloat(newGoal.target_amount),
          savedAmount: parseFloat(newGoal.saved_amount),
          category: newGoal.category,
          deadline: newGoal.deadline,
          createdAt: newGoal.created_at
        };
        
        setGoals((prev) => [...prev, transformedGoal]);
        setName("");
        setTargetAmount("");
        setCategory("");
        setDeadline("");
        setAlert("Goal created successfully!");
        if (onGoalUpdate) onGoalUpdate();
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      setAlert("Failed to save goal. Please try again.");
    }
  }

  async function handleDelete() {
    if (!goal) return;
    try {
      await goalService.deleteGoal(goal.id);
      setGoals((prev) => prev.filter((g) => g.id !== goal.id));
      setAlert("Goal deleted successfully!");
      if (onClose) onClose();
      if (onGoalUpdate) onGoalUpdate();
    } catch (error) {
      console.error('Error deleting goal:', error);
      setAlert("Failed to delete goal. Please try again.");
    }
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
