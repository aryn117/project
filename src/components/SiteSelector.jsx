export default function({ siteToSearch, setSiteToSearch  }) {

    const sites = [
        "all",
        "1337x",
        "torrentgalaxy",
        "rarbg",
        "torrentproject",
        "kickasstorrents",
        'limetorrents'
      ];
 
      const handleSelect = (site) => {
        setSiteToSearch(site);  
      };
    
 

      return (
        <div className="grid gap-2 grid-flow-col grid-rows-3 md:grid-rows-2 xl:grid-rows-1 ">
          {sites.map((site) => (
            <button
              key={site}
              className={`btn  btn-outline btn-sm text-md ${
                siteToSearch === site ? "bg-primary text-white" : "bg-base-200"
              }`}
              onClick={() => handleSelect(site)}
            >
              {site === "all" ? "All Sites" : null}
              {site === "1337x" ? "1337x" : null}
              {site === "torrentgalaxy" ? "Torrent Galaxy" : null}
              {site === "torrentproject" ? "Torrent Project" : null}
              {site === "rarbg" ? "RARBG" : null}
              {site === "kickasstorrents" ? "Kickass Torrents" : null}
              {site === "limetorrents" ? "Lime Torrents" : null}
            </button>
          ))}
        </div>
      );





}