const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

exports.handler = async (event, context) => {
  // Get the refresh token we stored as an environment variable
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  // Do the base64 encoding we did earlier but with Node tools
  const auth = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  // Store the Spotify API endpoint for readability
  const tokenEndpoint = `https://accounts.spotify.com/api/token`;
  const nowPlayingEndpoint = `https://api.spotify.com/v1/me/top/tracks`;

  const options = {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&redirect_uri=${encodeURI(
      process.env.URL,
      +"/.netlify/functions/callback"
    )}`,
  };

  const accessToken = await fetch(tokenEndpoint, options)
    .then((res) => res.json())
    .then((json) => {
      // console.log("a", json);
      return json.access_token;
    })
    .catch((err) => {
      console.error(err);
    });

  return fetch(`${nowPlayingEndpoint}?time_range=short_term&limit=12`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.items[1]);
      const toReturn = {
        statusCode: 200,
        body: JSON.stringify(json),
      };

      return toReturn;
    })
    .catch((err) => {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "error happened" }),
      };
    });
};
