import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeading from "../components/heading";

const MusicPage = () => {
  const [topArtist, setTopArtist] = React.useState({});
  const [topTracks, setTopTracks] = React.useState({});

  React.useEffect(() => {
    fetch(`/.netlify/functions/topartists`)
      .then((response) => response.json())
      .then((resultData) => {
        setTopArtist(resultData);
      });
    fetch(`/.netlify/functions/toptracks`)
      .then((response) => response.json())
      .then((resultData) => {
        setTopTracks(resultData);
      });
  }, []);

  return (
    <Layout>
      <SEO title="Music" />
      <PageHeading title="Top Artists" />
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-wrap justify-around">
          {topArtist.items
            ? topArtist.items.map((artist, index) => {
                return (
                  <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 my-4">
                    <a
                      href={artist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={artist.images[2].url}
                        alt={artist.name}
                        className="h-32 w-32 mx-auto rounded-2xl"
                      />
                    </a>
                    <div className="text-center w-36 mx-auto">
                      {index + 1}. {artist.name}
                    </div>
                  </div>
                );
              })
            : "loading..."}
        </div>
      </div>
      <PageHeading title="Top Tracks" />
      <div className="max-w-screen-lg mx-auto px-4">
        {topTracks.items ? (
          <div className="flex flex-wrap justify-around mx-auto">
            {topTracks.items.map((track, index) => {
              return (
                <div className="w-full md:w-1/2 flex items-center flex-nowrap pl-4">
                  <div className="p-2">
                    <img
                      src={track.album.images[2].url}
                      alt={track.name}
                      className="h-20 w-20 rounded-lg min-w-full"
                    />
                  </div>
                  <div className="px-2">
                    <div className="text-sm">{index + 1}</div>
                    <div className="font-bold text-lg">{track.name}</div>
                    <div className="font-light">
                      {track.album.artists[0].name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          "loading..."
        )}
      </div>
      <div className="max-w-screen-lg mx-auto px-8 text-center text-sm mt-8">
        <p>*Data based on my Spotify listening history in the past 4 weeks.</p>
      </div>
    </Layout>
  );
};

export default MusicPage;
