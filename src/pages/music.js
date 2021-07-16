import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PageHeading from "../components/heading";
import Spinner from "../components/animation/loading";
import { Dialog, Transition } from "@headlessui/react";
import { FaSpotify } from "@react-icons/all-files/fa/FaSpotify";
import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import { FaPause } from "@react-icons/all-files/fa/FaPause";
import { FiExternalLink } from "@react-icons/all-files/fi/FiExternalLink";
import Humanize from "humanize-plus";
import { MdClose } from "@react-icons/all-files/md/MdClose";

const MusicPage = () => {
  const [topArtist, setTopArtist] = useState({});
  const [topTracks, setTopTracks] = useState({});
  const [nowPlaying, setNowPlaying] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [artistFocus, setArtistFocus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState();
  const [audio, setAudio] = useState();
  const [playIndex, setPlayIndex] = useState();

  if (audio) {
    audio.addEventListener("ended", function () {
      audio.currentTime = 0;
      setIsPlaying(false);
    });
  }

  useEffect(() => {
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

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNowPlaying();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    setAudio(new Audio(audioSrc));
    setTimeout(function () {
      setIsPlaying(true);
    }, 1000);
  }, [audioSrc]);

  useEffect(() => {
    if (audio) {
      isPlaying ? audio.play() : audio.pause();
    }
  }, [isPlaying]);

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
                <div className="inline-block w-full max-w-2xl p-4 my-8 text-left align-middle transition-all transform bg-pink-50 dark:bg-black text-black dark:text-pink-100 rounded-2xl">
                  <div className="flex flex-col sm:flex-row">
                    <img
                      src={artistFocus.images[0].url}
                      alt={artistFocus.name}
                      className="rounded-2xl h-auto max-h-80 md:max-h-96 object-cover "
                    />
                    <div className="px-2 md:pl-4">
                      <div className="mt-2">
                        <div className="text-4xl font-semibold">
                          {artistFocus.name}
                        </div>
                        <div className="mt-1 font-light text-sm">
                          {Humanize.compactInteger(
                            artistFocus.followers.total,
                            2
                          )}{" "}
                          followers.
                        </div>
                        <div className="mt-4 gap-1 flex flex-wrap">
                          {artistFocus.genres.map((genre, id) => {
                            return (
                              <button
                                key={id}
                                className="inline-flex justify-center px-2 py-1 text-sm text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 cursor-default"
                              >
                                {genre}
                              </button>
                            );
                          })}
                          <div className="flex gap-1 sm:absolute sm:bottom-6">
                            <a
                              className="inline-flex  items-center justify-center px-2 py-1 text-sm text-white border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                              style={{ backgroundColor: "#1DB954" }}
                              href={artistFocus.external_urls.spotify}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaSpotify className="mr-2" />
                              view on spotify
                            </a>
                            <div
                              onClick={closeModal}
                              className="inline-flex items-center justify-center px-2 py-1 text-sm text-white border border-transparent rounded-md bg-red-500 hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 cursor-pointer"
                            >
                              <MdClose />
                            </div>
                          </div>
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
            topArtist.items.map((artist, id) => {
              return (
                <div
                  key={id}
                  className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 my-4 flex flex-col justify-center"
                >
                  <button
                    onClick={() => {
                      openModal();
                      setArtistFocus(artist);
                    }}
                    className="focus:outline-none"
                  >
                    <img
                      title={`${artist.name}'s info`}
                      src={artist.images[2].url}
                      alt={artist.name}
                      className="h-32 w-32 mx-auto rounded-2xl shadow hover:shadow-lg"
                    />
                  </button>
                  <div className="text-center w-36 mx-auto">
                    {id + 1}. {artist.name}
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
      <div className="lg:max-w-screen-lg mx-auto px-4">
        {topTracks.items ? (
          <div className="flex flex-wrap justify-around mx-auto pb-8">
            {topTracks.items.map((track, id) => {
              return (
                <div
                  className="group w-full md:w-5/12 flex items-center justify-between flex-nowrap mx-2 my-2 rounded-lg hover:bg-white  hover:shadow dark:hover:bg-pink-900"
                  key={id}
                >
                  <div className="flex flex-row content-start">
                    <div className="relative">
                      <img
                        src={track.album.images[1].url}
                        alt={track.name}
                        className="h-20 w-20 rounded-lg min-w-full"
                      />
                      <div
                        title="Listen preview"
                        className="absolute inset-0 h-20 w-20 flex items-center cursor-pointer text-white group group-hover:bg-black group-hover:bg-opacity-50 rounded-lg"
                        onClick={() => {
                          isPlaying ? setIsPlaying(false) : setIsPlaying(true);
                          if (audioSrc !== track.preview_url) {
                            setIsPlaying(false);
                            setAudioSrc(track.preview_url);
                            setPlayIndex(id);
                          }
                        }}
                      >
                        {playIndex === id && isPlaying ? (
                          <FaPause className="mx-auto h-8 w-8" />
                        ) : (
                          <FaPlay className="mx-auto opacity-0 group-hover:opacity-75 h-8 w-8" />
                        )}
                      </div>
                    </div>
                    <div className="px-2 max-w-xs pt-2 truncate">
                      <div className="text-xs">{id + 1}</div>
                      <div className="font-semibold">{track.name}</div>
                      <div className="font-light truncate">
                        {track.album.artists.map((artist, id) => {
                          return (
                            <span key={id} className="font-extralight">
                              {artist.name}
                              {id < track.album.artists.length - 1
                                ? ",\u00A0"
                                : ""}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <a
                    title="Listen on Spotify"
                    className="text-right opacity-0 group-hover:opacity-100 border-l-2 p-4"
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaSpotify
                      style={{ color: "#1DB954" }}
                      className="h-7 w-7 mx-auto"
                    />
                    <div className="flex text-xs font-thin items-center mt-1">
                      Listen <FiExternalLink />
                    </div>
                  </a>
                </div>
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
              <div className="text-sm">wutsqo is currently listening to</div>
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
                {nowPlaying.item.artists.map((artist, id) => {
                  return (
                    <span key={id} className="font-light">
                      {artist.name}
                      {id < nowPlaying.item.artists.length - 1 ? ",\u00A0" : ""}
                    </span>
                  );
                })}
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
