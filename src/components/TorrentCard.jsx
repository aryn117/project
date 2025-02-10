function TorrentCard({ torrent }) {
  return (
    <div className="shadow-xl card bg-base-100">
     
      <div className="card-body">
        <h2 className="text-sm break-words card-title">{torrent.name || torrent.Name}</h2>
        <div className="flex gap-2 text-sm">
          <span className="text-lg badge badge-primary">{torrent.size}</span>
          <span className="text-lg badge badge-secondary">S: {torrent.seeders}</span>
          <span className="text-lg badge badge-accent">L: {torrent.leechers}</span>
        </div>
        <div className="justify-end mt-4 card-actions">
          <a href={torrent.magnet} className="btn btn-primary btn-sm">
            Magnet
          </a>
          <a href={torrent.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default TorrentCard;