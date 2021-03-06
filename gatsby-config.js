module.exports = {
  siteMetadata: {
    title: `Muhammad Urwatil Wutsqo`,
    description: `Personal website of a computer science student`,
    author: `@wutsqo`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/posts/blog/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "reads",
        path: `${__dirname}/src/posts/reads/`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-relative-images",
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Muhammad Urwatil Wutsqo`,
        short_name: `Wutsqo`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    "gatsby-plugin-postcss",
    `gatsby-plugin-netlify`,
    "gatsby-plugin-dark-mode",
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `wutsqo`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
