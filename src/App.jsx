import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("JohnDoe");

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} username={username} />
      <Routes>
        <Route exact path="/" element={<Index isAuthenticated={isAuthenticated} onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
