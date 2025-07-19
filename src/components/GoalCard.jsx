import React from "react";

function GoalCard({ goal, setGoals }) {
  const percent = Math.min(
    Math.round((goal.savedAmount / goal.targetAmount) * 100),
    100
  );

  function handleDelete() {
    fetch(`http://localhost:3000/goals/${goal.id}`, { method: "DELETE" }).then(
      () => setGoals((prev) => prev.filter((g) => g.id !== goal.id))
    );
  }

  return (
    <div className="goal-card">
      <h3>{goal.name}</h3>
      <p>${goal.savedAmount} / ${goal.targetAmount}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${percent}%` }}></div>
      </div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default GoalCard;