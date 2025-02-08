import { Link, useLocation } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar() {
  const location = useLocation();

  return (
    <div className="shadow-lg navbar bg-base-100">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="font-mono text-xl font-bold">TorrentHub</Link>
        </div>
        <div className="flex-none">
      

          {/* ========================================================= */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1 text-xl btn "><RxHamburgerMenu /></div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 py-4 px-3 shadow">
              <li className='my-1' ><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Search</Link></li>
              <li className='my-1' ><Link to="/trending" className={location.pathname === '/trending' ? 'active' : ''}>Trending</Link></li>
              <li className='my-1' ><Link to="/recent" className={location.pathname === '/recent' ? 'active' : ''}>Recent</Link></li>
              <li className='my-1' ><Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>Settings</Link></li>
            </ul>
          </div>
          {/* ========================================================= */}




        </div>
      </div>
    </div>
  );
}

export default Navbar;