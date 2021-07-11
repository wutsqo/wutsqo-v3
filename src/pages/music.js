import * as React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeading from "../components/heading";
import Spinner from "../components/animation/loading";
import { Dialog, Transition } from "@headlessui/react";
import { FaSpotify } from "@react-icons/all-files/fa/FaSpotify";
import { FiExternalLink } from "@react-icons/all-files/fi/FiExternalLink";

const MusicPage = () => {
  const [topArtist, setTopArtist] = React.useState({});
  const [topTracks, setTopTracks] = React.useState({});
  const [nowPlaying, setNowPlaying] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [artistFocus, setArtistFocus] = React.useState({});

  React.useEffect(() => {
    fetch(`/.netlify/functions/topartists`)
      .then((response) => response.json())
      .then((resultData) => {
        setTopArtist(resultData);
        setArtistFocus(resultData.items[0]);
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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Layout>
      <SEO title="Music" />

      <PageHeading title="Top Artists" />
      {artistFocus.images ? (
        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50" onClose={closeModal}>
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur-xl" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-xl p-4 my-8 text-left align-middle transition-all transform bg-pink-50 dark:bg-black text-black dark:text-pink-100 rounded-2xl">
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={artistFocus.images[0].url}
                      alt={artistFocus.name}
                      className="rounded-2xl h-80 object-cover "
                    />
                    <div className="px-2 md:pl-4">
                      <div className="mt-2">
                        <div className="text-4xl font-semibold">
                          {artistFocus.name}
                        </div>
                        <div className="mt-4 gap-1 flex flex-wrap">
                          {artistFocus.genres.map((genre) => {
                            return (
                              <button className="inline-flex justify-center px-2 py-1 text-sm text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                                {genre}
                              </button>
                            );
                          })}
                          <a
                            className="inline-flex md:absolute md:bottom-6 items-center justify-center px-2 py-1 text-sm text-white border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            style={{ backgroundColor: "#1DB954" }}
                            href={artistFocus.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaSpotify className="mr-2" />
                            view on spotify
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      ) : null}

      <div className="md:max-w-screen-md lg:max-w-screen-lg mx-auto">
        <div className="flex flex-wrap justify-around">
          {topArtist.items ? (
            topArtist.items.map((artist, index) => {
              return (
                <div className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 my-4 flex flex-col justify-center">
                  <button
                    onClick={() => {
                      openModal();
                      setArtistFocus(artist);
                    }}
                    className="focus:outline-none"
                  >
                    <img
                      src={artist.images[2].url}
                      alt={artist.name}
                      className="h-32 w-32 mx-auto rounded-2xl"
                    />
                  </button>
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
      <div className="md:max-w-screen-md lg:max-w-screen-lg mx-auto px-4">
        {topTracks.items ? (
          <div className="flex flex-wrap justify-around mx-auto pb-8">
            {topTracks.items.map((track, index) => {
              return (
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full md:w-5/12 flex items-center justify-between flex-nowrap mx-2 my-2 rounded-lg hover:bg-white  hover:shadow dark:hover:bg-pink-900"
                >
                  <div className="flex flex-row content-start">
                    <div>
                      <img
                        src={track.album.images[1].url}
                        alt={track.name}
                        className="h-20 w-20 rounded-lg min-w-full "
                      />
                    </div>
                    <div className="px-2 max-w-xs pt-2">
                      <div className="text-xs">{index + 1}</div>
                      <div className="font-semibold ">{track.name}</div>
                      <div className="font-extralight">
                        {track.album.artists[0].name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right opacity-0 group-hover:opacity-100 p-4">
                    <FiExternalLink />
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
        <div className="flex justify-center sm:justify-end sticky md:mr-8 bottom-0">
          <div className="flex justify-end gap-4 items-center shadow-md text-right bg-white dark:bg-pink-900 bg-opacity-90 dark:bg-opacity-90 pl-4 pr-6 sm:pr-0 w-screen sm:max-w-max sm:mx-8">
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
                className="h-20 md:h-32 transform transition md:hover:scale-150 md:hover:translate-x-8 md:hover:-translate-y-7"
              />
            </a>
          </div>
        </div>
      ) : null}
      <div className="max-w-screen-lg mx-auto px-8 text-center text-sm py-8">
        <p>*Data based on my Spotify listening history in the past 4 weeks.</p>
      </div>
    </Layout>
  );
};

export default MusicPage;
