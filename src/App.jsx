import { useEffect, useState } from "react";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetch("http://localhost:3000/goals")
      .then((r) => r.json())
      .then(setGoals);
  }, []);

  return (
    <div className="app-container">
      <Sidebar active={activeTab} setActive={setActiveTab} />

      <div className="main-content">
        {activeTab === "overview" && <Dashboard goals={goals} />}
        {activeTab === "addGoal" && <GoalForm setGoals={setGoals} />}
        {activeTab === "deposit" && (
          <DepositForm goals={goals} setGoals={setGoals} />
        )}
        {activeTab === "allGoals" && (
          <GoalList goals={goals} setGoals={setGoals} />
        )}
      </div>
    </div>
  );
}

export default App;
