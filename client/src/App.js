import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './Pages/MainPage.js';
import Login from './Pages/Login.js';
import Signup from './Pages/Signup.js';
import { useAuth } from './Context/AuthContext.js';
import SearchBar from './Components/SearchBar.js';

function App() {
  const [auth, setAuth] = useAuth();

  function handleLogout() {
    setAuth({ ...auth, user: null, token: '' });
    localStorage.removeItem('user');
  }

  return (
    <Router>

      {
        auth.user ? (
          <div className='navbar'>
            <Link to='/'><button  className='navbar-home-btn'>Home</button></Link>
            <button className='navbar-logout-btn' onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className='navbar'>
            <Link className='navbar-btn' to='/login'><button>Login</button></Link>
            <Link className='navbar-btn' to='/signup'><button>Signup</button></Link>
          </div>
        )
      }



      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/searchpage' element={<SearchBar />} />

      </Routes>

    </Router>
  );
}

export default App;