# Gatsby Starter Ghost with Simply Theme

A starter template to build lightning fast websites with [Ghost](https://ghost.org) (as headless CMS in this case) & [Gatsby](https://gatsbyjs.org), using the excellent [Simply Ghost Theme](https://github.com/godofredoninja/simply).
Rewritten from Handlebars theme to React/Gatsby.

**Demo:** https://gatsby-ghost-simply.netlify.app/

&nbsp;

![gatsby-ghost-simply](https://user-images.githubusercontent.com/2185791/133974213-7f41e2e5-427d-4a0b-8024-e0d2ac3c4dd0.png)
&nbsp;

## 🚀 What is working
- Light Mode / Dark Mode
- [Fast search](https://godofredo.ninja/ghost-theme/simply/settings/#search/) functionality
- [Social accounts link](https://godofredo.ninja/ghost-theme/simply/settings/#socialmedia)
- [PrismJS syntax highlighting](https://prismjs.com/index.html#supported-languages) - basic only
- Different Home Page variants and Post formats
  - Post Format (:warning: use internal tags and not `custom_template` field!)
    - [Post Default](https://godofredo.ninja/ghost-theme/simply/post-format/#post-default)
    - [Post Full](https://godofredo.ninja/ghost-theme/simply/post-format/#post-full)
    - [Post Wide](https://godofredo.ninja/ghost-theme/simply/post-format/#post-wide)
    - [Post Header Image](https://godofredo.ninja/ghost-theme/simply/post-format/#post-header-image)
    - [Post Image](https://godofredo.ninja/ghost-theme/simply/post-format/#post-image)
    - [Post Image Right](https://godofredo.ninja/ghost-theme/simply/post-format/#post-image-right)
    - [Post Sidebar](https://godofredo.ninja/ghost-theme/simply/post-format/#post-sidebar)
    - [Post not Image](https://godofredo.ninja/ghost-theme/simply/post-format/#post-not-image)
  - [Layouts Header](https://godofredo.ninja/ghost-theme/simply/layouts/#header)
    - Header Default
    - [Header with DropDown Menu](https://godofredo.ninja/ghost-theme/simply/layouts/#headerdefault)
  - [Layouts Footer](https://godofredo.ninja/ghost-theme/simply/layouts/#footer)
    - Footer Default
    - Footer Dark
    - Footer Not Menu Secondary
- Archive (:warning: use internal tags and not `custom_template` field!)
    - [Authors Page](https://godofredo.ninja/ghost-theme/simply/authors-and-tags-page/#authors-page)
    - [Tags Page](https://godofredo.ninja/ghost-theme/simply/authors-and-tags-page/#tags-page)
- Page
    - [Contact](https://godofredo.ninja/ghost-theme/simply/contact-page/) (:warning: use internal tags and not `custom_template` field!)
    - [Kusi Doc](https://godofredo.ninja/ghost-theme/simply/kusi-doc/) for the documentation of your project (:warning: use internal tags and not `custom_template` field!)
    - 404
    - [Podcasts Page](https://godofredo.ninja/ghost-theme/simply/podcasts-page/) (:warning: no need to create the page, just use internal tags on the post)
    - [Portfolio Page](https://godofredo.ninja/ghost-theme/simply/portfolio-page/) (:warning: no need to create the page, just use internal tags on the post)
- Support for [different Languages](https://godofredo.ninja/ghost-theme/simply/languages)
- Related Articles
- Social share buttons support for posts
- Previous and next Post
- Hamburger navigation menu
- Header Transparency
- Lazy Loading for feature-images (using gatsby-plugin-image)
- Responsive Video
  - YouTube
  - Vimeo
  - kickstarter
  - Dailymotion
- Resize Image Galleries
- Medium style image zoom
- [GDPR Cookie Consent and Google/Facebook tracking](https://github.com/andrezimpel/gatsby-plugin-gdpr-cookies)

## ❌ What is not yet working
- [Logo Light / Dark Mode](https://godofredo.ninja/ghost-theme/simply/settings/#logolightdarkmode)
- Different Home Page variants and Post formats
  - [AMP](https://github.com/godofredoninja/Hodor-AMP-Ghost) Template
- Pagination Infinite Scroll - not for static sites
- Comments
- Membership features

## ✏ What could be improved
- Move videoResponsive and resizeImageGalleries to build time using some rehype plugin
- Convert this from a starter to a proper theme
- Extract pretty dates from GraphQL to apply locale to them
# 🏗 Installing

```bash
# With Gatsby CLI
gatsby new gatsby-starter-ghost https://github.com/anarion80/gatsby-ghost-simply.git
```

```bash
# From Source
git clone https://github.com/anarion80/gatsby-ghost-simply.git
cd gatsby-ghost-simply
```

Then install dependencies

```bash
yarn
```

&nbsp;

# 🏃‍♂️ Running

Start the development server. You now have a Gatsby site pulling content from headless Ghost. You do not need to have original [Simply Ghost Theme](https://github.com/godofredoninja/simply) installed in your Ghost instance, nor have any additional Routes set up there.

```bash
gatsby develop
```

By default, the starter will populate content from a default Ghost install located at https://gatsby.ghost.io.

To use your own install, you will need to edit the `.ghost.json` config file with your credentials. Change the `apiUrl` value to the URL of your Ghost site. For Ghost(Pro) customers, this is the Ghost URL ending in `.ghost.io`, and for people using the self-hosted version of Ghost, it's the same URL used to access your site.

Next, update the `contentApiKey` value to a key associated with the Ghost site. A key can be provided by creating an integration within Ghost Admin. Navigate to Integrations and click "Add new integration". Name the integration appropriately and click create.

```json
{
    "apiUrl": "https://gatsby.ghost.io",
    "contentApiKey": "9cc5c67c358edfdd81455149d0"
}
```

Finally, configure your desired URL in `siteConfig.js`, so links (e. g. canonical links) are generated correctly. You should also update other values in there needed for menu, social sharing and search.

```js
{
    menuDropdown: [
        {
            label: `About`,
            url: `/about`,
        },
        .
        .
        .
    ],
    followSocialMedia: [
        {
            service: `youtube`,
            title: `YOUR_TITLE`,
            url: `YOUR_URL`,
        },
        .
        .
        .
    ],
    searchSettings: {
        key: `YOUR_GHOST_API_KEY`,
        url: `YOUR_GHOST_URL`,
        /* This is optional */
        options: {
            keys: [`title`, `plaintext`],
            limit: 10,
        },
        /* This is optional to perform filtering of the ghost api */
        api: {
            resource: `posts`,
            parameters: {
                limit: `all`,
                fields: [`title`, `slug`, `plaintext`],
                filter: ``,
                include: ``,
                order: ``,
                formats: ``,
            },
        },
    },
}
```

To use custom post templates, add a particular internal tag to the post (i.e. `#custom-post-wide`, `#custom-kusi-doc`, etc).

Demo and the repo is the "maximum version" with all possible types of Home Page variants, Post Templates, Portfolio, Docs, etc. Adjust/remove as needed.

&nbsp;

# ✈ Deploying with Netlify

The starter contains three config files specifically for deploying with Netlify. A `netlify.toml` file for build settings, a `/static/_headers` file with default security headers set for all routes, and `/static/_redirects` to set Netlify custom domain redirects.

To deploy to your Netlify account, hit the button below.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/anarion80/gatsby-ghost-simply.git)

Content API Keys are generally not considered to be sensitive information, they exist so that they can be changed in the event of abuse; so most people commit it directly to their `.ghost.json` config file. If you prefer to keep this information out of your repository you can remove this config and set [Netlify ENV variables](https://www.netlify.com/docs/continuous-deployment/#build-environment-variables) for production builds instead.

Once deployed, you can set up a [Ghost + Netlify Integration](https://docs.ghost.org/integrations/netlify/) to use deploy hooks from Ghost to trigger Netlify rebuilds. That way, any time data changes in Ghost, your site will rebuild on Netlify.

&nbsp;

# ⚡ Optimising

You can disable the default Ghost Handlebars Theme front-end by enabling the `Make this site private` flag within your Ghost settings. This enables password protection in front of the Ghost install and sets `<meta name="robots" content="noindex" />` so your Gatsby front-end becomes the source of truth for SEO.

&nbsp;

# 🛠 Extra options

```bash
# Run a production build, locally
gatsby build

# Serve a production build, locally
gatsby serve
```

Gatsby `develop` uses the `development` config in `.ghost.json` - while Gatsby `build` uses the `production` config.

&nbsp;

# 📝 Copyright & License

Copyright (c) 2021 anarion80 - Released under the [GPLv3 license](LICENSE).
