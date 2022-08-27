import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AddNewCategory from './components/Categories/AddNewCategory';
import HomePage from './components/homepage/HomePage';
import Navbar from './components/Navigation/Navbar';
import Profile from './components/profile/Profile';
import Login from './components/Users/Login/Login';
import Register from './components/Users/Register/Register';
import CategoryList from './components/Categories/CategoryList';
import AdminDashboard from './components/homepage/AdminDashboard';
import UpdateCategory from './components/Categories/UpdateCategory';
import PrivateProtectRoute from './components/Navigation/ProtectedRoutes/PrivateProtectRoute';
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <Router>
      <Navbar />
    <Routes>
      <Route path='/update-category/:id' element={<UpdateCategory />}/>
      <Route path='/' element={<HomePage />}/>
      <Route path='/admin-dashboard' element={<AdminDashboard />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/login' element={<Login />}/>

      <Route element={<PrivateProtectRoute />}>
          <Route path='/category-list' element={<CategoryList />}/>

          <Route path='/add-category' element={<AddNewCategory />}/>
      </Route>
      
     <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </Router>
  );
}

export default App;
