function TorrentCard({ torrent }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      {torrent.poster && (
        <figure>
          <img src={torrent.poster} alt={torrent.name} className="w-full h-48 object-cover" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title text-sm">{torrent.name}</h2>
        <div className="flex gap-2 text-sm">
          <span className="badge badge-primary">{torrent.size}</span>
          <span className="badge badge-secondary">S: {torrent.seeders}</span>
          <span className="badge badge-accent">L: {torrent.leechers}</span>
        </div>
        <div className="card-actions justify-end mt-4">
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