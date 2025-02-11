import { Link, useLocation } from 'react-router-dom';
import { RiSettingsLine } from "react-icons/ri";

function Navbar() {
  const location = useLocation();

  return (
    <div className="shadow-md navbar bg-base-100">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between w-full ">
          <Link to="/" className="flex flex-row p-1 items-center justify-between  md:p-2  ">
          <img className='w-6 md:w-8 mr-2 pt-1' src="./navbar_icon.png" alt="" />
          TorHopper
          </Link>
          <Link to="/settings" className="text-xl font-bold md:text-2xl  btn btn-square ">
            <RiSettingsLine  />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Navbar;