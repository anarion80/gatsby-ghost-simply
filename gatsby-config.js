/* eslint-disable no-useless-escape */
const path = require(`path`)

const config = require(`./src/utils/siteConfig`)
const generateRSSFeed = require(`./src/utils/rss/generate-feed`)

let ghostConfig

try {
    ghostConfig = require(`./.ghost`)
} catch (e) {
    ghostConfig = {
        production: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
    }
} finally {
    const { apiUrl, contentApiKey } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
    }
}

if (process.env.NODE_ENV === `production` && config.siteUrl === `http://localhost:8000` && !process.env.SITEURL) {
    throw new Error(`siteUrl can't be localhost and needs to be configured in siteConfig. Check the README.`) // eslint-disable-line
}

/**
* This is the place where you can tell Gatsby which plugins to use
* and set them up the way you want.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
*
*/
module.exports = {
    siteMetadata: {
        siteUrl: process.env.SITEURL || config.siteUrl,
    },
    plugins: [
        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `locale`),
                name: `locale`,
            },
        },
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                failOnError: false,
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-source-ghost`,
            options:
                process.env.NODE_ENV === `development`
                    ? ghostConfig.development
                    : ghostConfig.production,
        },
        /* `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `locale`),
            },
        }, */
        /**
         *  Utility Plugins
         */
        {
            resolve: `gatsby-plugin-ghost-manifest`,
            options: {
                short_name: config.shortTitle,
                start_url: `/`,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: `minimal-ui`,
                icon: `static/${config.siteIcon}`,
                legacy: true,
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
             `,
                feeds: [
                    generateRSSFeed(config),
                ],
            },
        },
        {
            resolve: `gatsby-plugin-advanced-sitemap`,
            options: {
                query: `
                {
                    allGhostPost {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostPage {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostTag {
                        edges {
                            node {
                                id
                                slug
                                feature_image
                            }
                        }
                    }
                    allGhostAuthor {
                        edges {
                            node {
                                id
                                slug
                                profile_image
                            }
                        }
                    }
                }`,
                mapping: {
                    allGhostPost: {
                        sitemap: `posts`,
                    },
                    allGhostTag: {
                        sitemap: `tags`,
                    },
                    allGhostAuthor: {
                        sitemap: `authors`,
                    },
                    allGhostPage: {
                        sitemap: `pages`,
                    },
                },
                exclude: [
                    `/dev-404-page`,
                    `/404`,
                    `/404.html`,
                    `/offline-plugin-app-shell-fallback`,
                ],
                createLinkInHead: true,
                addUncaughtPages: true,
            },
        },
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-dark-mode`,
        {
            resolve: `gatsby-plugin-webfonts`,
            options: {
                fonts: {
                    google: [
                        {
                            family: `PT Serif`,
                            variants: [`400`, `700`, `400i`],
                            fontDisplay: `swap`,
                            strategy: config.fontStrategy,
                        },
                        {
                            family: `Inter`,
                            variants: [`400`, `500`, `600`, `700`],
                            fontDisplay: `swap`,
                            strategy: config.fontStrategy,
                        },
                    ],
                },
            },
        },
        {
            resolve: `gatsby-transformer-rehype`,
            options: {
                // Condition for selecting an existing GraphQL node (optional)
                // If not set, the transformer operates on file nodes.
                filter: node => node.internal.type === `GhostPost`,
                // Only needed when using filter (optional, default: node.html)
                // Source location of the html to be transformed
                source: node => node.html,
                // Additional fields of the sourced node can be added here (optional)
                // These fields are then available on the htmlNode on `htmlNode.context`
                contextFields: [],
                // Fragment mode (optional, default: true)
                fragment: true,
                // Space mode (optional, default: `html`)
                space: `html`,
                // EmitParseErrors mode (optional, default: false)
                emitParseErrors: false,
                // Verbose mode (optional, default: false)
                verbose: false,
                // Plugins configs (optional but most likely you need one)
                plugins: [
                    {
                        resolve: `gatsby-rehype-prismjs`,
                        options: {
                            // All code blocks will be wrapped in an additional <div>
                            // containter to allow for better styling. This might break
                            // your current theme. You might therefore have to provide
                            // additional styling classes (below is just an example).
                            divClassNames: `kg-card kg-code-card`,
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (e.g. <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (e.g. for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: `language-`,
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                            // If setting this to false, the parser handles and highlights inline
                            // code, i.e. single backtick code like `this`.
                            noInlineHighlight: true,
                            // By default the HTML entities <>&'" are escaped.
                            // Add additional HTML escapes by providing a mapping
                            // of HTML entities and their escape value IE: { '}': '&#123;' }
                            escapeEntities: {},
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-gdpr-cookies`,
            options: {
                googleAnalytics: {
                    trackingId: `YOUR_GOOGLE_ANALYTICS_TRACKING_ID`, // leave empty if you want to disable the tracker
                    cookieName: `gatsby-gdpr-google-analytics`, // default
                    anonymize: true, // default
                    allowAdFeatures: false, // default
                },
                googleTagManager: {
                    trackingId: `YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID`, // leave empty if you want to disable the tracker
                    cookieName: `gatsby-gdpr-google-tagmanager`, // default
                    dataLayerName: `dataLayer`, // default
                },
                facebookPixel: {
                    pixelId: `YOUR_FACEBOOK_PIXEL_ID`, // leave empty if you want to disable the tracker
                    cookieName: `gatsby-gdpr-facebook-pixel`, // default
                },
                tikTokPixel: {
                    pixelId: `YOUR_TIKTOK_PIXEL_ID`, // leave empty if you want to disable the tracker
                    cookieName: `gatsby-gdpr-tiktok-pixel`, // default
                },
                hotjar: {
                    hjid: `YOUR_HOTJAR_ID`,
                    hjsv: `YOUR_HOTJAR_SNIPPET_VERSION`,
                    cookieName: `gatsby-gdpr-hotjar`, // default
                },
                // defines the environments where the tracking should be available  - default is ["production"]
                environments: [`production`, `development`],
            },
        },
        `gatsby-plugin-sass`,
        `gatsby-plugin-twitter`,
        {
            resolve: `gatsby-plugin-breadcrumb`,
            options: {
                // useAutoGen: required 'true' to use autogen
                useAutoGen: true,
                // autoGenHomeLabel: optional 'Home' is default
                autoGenHomeLabel: `Home`,
                // exclude: optional, include this array to exclude paths you don't want to
                // generate breadcrumbs for (see below for details).
                exclude: [
                    `**/dev-404-page/**`,
                    `**/404/**`,
                    `**/404.html`,
                    `**/offline-plugin-app-shell-fallback/**`,
                    `**/portfolio/**`,
                    `**/podcast/**`,
                ],
                // isMatchOptions: optional, include this object to configure the wildcard-match library.
                excludeOptions: {
                    separator: `.`,
                },
                // crumbLabelUpdates: optional, update specific crumbLabels in the path
                //crumbLabelUpdates: [
                //   {
                //        pathname: `/book`,
                //        crumbLabel: `Books`,
                //    },
                //],
                // trailingSlashes: optional, will add trailing slashes to the end
                // of crumb pathnames. default is false
                trailingSlashes: true,
                // usePathPrefix: optional, if you are using pathPrefix above
                //usePathPrefix: `/blog`,
            },
        },
    ],
}