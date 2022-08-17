import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import HomePage from './components/homepage/HomePage';
import Navbar from './components/Navigation/Navbar';
import Profile from './components/profile/Profile';
import Login from './components/Users/Login/Login';
import Register from './components/Users/Register/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/login' element={<Login />}/>

      </Routes>
    </Router>
  );
}

export default App;
