module.exports = {
  siteMetadata: {
    title: `Matt Jennings`,
    description: `Portfolio website for Matt Jennings`,
    author: `@mattjennings44`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Matt Jennings`,
        short_name: `MattJennings`,
        start_url: `/`,
        background_color: `#303030`,
        theme_color: `#303030`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Lato`],
        display: 'swap',
      },
    },
  ],
}
