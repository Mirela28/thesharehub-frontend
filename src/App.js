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
import ItemPost from './pages/ItemPost';
import Requests from './pages/Requests';
import AccountPage from './pages/AccountPage';
import Footer from './components/layout/Footer';

function App() {
  const location = useLocation();
  const hideNavContent = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      <UserProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar hideContent={hideNavContent} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/createitem" element={<CreateItem />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/browseitems" element={<BrowseItems />} />
            <Route path="/itempost/:id" element={<ItemPost />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/accountpage/:id" element={<AccountPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </UserProvider>
    </div>
  );
}

export default App;
