// src/components/Sidebar.jsx
import React from "react";

function Sidebar({ active, setActive }) {
  return (
    <div className="sidebar">
      <h2>Smart Goals</h2>
      <small>Savings Planner</small>

      <ul>
        <li
          className={active === "overview" ? "active" : ""}
          onClick={() => setActive("overview")}
        >
          Overview
        </li>
        <li
          className={active === "addGoal" ? "active" : ""}
          onClick={() => setActive("addGoal")}
        >
          Add Goal
        </li>
        <li
          className={active === "deposit" ? "active" : ""}
          onClick={() => setActive("deposit")}
        >
          Make Deposit
        </li>
        <li
          className={active === "allGoals" ? "active" : ""}
          onClick={() => setActive("allGoals")}
        >
          All Goals
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
