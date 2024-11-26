import React from "react";
import StockTable from "./components/StockTable";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <StockTable />
    </div>
  );
};

export default App;
