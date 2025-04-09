import { useUser } from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

function DashboardLayout({ children, activeMenu }) {
  const { user } = useUser();
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-lg:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-2 md:mx-5"> {children}</div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
