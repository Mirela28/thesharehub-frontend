import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserProvider } from './contexts/UserContext';
import Account from './pages/Account';
import CreateItem from './pages/CreateItem'
import Categories from './pages/Categories';
import BrowseItems from './pages/BrowseItems';

function App() {
  const location = useLocation();
  const hideNavContent = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      <UserProvider>
      <Navbar hideContent={hideNavContent} />

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/createitem" element={<CreateItem />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/browseitems" element={<BrowseItems />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
