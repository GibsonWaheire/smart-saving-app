// src/components/Dashboard.jsx
import React from "react";

function Dashboard({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter((g) => g.savedAmount >= g.targetAmount).length;
  const averageProgress =
    totalGoals > 0
      ? Math.round(
          goals.reduce((sum, g) => sum + g.savedAmount / g.targetAmount, 0) /
            totalGoals *
            100
        )
      : 0;

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <p className="subtitle">Track your savings progress and achievements</p>

      <div className="card-grid">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <div className="value">{totalGoals}</div>
        </div>
        <div className="stat-card">
          <h3>Total Saved</h3>
          <div className="value">${totalSaved.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <h3>Completed Goals</h3>
          <div className="value">{completed}</div>
        </div>
        <div className="stat-card">
          <h3>Average Progress</h3>
          <div className="value">{averageProgress}%</div>
        </div>
      </div>

      <div className="goal-activity">
        <h2>Recent Goals Activity</h2>
        {goals.length === 0 ? (
          <p>No goals yet.</p>
        ) : (
          goals.map((goal) => {
            const percent = Math.min(
              Math.round((goal.savedAmount / goal.targetAmount) * 100),
              100
            );
            const isComplete = percent === 100;

            return (
              <div className="goal-item" key={goal.id}>
                <h4>
                  {goal.name}{" "}
                  {isComplete && (
                    <span style={{ color: "green", fontSize: "1rem" }}>✔️</span>
                  )}
                </h4>
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <div className="details">
                  ${goal.savedAmount} / ${goal.targetAmount} — {percent}%
                  complete
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Dashboard;
