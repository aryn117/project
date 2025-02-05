import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  return (
    <div className="shadow-lg navbar bg-base-100">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="font-mono font-bold text-primary text-md md:text-xl">Tor-Hopper</Link>
        </div>
        <div className="flex-none">
          <ul className="px-1 font-mono menu menu-horizontal">
            <li className='mr-1 text-sm md:mr-2 md:text-lg' ><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Search</Link></li>
            <li className='mr-1 text-sm md:mr-2 md:text-lg'><Link to="/trending" className={location.pathname === '/trending' ? 'active' : ''}>Trending</Link></li>
            <li className='mr-1 text-sm md:mr-2 md:text-lg'><Link to="/recent" className={location.pathname === '/recent' ? 'active' : ''}>Recent</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;