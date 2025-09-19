import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const location = useLocation();

  const hideNavContent = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      
      <Navbar hideContent={hideNavContent} />

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

    </div>
  );
}

export default App;
