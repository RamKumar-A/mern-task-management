import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import { useState } from 'react';

function Navbar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState();
  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-2 md:px-7 sticky">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <h2 className="text-lg font-medium text-black">Task Manager</h2>
      {openSideMenu && (
        <div className="fixed z-[100] top-[61px] md:-ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
