import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import LandingPage from './components/LandingPage';
import MainApp from './components/MainApp';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (tokenResponse) => {
    // In a real app, you'd verify this token with your backend
    // For this demo, we'll fetch user info using the access token

    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
    })
      .then(res => res.json())
      .then(userInfo => {
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
      })
      .catch(err => console.error('Failed to fetch user info:', err));
  };

  const handleLoginError = () => {
    console.error('Login Failed');
    alert('Login Failed. Please try again.');
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/app" replace /> : <LandingPage onSuccess={handleLoginSuccess} onError={handleLoginError} />
          }
        />
        <Route
          path="/app"
          element={
            <ProtectedRoute user={user}>
              <MainApp user={user} onLogout={handleLogout} onUserUpdate={handleUserUpdate} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;