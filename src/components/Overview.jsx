import React from "react";

function Overview({ goals }) {
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.savedAmount >= g.targetAmount);

  return (
    <div>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Goals Completed: {completedGoals.length}</p>
      {/* Optional: time left logic with warnings */}
    </div>
  );
}

export default Overview;