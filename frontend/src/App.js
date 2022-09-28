import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";
import HomePage from "./components/homepage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Profile from "./components/Users/profile/Profile";
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
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import UploadProfilePhoto from "./components/Users/profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/profile/UpdateUserProfileForm";
import SendEmail from "./components/Users/Emailing/SendEmail";
import AccountVerified from "./components/Users/accountVerification/AccountVerified";
import UsersList from "./components/Users/usersList/UsersList";
import UpdatePassword from "./components/Users/passwordManagement/UpdatePassword";
import ResetPasswordForm from "./components/Users/passwordManagement/ResetPasswordForm";
import ResetPassword from './components/Users/passwordManagement/ResetPassword'
import Footer from "./Footer/Footer";
import ProfilePage from "./components/Users/profile/ProfilePage";


function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="507279023832-b05kjqsa5j15djvs8f7ckgpb5d7ids2q.apps.googleusercontent.com">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/post-details/:id" element={<PostDetails />} />
            {/* <Route path="/user-profile" element={<UserProfile />} /> */}

            <Route element={<AdminProtectRoute />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="category-list" element={<CategoryList />} />
    
                <Route path="/update-category/:id" element={<UpdateCategory />} />
                <Route path="add-category" element={<AddNewCategory />} />
                <Route path='send-email' element={<SendEmail />}/>
                <Route path='/users' element={<UsersList />}/>

            </Route>

            <Route
              path="/create-post"
              element={
                <UserProtectedRoute>
                  <CreatePost />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/update-post/:id"
              element={
                <UserProtectedRoute>
                  <UpdatePost />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/upload-profile-photo/:id"
              element={
                <UserProtectedRoute>
                  <UploadProfilePhoto />
                </UserProtectedRoute>
              }
            />

            <Route
              path="/update-profile/:id"
              element={
                <UserProtectedRoute>
                  <UpdateProfileForm />
                </UserProtectedRoute>
              }
            />

            <Route
              path="/update-comment/:id"
              element={
                <UserProtectedRoute>
                  <UpdateComment />
                </UserProtectedRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <UserProtectedRoute>
                  <ProfilePage />
                </UserProtectedRoute>
              }
            />

            <Route
              path="/verify-account/:token"
              element={
                <UserProtectedRoute>
                  <AccountVerified />
                </UserProtectedRoute>
              }
            />

<Route
              path="/update-password"
              element={
                <UserProtectedRoute>
                  <UpdatePassword />
                </UserProtectedRoute>
              }
            />

           
            <Route path="password-reset-token" element={<ResetPasswordForm />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />



            {/* <Route path ='/add-post' element={<AddPost />}/> */}
            <Route path="/post-list" element={<PostsList />}/>
            <Route path="*" element={<PageNotFound />} />
          </Routes>


          <Footer />
        </Router>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
