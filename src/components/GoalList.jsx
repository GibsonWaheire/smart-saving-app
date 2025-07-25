import React, { useState } from "react";
import "./GoalList.css";
import { goalService } from "../services/goalService";

function GoalList({ goals, setGoals, onGoalUpdate }) {
  const [alert, setAlert] = useState("");
  if (!goals || !Array.isArray(goals) || goals.length === 0) {
    return <p className="no-goals">No goals to display.</p>;
  }

  async function handleDelete(goalId) {
    try {
      await goalService.deleteGoal(goalId);
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
      setAlert("🗑️ Goal deleted successfully!");
      if (onGoalUpdate) onGoalUpdate();
    } catch (error) {
      console.error("Failed to delete goal:", error);
      setAlert("❌ Failed to delete goal. Please try again.");
    }
  }

  return (
    <div className="goal-cards-container">
      {alert && (
        <div className="alert-success alert-floating" onClick={() => setAlert("")}>
          {alert} <span style={{cursor:'pointer',marginLeft:'1rem'}}>&times;</span>
        </div>
      )}
      {goals.map((goal) => (
        <div className="goal-card" key={goal.id}>
          <h3>{goal.name || "Unnamed Goal"}</h3>
          <span className="category">{goal.category || "Uncategorized"}</span>

          <div className="progress-bar-container">
            <label>Progress</label>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${(goal.savedAmount / goal.targetAmount) * 100}%` }}
              ></div>
            </div>
            <p>{Math.floor((goal.savedAmount / goal.targetAmount) * 100)}%</p>
          </div>

          <div className="amount-info">
            <p><strong>KES {goal.savedAmount?.toLocaleString() || "0"}</strong> of {goal.targetAmount?.toLocaleString() || "0"}</p>
            <p className="remaining">KES {(goal.targetAmount - goal.savedAmount)?.toLocaleString() || "0"} remaining</p>
          </div>

          <div className="deadline">
            <p>📅 {goal.deadline ? `Due ${new Date(goal.deadline).toLocaleDateString()}` : "No deadline"}</p>
          </div>

          <button className="delete-button" onClick={() => handleDelete(goal.id)}>🗑️ Delete</button>
        </div>
      ))}
    </div>
  );
}

export default GoalList;
