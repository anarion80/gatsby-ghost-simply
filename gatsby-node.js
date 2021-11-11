const path = require(`path`)
const { postsPerPage } = require(`./src/utils/siteConfig`)
const { getCustomTemplate } = require(`./src/utils/nodeUtils.js`)
const { paginate } = require(`gatsby-awesome-pagination`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const camelCase = require(`camelcase`)
const _ = require(`lodash`)

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */

// Simple logging
/* const useLog = (reporter, verbose, severity) => (message) => {
    verbose && reporter[severity](message)
} */

async function createLocalImagesNodes(nodeTypes, gatsbyNodeHelpers) {
    const {
        node,
        actions,
        store,
        reporter,
        createNodeId,
        cache,
    } = gatsbyNodeHelpers

    const imgNode = nodeTypes.filter(item => item.type === node.internal.type) // leave if node type does not match

    if (imgNode.length === 0) {
        return
    }

    const allImgTags = imgNode[0].imgTags.filter(item => node[item] !== null && node[item] !== undefined) // leave if image field is empty

    if (allImgTags.length === 0) {
        return
    }

    const { createNode, createNodeField } = actions

    const promises = allImgTags.map((tag) => {
        const imgUrl = node[tag] ? node[tag].replace(/^\/\//, `https://`) : ``

        return createRemoteFileNode({
            url: imgUrl,
            store,
            cache,
            createNode,
            parentNodeId: node.id,
            createNodeId,
        })
    })

    let fileNodes

    try {
        fileNodes = await Promise.all(promises)
    } catch (err) {
        reporter.error(`Error processing images ${node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`}:\n ${err}`)
    }

    if (fileNodes) {
        fileNodes.map((fileNode, i) => {
            //const id = `local${camelCase(allImgTags[i], { pascalCase: true })}`
            //node[id] = fileNode.id
            createNodeField({ node, name: `local${camelCase(allImgTags[i], { pascalCase: true })}`, value: fileNode.id })
        })
    }
}

async function createJsonFileNodes(gatsbyNodeHelpers) {
    const {
        node,
        actions,
        reporter,
        createNodeId,
        loadNodeContent,
        createContentDigest,
    } = gatsbyNodeHelpers

    function transformObject(obj, id, type) {
        const jsonNode = {
            ...obj,
            id,
            children: [],
            parent: node.id,
            internal: {
                contentDigest: createContentDigest(obj),
                type,
            },
        }
        if (obj.id) {
            jsonNode.jsonId = obj.id
        }
        createNode(jsonNode)
        createParentChildLink({ parent: node, child: jsonNode })
    }

    const { createNode, createParentChildLink } = actions
    const content = await loadNodeContent(node)
    const parsedContent = new Object()
    parsedContent.language = node.name

    try {
        parsedContent.content = JSON.parse(content)
    } catch {
        const hint = node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`
        reporter.error(`Unable to parse JSON: ${hint}`)
    }

    if (_.isPlainObject(parsedContent)) {
        transformObject(parsedContent, parsedContent.id ? String(parsedContent.id) : createNodeId(`${node.id} >>> JSON`), _.upperFirst(_.camelCase(`${path.basename(node.dir)} Json`)))
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
        {
            blogPosts: allGhostPost(sort: { order: ASC, fields: published_at }
                filter: {tags: {elemMatch: {name: {nin: ["#podcast","#portfolio","#custom-kusi-doc"]}}}}) {
                edges {
                    node {
                        slug
                        tags {
                            name
                            slug
                        }
                        primary_tag {
                            slug
                        }
                        internal {
                            type
                        }
                        url
                    }
                }
            }
            podcastPosts: allGhostPost(
                    sort: { order: ASC, fields: published_at }
                    filter: {tags: {elemMatch: {name: {in: ["#podcast"]}}}}
                    ) {
                edges {
                    node {
                        slug
                        tags {
                            name
                            slug
                        }
                        primary_tag {
                            slug
                        }
                        internal {
                            type
                        }
                        url
                    }
                }
            }
            portfolioPosts: allGhostPost(
                    sort: { order: ASC, fields: published_at }
                    filter: {tags: {elemMatch: {name: {in: ["#portfolio"]}}}}
                    ) {
                edges {
                    node {
                        slug
                        tags {
                            name
                            slug
                        }
                        primary_tag {
                            slug
                        }
                        internal {
                            type
                        }
                        url
                    }
                }
            }
            docPosts: allGhostPost(sort: { order: ASC, fields: published_at }
                filter: {tags: {elemMatch: {name: {in: ["#custom-kusi-doc"]}}}}) {
                edges {
                    node {
                        slug
                        tags {
                            name
                            slug
                        }
                        primary_tag {
                            slug
                        }
                        internal {
                            type
                        }
                        url
                    }
                }
            }
            allGhostTag(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostAuthor(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                    }
                }
            }
            allGhostPage(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                        url
                        tags {
                            name
                            slug
                        }
                        internal {
                            type
                        }
                    }
                }
            }
            ghostSettings {
                lang
            }
        }
    `)

    // Check for any errors
    if (result.errors) {
        // eslint-disable-next-line no-restricted-syntax
        throw new Error(result.errors)
    }

    // Extract query results
    const tags = result.data.allGhostTag.edges
    const authors = result.data.allGhostAuthor.edges
    const pages = result.data.allGhostPage.edges
    const posts = result.data.blogPosts.edges
    const podcastPosts = result.data.podcastPosts.edges
    const portfolioPosts = result.data.portfolioPosts.edges
    const docPosts = result.data.docPosts.edges
    const lang = result.data.ghostSettings.lang

    // Load templates
    const indexTemplate = path.resolve(`./src/templates/index.js`) // change here to select different home page
    /*
        index-featured.js - no further changes needed
        index-medium - update postsPerPage to "14" in siteConfig.js
        index-medium-sidebar.js - update postsPerPage to "14" in siteConfig.js, possible apply it to page
        index-sidebar.js - no further changes needed
        index-grid.js - no further changes needed
        index-personal.js - need to create a page as in https://godofredo.ninja/ghost-theme/simply/home-page/#personal
        index-archive - update postsPerPage to "50" in siteConfig.js
        index-featured-slider.js - update the number of featured slides in page query
        index-photographer.js - no further changes needed

    */
    const tagsTemplate = path.resolve(`./src/templates/tag.js`)
    const authorTemplate = path.resolve(`./src/templates/author.js`)
    const podcastTemplate = path.resolve(`./src/templates/podcast.js`)
    const portfolioTemplate = path.resolve(`./src/templates/portfolio.js`)
    const docsTemplate = path.resolve(`./src/templates/docs.js`)

    // Create tag pages
    tags.forEach(({ node }) => {
        const totalPosts = node.postCount !== null ? node.postCount : 0

        // This part here defines, that our tag pages will use
        // a `/tag/:slug/` permalink.
        const url = `/tag/${node.slug}`

        const items = Array.from({ length: totalPosts })

        // Create pagination
        paginate({
            createPage,
            items: items,
            itemsPerPage: postsPerPage,
            component: tagsTemplate,
            pathPrefix: ({ pageNumber }) => ((pageNumber === 0) ? url : `${url}/page`),
            context: {
                slug: node.slug,
                collectionPath: `/tag/`,
            },
        })
    })

    // Create author pages
    authors.forEach(({ node }) => {
        const totalPosts = node.postCount !== null ? node.postCount : 0

        // This part here defines, that our author pages will use
        // a `/author/:slug/` permalink.
        const url = `/author/${node.slug}`

        const items = Array.from({ length: totalPosts })

        // Create pagination
        paginate({
            createPage,
            items: items,
            itemsPerPage: postsPerPage,
            component: authorTemplate,
            pathPrefix: ({ pageNumber }) => ((pageNumber === 0) ? url : `${url}/page`),
            context: {
                slug: node.slug,
                collectionPath: `/author/`,
            },
        })
    })

    // Create pages
    pages.forEach(({ node }) => {
        // This part here defines, that our pages will use
        // a `/:slug/` permalink.
        const url = `/${node.slug}/`

        createPage({
            path: url,
            component: getCustomTemplate(node),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug,
                collectionPath: `/`,
            },
        })
    })

    // Create post pages
    posts.forEach(({ node }, index) => {
        // This part here defines, that our posts will use
        // a `/:slug/` permalink.
        const url = `/${node.slug}/`
        const prev = index === 0 ? null : posts[index - 1].node
        const next = index === posts.length - 1 ? null : posts[index + 1].node

        createPage({
            path: url,
            component: getCustomTemplate(node),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug,
                collectionPath: `/`,
                prev: prev ? prev.slug : null,
                next: next ? next.slug : null,
                primary_tag: node.primary_tag ? node.primary_tag.slug : null,
            },
        })
    })

    // Create podcast post pages
    podcastPosts.forEach(({ node }, index) => {
        // This part here defines, that our podcast posts will use
        // a `/podcast/:slug/` permalink.
        const url = `/podcast/${node.slug}`
        const prev = index === 0 ? null : podcastPosts[index - 1].node
        const next = index === podcastPosts.length - 1 ? null : podcastPosts[index + 1].node

        createPage({
            path: url,
            component: getCustomTemplate(node),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug,
                collectionPath: `/podcast`,
                prev: prev ? prev.slug : null,
                next: next ? next.slug : null,
                primary_tag: node.primary_tag ? node.primary_tag.slug : null,
            },
        })
    })

    // Create portfolio post pages
    portfolioPosts.forEach(({ node }, index) => {
        // This part here defines, that our portfolio posts will use
        // a `/portfolio/:slug/` permalink.
        const url = `/portfolio/${node.slug}`
        const prev = index === 0 ? null : portfolioPosts[index - 1].node
        const next = index === portfolioPosts.length - 1 ? null : portfolioPosts[index + 1].node

        createPage({
            path: url,
            component: getCustomTemplate(node),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug,
                collectionPath: `/portfolio`,
                prev: prev ? prev.slug : null,
                next: next ? next.slug : null,
                primary_tag: node.primary_tag ? node.primary_tag.slug : null,
            },
        })
    })

    // Create documentation post pages
    docPosts.forEach(({ node }, index) => {
        // This part here defines, that our docs posts will use
        // a `/docs/:slug/` permalink.
        const url = `/docs/${node.slug}`
        const prev = index === 0 ? null : docPosts[index - 1].node
        const next = index === docPosts.length - 1 ? null : docPosts[index + 1].node

        createPage({
            path: url,
            component: getCustomTemplate(node),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug,
                collectionPath: `/docs`,
                prev: prev ? prev.slug : null,
                next: next ? next.slug : null,
                primary_tag: node.primary_tag ? node.primary_tag.slug : null,
            },
        })
    })

    // Create podcasts page with pagination
    paginate({
        createPage,
        items: podcastPosts,
        itemsPerPage: postsPerPage,
        component: podcastTemplate,
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            collectionPath: `/podcast`,
        },
        pathPrefix: ({ pageNumber }) => ((pageNumber === 0) ? `/podcast` : `/podcast/page`),
    })

    // Create portfolio page
    createPage({
        path: `/portfolio`,
        component: portfolioTemplate,
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            collectionPath: `/portfolio`,
        },
    })

    // Create docs page
    createPage({
        path: `/docs`,
        component: docsTemplate,
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            collectionPath: `/docs`,
        },
    })

    // Create archive example page
    paginate({
        createPage,
        items: posts,
        itemsPerPage: 50,
        component: path.resolve(`./src/templates/custom/index-archive.js`),
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            language: lang,
        },
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/index-archive`
            } else {
                return `/index-archive/page`
            }
        },
    })

    // Create index grid example page
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: path.resolve(`./src/templates/custom/index-grid.js`),
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            language: lang,
        },
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/index-grid`
            } else {
                return `/index-grid/page`
            }
        },
    })

    // Create index sidebar example page
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: path.resolve(`./src/templates/custom/index-sidebar.js`),
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            language: lang,
        },
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/index-sidebar`
            } else {
                return `/index-sidebar/page`
            }
        },
    })

    // Create index medium example page
    paginate({
        createPage,
        items: posts,
        itemsPerPage: 14,
        component: path.resolve(`./src/templates/custom/index-medium.js`),
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            language: lang,
        },
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/index-medium`
            } else {
                return `/index-medium/page`
            }
        },
    })

    // Create index medium sidebar example page
    paginate({
        createPage,
        items: posts,
        itemsPerPage: 14,
        component: path.resolve(`./src/templates/custom/index-medium-sidebar.js`),
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            language: lang,
        },
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/index-medium-sidebar`
            } else {
                return `/index-medium-sidebar/page`
            }
        },
    })

    // Create index featured example page
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: path.resolve(`./src/templates/custom/index-featured.js`),
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            language: lang,
        },
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/index-featured`
            } else {
                return `/index-featured/page`
            }
        },
    })

    // Create index featured slider example page
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: path.resolve(`./src/templates/custom/index-featured-slider.js`),
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            language: lang,
        },
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/index-featured-slider`
            } else {
                return `/index-featured-slider/page`
            }
        },
    })

    // Create index photographer example page
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: path.resolve(`./src/templates/custom/index-photographer.js`),
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            language: lang,
        },
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/index-photographer`
            } else {
                return `/index-photographer/page`
            }
        },
    })

    // Create index personal example page
    createPage({
        path: `/index-personal`,
        component: path.resolve(`./src/templates/custom/index-personal.js`),
    })

    // Create pagination
    paginate({
        createPage,
        items: posts,
        itemsPerPage: postsPerPage,
        component: indexTemplate,
        context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            language: lang,
        },
        pathPrefix: ({ pageNumber }) => {
            if (pageNumber === 0) {
                return `/`
            } else {
                return `/page`
            }
        },
    })
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
        type GhostPost implements Node {
            localFeatureImage: File @link(from: "fields.localFeatureImage")
        }
        type GhostPage implements Node {
            localFeatureImage: File @link(from: "fields.localFeatureImage")
        }
        type GhostAuthor implements Node {
            localCoverImage: File @link(from: "fields.localCoverImage")
            localProfileImage: File @link(from: "fields.localProfileImage")
        }
        type GhostTag implements Node {
            localFeatureImage: File @link(from: "fields.localFeatureImage")
        }
        type GhostSettings implements Node {
            localCoverImage: File @link(from: "fields.localCoverImage")
            localLogo: File @link(from: "fields.localLogo")
            localIcon: File @link(from: "fields.localIcon")
            accent_color: String
        }

  `)
}

exports.onCreateNode = async (gatsbyNodeHelpers) => {
    // Check that we are modifying right node types.
    const nodeTypes = [
        {
            type: `GhostAuthor`,
            imgTags: [`cover_image`, `profile_image`],
        },
        {
            type: `GhostTag`,
            imgTags: [`feature_image`],
        },
        {
            type: `GhostPost`,
            imgTags: [`feature_image`],
        },
        {
            type: `GhostPage`,
            imgTags: [`feature_image`],
        },
        {
            type: `GhostSettings`,
            imgTags: [`logo`, `icon`, `cover_image`],
        },
    ]
    if (nodeTypes.filter(item => item.type === gatsbyNodeHelpers.node.internal.type).length !== 0) {
        createLocalImagesNodes(nodeTypes, gatsbyNodeHelpers)
    } else if (gatsbyNodeHelpers.node.internal.mediaType === `application/json`) {
        createJsonFileNodes(gatsbyNodeHelpers)
    } else {
        return
    }
}
