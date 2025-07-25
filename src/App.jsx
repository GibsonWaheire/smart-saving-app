import { useEffect, useState } from "react";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";
import GoalForm from "./components/GoalForm";
import DepositForm from "./components/DepositForm";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { goalService } from "./services/goalService";

function App() {
  const [goals, setGoals] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await goalService.getAllGoals();
      // Transform the data to match the expected format
      const transformedGoals = data.map(goal => ({
        id: goal.id,
        name: goal.name,
        targetAmount: parseFloat(goal.target_amount),
        savedAmount: parseFloat(goal.saved_amount),
        category: goal.category,
        deadline: goal.deadline,
        createdAt: goal.created_at
      }));
      setGoals(transformedGoals);
    } catch (err) {
      setError('Failed to load goals');
      console.error('Error loading goals:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>Loading goals...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="main-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ color: 'red' }}>{error}</div>
        </div>
      </div>
    );
  }

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
