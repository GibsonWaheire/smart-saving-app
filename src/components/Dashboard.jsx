// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import "./Dashboard.css";

function Dashboard({ goals }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!goals || goals.length === 0) {
      setLoading(true);
      fetch("http://localhost:3000/goals")
        .then((r) => r.json())
        .then(() => setLoading(false))
        .catch(() => {
          setError("Failed to load goals. Please try again later.");
          setLoading(false);
        });
    }
  }, [goals]);

  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completed = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  // Only include goals with a valid, non-zero targetAmount
  const validGoals = goals.filter(g => Number(g.targetAmount) > 0);
  const averageProgress =
    validGoals.length > 0
      ? Math.round(
          validGoals.reduce((sum, g) => sum + g.savedAmount / g.targetAmount, 0) /
            validGoals.length *
            100
        )
      : 0;

  return (
    <div className="dashboard">
      {loading && <div className="spinner"></div>}
      {error && <div className="alert-error">{error}</div>}
      <h1>Dashboard Overview</h1>
      <p className="subtitle">Track your savings progress and achievements</p>

      <div className="card-grid">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <div className="value">{totalGoals}</div>
        </div>
        <div className="stat-card">
          <h3>Total Saved</h3>
          <div className="value">KES {totalSaved.toLocaleString()}</div>
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
          <div className="activity-grid">
            {goals.map((goal) => {
              const validTarget = Number(goal.targetAmount) > 0;
              const percent = validTarget ? Math.min(Math.round((goal.savedAmount / goal.targetAmount) * 100), 100) : 0;
              const isComplete = percent === 100;
              const circleRadius = 20;
              const circleCircumference = 2 * Math.PI * circleRadius;
              const strokeDashoffset = validTarget ? (circleCircumference * (1 - percent / 100)).toString() : circleCircumference.toString();
              return (
                <div className="goal-item" key={goal.id}>
                  <h4>
                    {goal.name} {isComplete && <span style={{ color: '#10b981', fontSize: '1rem' }}>✔️</span>}
                  </h4>
                  <div className="circular-progress-container">
                    <svg className="circular-progress" width="60" height="60" viewBox="0 0 48 48">
                      <circle
                        className="circular-bg"
                        cx="24" cy="24" r="20"
                        fill="none" stroke="#e2e8f0" strokeWidth="6"
                      />
                      <circle
                        className="circular-bar"
                        cx="24" cy="24" r="20"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="6"
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                      <text x="24" y="28" textAnchor="middle" fontSize="1rem" fill="#065f46">{percent}%</text>
                    </svg>
                  </div>
                  <div className="details">
                    KES {goal.savedAmount?.toLocaleString()} / {goal.targetAmount?.toLocaleString()} — {percent}% complete
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
