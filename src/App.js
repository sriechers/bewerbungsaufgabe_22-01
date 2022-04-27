import Dashboard from "./routes/Dashboard";
import ArticleDetails from "./routes/ArticleDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div id="notification-layer" />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/artikel/:id" element={<ArticleDetails />} />
      </Routes>
    </div>
  );
}

export default App;
