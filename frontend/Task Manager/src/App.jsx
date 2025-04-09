import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import PrivateRoute from './routes/PrivateRoute';
import ManageTasks from './pages/Admin/ManageTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';

import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
import { UserProvider, useUser } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/tasks" element={<ManageTasks />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/users" element={<ManageUsers />} />
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/my-tasks" element={<MyTasks />} />
              <Route
                path="/user/task-details/:id"
                element={<ViewTaskDetails />}
              />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className: '',
          style: {
            fontSize: '13px',
          },
        }}
      />
    </UserProvider>
  );
}

function Root() {
  const { user, loading } = useUser();
  if (loading) return <Outlet />;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return user?.role === 'admin' ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
}

export default App;
