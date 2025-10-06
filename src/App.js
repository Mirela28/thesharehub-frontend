import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './index.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const location = useLocation();

  const hideNavContent = location.pathname === '/login' || location.pathname === '/register';

    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);
  
    //prevent rendering before user authentication check
    useEffect(() => {
      const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/me', {
        withCredentials: true
      });

      if (response.data.authenticated) {
        setUser(response.data.user);
      } else {
        setUser(null); 
      }
    } catch (error) {
      setUser(null);
    } finally  {
      setLoading(false);
    }
  };

  fetchUser();
}, []);

    if(loading) return <div>Loading...</div>

  return (
    <div className="App">
      
      <Navbar hideContent={hideNavContent} user={user} setUser={setUser} />

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>

    </div>
  );
}

export default App;
