import "./GoalList.css"; 

function GoalList({ goals, setGoals }) {
  return (
    <div className="goal-list">
      <h2>All Goals</h2>
      <div className="goal-grid">
        {goals.length === 0 ? (
          <p>No goals yet. Add one to get started!</p>
        ) : (
          goals.map((goal) => (
            <div className="goal-card" key={goal.id}>
              <div className="goal-header">
                <h3>{goal.name}</h3>
                <button onClick={() => handleDelete(goal.id)}>🗑</button>
              </div>

              <p className="category">{goal.category}</p>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${Math.min((goal.saved / goal.target) * 100, 100)}%`,
                  }}
                ></div>
              </div>

              <div className="goal-amounts">
                <span>${goal.saved.toLocaleString()}</span>
                <span>of ${goal.target.toLocaleString()}</span>
              </div>

              <div className="goal-meta">
                <p>
                  📅 Due: {new Date(goal.dueDate).toLocaleDateString()}
                </p>
                <p className="status">
                  {goal.saved >= goal.target
                    ? "✅ Goal Completed"
                    : `$${(goal.target - goal.saved).toLocaleString()} remaining`}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  function handleDelete(id) {
    fetch(`http://localhost:3000/goals/${id}`, { method: "DELETE" })
      .then(() => setGoals((prev) => prev.filter((g) => g.id !== id)));
  }
}

export default GoalList;
