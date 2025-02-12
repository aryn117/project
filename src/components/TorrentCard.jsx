import {useSettings} from "../contexts/settingsContext";

function TorrentCard({ torrent }) {
  const { settings } = useSettings();

  const torrentName = torrent.name || torrent.Name;
  const torrentSize = torrent.size;
  const torrentSeeders = torrent.seeders;
  const torrentLeechers = torrent.leechers;
  const torrentDateUploaded = torrent.dateuploaded;

  switch (settings.resultLayout) {
    case "list":
      return (
        <div className="flex flex-col bg-base-300 p-2 py-4 rounded-md mb-1">
          <h2 className="text-sm truncate">{torrentName}</h2>
        </div>
      );

    case "compact-card":
      return (
        <div className="flex flex-col bg-base-300 p-2 py-4 rounded-md mb-1">
          <h2 className="text-sm truncate">{torrentName}</h2>
          <div className="flex text-sm my-1 md:my-2 w-full">
            <span className="text-sm mr-1 badge badge-primary">{torrentSize}</span>
            <span className="text-sm mr-1 badge badge-secondary">
              S: {torrentSeeders}
            </span>
            <span className="text-sm mr-1 badge badge-accent">
              L: {torrentLeechers}
            </span>
            <span className="text-sm mr-1 badge badge-info">
              {torrentDateUploaded}
            </span>
          </div>
          <div className="w-full mt-2 justify-between items-center flex">
            <a
              href={torrent.magnet}
              className="btn w-1/3 btn-primary btn-sm"
            >
              Magnet
            </a>
            <a
              href={torrent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-1/3 ml-2 btn-secondary btn-sm"
            >
              Details
            </a>
          </div>
        </div>
      );

    case "card":
      return (
        <div className="shadow-xl card bg-base-100">
          <div className="card-body overflow-hidden">
            <h2 className="text-sm card-title">{torrentName}</h2>
            <div className="flex text-sm">
              <span className="text-sm mr-1 badge badge-primary">
                {torrentSize}
              </span>
              <span className="text-sm mr-1 badge badge-secondary">
                S: {torrentSeeders}
              </span>
              <span className="text-sm mr-1 badge badge-accent">
                L: {torrentLeechers}
              </span>
              <span className="text-sm mr-1 badge badge-info">
                {torrentDateUploaded}
              </span>
            </div>
            <div className="justify-end mt-4 card-actions">
              <a
                href={torrent.magnet}
                className="btn btn-primary btn-sm"
              >
                Magnet
              </a>
              <a
                href={torrent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                Details
              </a>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default TorrentCard;