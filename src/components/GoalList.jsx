import React from "react";
import "./GoalList.css";

function GoalList({ goals, setGoals }) {
  if (!goals || !Array.isArray(goals) || goals.length === 0) {
    return <p className="no-goals">No goals to display.</p>;
  }

  function handleDelete(goalId) {
    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: "DELETE",
    })
      .then(() => {
        setGoals(prev => prev.filter(goal => goal.id !== goalId));
      })
      .catch(error => {
        console.error("Failed to delete goal:", error);
      });
  }

  return (
    <div className="goal-cards-container">
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
