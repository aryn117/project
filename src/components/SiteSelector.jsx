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
        <div className="flex gap-2 p-2">
          {sites.map((site) => (
            <button
              key={site}
              className={`btn btn-outline btn-sm text-md ${
                siteToSearch === site ? "bg-primary text-white" : "bg-base-200"
              }`}
              onClick={() => handleSelect(site)}
            >
              {site}
            </button>
          ))}
        </div>
      );





}