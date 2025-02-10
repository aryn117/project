import { Link, useLocation } from 'react-router-dom';
import { RiSettingsLine } from "react-icons/ri";

function Navbar() {
  const location = useLocation();

  return (
    <div className="shadow-lg navbar bg-base-100">
      <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between w-full ">
          <Link to="/" className="btn btn-square btn-outline ">
          <img className='w-8 md:w-12' src="./navbar_icon.png" alt="" />
          </Link>
          <Link to="/settings" className="text-xl md:text-2xl  btn btn-square btn-outline ">
            <RiSettingsLine  />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Navbar;