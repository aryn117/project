import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  return (
    <div className="relative shadow-lg navbar bg-base-100">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="font-mono text-xl font-bold">TorrentHub</Link>
        </div>
        <div className="flex-none">
        <details>
          <summary className='text-xl cursor-pointer' >Menu</summary>
          <ul class="bg-base-100  rounded-t-none absolute right-5 p-2">          
            <li className='px-2 py-1 my-1 rounded-md bg-base-200 hover:bg-base-300' ><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Search</Link></li>
            <li className='px-2 my-1 rounded-md y-1 a bg-base-200 hover:bg-base-300' ><Link to="/trending" className={location.pathname === '/trending' ? 'active' : ''}>Trending</Link></li>
            <li className='px-2 py-1 my-1 rounded-md bg-base-200 hover:bg-base-300' ><Link to="/recent" className={location.pathname === '/recent' ? 'active' : ''}>Recent</Link></li>
            <li className='px-2 py-1 my-1 rounded-md bg-base-200 hover:bg-base-300' ><Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>Settings</Link></li>
         
          </ul>
        </details>
         
        </div>
      </div>
    </div>
  );
}

export default Navbar;