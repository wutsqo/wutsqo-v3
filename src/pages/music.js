import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeading from "../components/heading";
import Spinner from "../components/animation/loading";

const MusicPage = () => {
  const [topArtist, setTopArtist] = React.useState({});
  const [topTracks, setTopTracks] = React.useState({});
  const [nowPlaying, setNowPlaying] = React.useState({});

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

  async function fetchNowPlaying() {
    const res = await fetch("/.netlify/functions/spotify");
    res.json().then((res) => {
      setNowPlaying(res);
    });
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <SEO title="Music" />
      <PageHeading title="Top Artists" />
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-wrap justify-around">
          {topArtist.items ? (
            topArtist.items.map((artist, index) => {
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
          ) : (
            <div className="mx-auto">
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <PageHeading title="Top Tracks" />
      <div className="max-w-screen-lg mx-auto px-4">
        {topTracks.items ? (
          <div className="flex flex-wrap justify-around mx-auto">
            {topTracks.items.map((track, index) => {
              return (
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-5/12 flex items-center flex-nowrap mx-2 my-2 rounded-lg hover:bg-white  hover:shadow dark:hover:bg-pink-900"
                >
                  <div>
                    <img
                      src={track.album.images[2].url}
                      alt={track.name}
                      className="h-20 w-20 rounded-lg min-w-full"
                    />
                  </div>
                  <div className="px-2 max-w-xs">
                    <div className="text-xs">{index + 1}</div>
                    <div className="font-semibold ">{track.name}</div>
                    <div className="font-extralight">
                      {track.album.artists[0].name}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto">
            <Spinner />
          </div>
        )}
      </div>
      {nowPlaying.item ? (
        <div className="flex justify-center sm:justify-end fixed sm:right-4 bottom-0">
          <div className="flex justify-end gap-4 items-center shadow-md text-right bg-white dark:bg-pink-900 bg-opacity-75 dark:bg-opacity-75 backdrop-filter backdrop-blur-lg pl-4 pr-6 sm:pr-0 w-screen sm:max-w-max sm:mx-8">
            <div>
              <div className="text-sm">currently listening to</div>
              <a
                href={nowPlaying.item.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold"
              >
                {nowPlaying.item.name}
              </a>
              <br />
              <a
                href={nowPlaying.item.artists[0].external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="font-light"
              >
                {nowPlaying.item.artists[0].name}
              </a>
            </div>
            <a
              href={nowPlaying.item.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={nowPlaying.item.album.images[1].url}
                alt={nowPlaying.item.name}
                className="h-20 w-20 md:h-28 md:w-28"
              />
            </a>
          </div>
        </div>
      ) : null}
      <div className="max-w-screen-lg mx-auto px-8 text-center text-sm mt-8">
        <p>*Data based on my Spotify listening history in the past 4 weeks.</p>
      </div>
    </Layout>
  );
};

export default MusicPage;
