import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="text-xl font-mono font-bold">TorrentHub</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 font-mono">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Search</Link></li>
            <li><Link to="/trending" className={location.pathname === '/trending' ? 'active' : ''}>Trending</Link></li>
            <li><Link to="/recent" className={location.pathname === '/recent' ? 'active' : ''}>Recent</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;