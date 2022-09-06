import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";
import HomePage from "./components/homepage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Profile from "./components/profile/Profile";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";
import AdminDashboard from "./components/homepage/AdminDashboard";
import UpdateCategory from "./components/Categories/UpdateCategory";
import AdminProtectRoute from "./components/Navigation/ProtectedRoutes/AdminProtectRoute";
import PageNotFound from "./components/PageNotFound";
import CreatePost from "./components/Posts/CreatePost";
import UserProtectedRoute from "./components/Navigation/ProtectedRoutes/UserProtectedRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPost from "./components/Posts/AddPost";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="507279023832-b05kjqsa5j15djvs8f7ckgpb5d7ids2q.apps.googleusercontent.com">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />

              <Route path="/" element={<HomePage />} />
            <Route element={<AdminProtectRoute />}>
              <Route path="category-list" element={<CategoryList />} />

              <Route path="/update-category/:id" element={<UpdateCategory />} />
              <Route path="add-category" element={<AddNewCategory />} />
            </Route>

            <Route
              path="/create-post"
              element={
                <UserProtectedRoute>
                  <CreatePost />
                </UserProtectedRoute>
              }
            />

            {/* <Route path ='/add-post' element={<AddPost />}/> */}

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
