import { Outlet } from 'react-router-dom';

function PrivateRoute({ allowedRoles }) {
  console.log(allowedRoles);
  return <Outlet />;
}

export default PrivateRoute;
