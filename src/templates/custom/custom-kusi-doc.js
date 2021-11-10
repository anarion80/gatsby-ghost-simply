import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Layout } from '../../components/common'
import { MetaData } from '../../components/common/meta'
import { useLang, getTranslation } from '../../utils/use-lang'
import { relativeUrl, resolveUrl } from "../../utils/relativeUrl"
import { Link } from 'gatsby'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const PostDoc = ({ data, location, pageContext }) => {
    const post = data.currentPost
    const posts = data.allGhostPost.edges
    const nextPost = data.nextPost
    const previousPost = data.previousPost
    const t = getTranslation(useLang())
    const {
        breadcrumb: { crumbs },
    } = pageContext
    const capitalize = s => s && s[0].toUpperCase() + s.slice(1)
    post.url = resolveUrl(pageContext.collectionPath, post.url)
    if (previousPost) {
        previousPost.url = resolveUrl(pageContext.collectionPath, previousPost.url)
    }
    if (nextPost) {
        nextPost.url = resolveUrl(pageContext.collectionPath, nextPost.url)
    }

    const setup = () => {
    // Return if no post box exists
        const markdown = document.querySelector(`.js-kusi-doc`)
        if (!markdown) {
            return
        }

        // Search the titles in the post
        // Return if no title exists
        const argTitles = [`h1`, `h2`, `h3`]
        const titles = markdown.querySelectorAll(argTitles.join(`,`))

        if (!titles.length) {
            return
        }

        // Table of Contents Box
        const jsTableOfContent = document.querySelector(`.js-table-content`)
        const sidebar = document.querySelector(`.js-sidebar-right`)

        if (sidebar) {
            document.querySelector(`.js-sidebar-wrap`).classList.remove(`hidden`)
        }

        // Table of Content sidebar right
        function tableOfContent(link, el) {
            if (!jsTableOfContent) {
                return
            }

            link.textContent = el.textContent

            const tocList = document.createElement(`li`)

            if (el.closest(`h3`)) {
                link.classList = `py-1 pl-3 block text-xs hover:text-primary`
            } else {
                link.classList = `py-2 block hover:text-primary`
            }

            tocList.appendChild(link)
            jsTableOfContent.appendChild(tocList)
        }

        // Links To Titles
        function linkToTile(link, el) {
            link.setAttribute(`aria-hidden`, `true`)
            link.innerHTML = `<svg class="icon is-stroke" aria-hidden="true"><use xlink:href="#icon-link"></use></svg>`
            link.classList = `anchor px-3 inline-block invisible opacity-0 -ml-12 text-gray-500`

            el.insertBefore(link, el.childNodes[0])
        }

        titles.forEach((el) => {
            el.classList = `hover-title`

            const titleLink = document.createElement(`a`)
            titleLink.href = `#${el.getAttribute(`id`)}`

            // Table of Content
            tableOfContent(titleLink.cloneNode(true), el)

            // Link To Title
            linkToTile(titleLink, el)
        })
    }

    useEffect(() => {
        setup()
    }, [])

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout footer={true} bodyClass="bg-gray-100" isPost={true}>
                <div className="max-w-extreme mx-auto flex flex-col pb-16 px-4 lg:flex-row">
                    {/* {{!-- Navigating the documentation --}} */}
                    <div className="sidebar flex-none border-r border-gray-300 order-2 md:w-64 lg:order-none" style={{ borderColor: `var(--border-color)` }}>
                        <div className="sticky top-16 pr-5">
                            <nav className="py-12 overflow-y-auto lg:max-h-(screen-16) scroll-transparent">
                                <div className="uppercase font-medium text-sm text-gray-600 mb-3 px-2">{t(`Getting_Started`, `Getting Started`)}</div>

                                <ul itemScope itemType="http://www.schema.org/SiteNavigationElement" role="menu" className="leading-tight text-base">
                                    {/* {{#get "posts" filter="tags:{{tags.[0].slug}}" limit="all" order="published_at asc"}}

                                    {{!-- {{#get "posts" filter="tags:{{primary_tag.slug}}" limit="all" order="published_at asc"}} --}} */}

                                    {posts.map((item) => {
                                        const post = item.node
                                        post.url = resolveUrl(pageContext.collectionPath, post.url)
                                        return (
                                            <li itemProp="name" role="menuitem" key={item.node.id}>
                                                <Link
                                                    to={relativeUrl(item.node.url)}
                                                    className="menu-link p-2 flex hover:text-primary relative transition-colors duration-200"
                                                    activeClassName="is-active text-primary pl-4 font-medium"
                                                    itemProp="url">
                                                    <span className="menu-link-bg rounded-md absolute inset-0 bg-primary opacity-0"></span>
                                                    <span className="relative">{item.node.title}</span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* {{!-- content of the documentation --}} */}
                    <article className="py-4 md:py-12 flex-grow">
                        <div className="max-w-2xl mx-auto md:px-4">
                            <header>
                                <div className="mb-4 text-sm text-gray-500 noWrapWithEllipsis">
                                    {crumbs.map((crumb, i) => (
                                        <span key={i}>
                                            <Link className="hover:text-primary" to={crumb.pathname} key={crumb.pathname}>{capitalize(crumb.crumbLabel)}</Link>
                                            {i < crumbs.length - 1 && <>{` `}<svg key={i} className="icon h-3 w-3"><use xlinkHref="#icon-arrow-forward"></use></svg>{` `}</>
                                            }
                                        </span>
                                    ))}
                                </div>
                                <h1 className="text-title">{post.title}</h1>
                            </header>

                            <section className="post-body font-sans has-sidebar text-base leading-relaxed js-kusi-doc" dangerouslySetInnerHTML={{ __html: post.childHtmlRehype.html }}>
                            </section>
                            {/* {{!-- Button to edit on GitHub - add link on Facebook description --}} */}
                            {post.og_description &&
                                <p className="mt-10">
                                    <a className="edit-on-github godo-tracking button is-outlined is-primary"
                                        href={post.og_description}
                                        data-event-category="Kusi Doc"
                                        data-event-action={post.tags[0].name}
                                        data-event-label={post.title}
                                        data-event-non-interaction="true">
                                        <svg className="icon mr-2"><use xlinkHref="#icon-github"></use></svg>
                                        <span>Edit this page on GitHub</span>
                                    </a>
                                </p>
                            }
                            <hr className="my-10" />
                            <div className="flex justify-between text-gray-500">
                                <div>
                                    {previousPost &&
                                        <Link to={relativeUrl(previousPost.url)} className="hover:underline">← {previousPost.title}</Link>
                                    }
                                </div>

                                <div>
                                    {nextPost &&
                                        <Link to={relativeUrl(nextPost.url)} className="hover:underline">{nextPost.title} →</Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* {{!-- Table of Contents --}} */}
                    <aside className="js-sidebar-right flex flex-col flex-none pt-8 pl-5 mb-12 order-2 md:w-64 lg:order-none lg:hidden xl:flex">
                        <div className="sticky top-24 js-sidebar-wrap hidden">
                            <div className="pt-4 pb-10 overflow-y-auto scroll-transparent lg:max-h-(screen-16)">
                                <div className="uppercase font-medium text-sm text-gray-600 mb-3">{t(`On_this_page`), `On this page`}</div>
                                <ul className="text-sm js-table-content leading-tight"></ul>
                            </div>
                        </div>
                    </aside>
                </div>
            </Layout>
        </>
    )
}

PostDoc.propTypes = {
    data: PropTypes.shape({
        currentPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            childHtmlRehype: PropTypes.object.isRequired,
            primary_tag: PropTypes.object,
            feature_image: PropTypes.string,
            id: PropTypes.string.isRequired,
            tags: PropTypes.array,
            og_description: PropTypes.string,
            url: PropTypes.string.isRequired,
        }).isRequired,
        nextPost: PropTypes.shape({
            url: PropTypes.string,
            title: PropTypes.string,
            feature_image: PropTypes.string,
            excerpt: PropTypes.string,
        }),
        previousPost: PropTypes.shape({
            url: PropTypes.string,
            title: PropTypes.string,
            feature_image: PropTypes.string,
            excerpt: PropTypes.string,
        }),
        relatedPosts: PropTypes.shape({
            edges: PropTypes.array.isRequired,
        }).isRequired,
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.object,
}

export default PostDoc

export const postQuery = graphql`
    query($slug: String!, $next: String, $prev: String, $primary_tag: String) {
        currentPost: ghostPost(slug: { eq: $slug }) {
            localFeatureImage {
                childImageSharp {
                gatsbyImageData(
                    transformOptions: {
                        fit: COVER, cropFocus: ATTENTION
                    }
                    width: 2000
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    )
                }
            }
            authors {
                localProfileImage {
                    childImageSharp {
                        gatsbyImageData(
                            transformOptions: {
                                fit: COVER, cropFocus: ATTENTION
                            }
                        width: 36
                        height: 36
                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                        )
                    }
                }
            }
            ...GhostPostFields
        }
        nextPost: ghostPost(slug: { eq: $next }) {
            url
            title
            feature_image
            localFeatureImage {
            childImageSharp {
            gatsbyImageData(
                transformOptions: {
                    fit: COVER, cropFocus: ENTROPY
                    }
                aspectRatio: 1.84
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                )
            }
        }
            excerpt
        }
        previousPost: ghostPost(slug: { eq: $prev }) {
            url
            title
            feature_image
            localFeatureImage {
            childImageSharp {
            gatsbyImageData(
                transformOptions: {
                    fit: COVER, cropFocus: ENTROPY
                    }
                aspectRatio: 1.84
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                )
            }
        }
            excerpt
        }
        relatedPosts: allGhostPost(
            filter: {
                slug: {ne: $slug}, primary_tag: {slug: {eq: $primary_tag}}, tags: {elemMatch: {name: {nin: ["#portfolio","#podcast"]}}}
                },
            sort: { order: DESC, fields: [published_at] },
            limit: 6,
        ) {
            edges {
                node {
                    url
                    title
                    feature_image
                    localFeatureImage {
                        childImageSharp {
                        gatsbyImageData(transformOptions: {
                                fit: COVER, cropFocus: ATTENTION
                            }
                            width: 720

                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                            )
                        }
                    }
                    excerpt
                    html
                    reading_time
                    created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
                    published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
                    updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")
                    published_at
                    updated_at
                    internal {
                        type
                    }
                }
            }
        }
        allGhostPost(
            sort: { order: ASC, fields: [published_at] },
            filter: {tags: {elemMatch: {name: {in: ["#custom-kusi-doc"]}}}}
        ) {
            edges {
                node {
                    localFeatureImage {
                        childImageSharp {
                        gatsbyImageData(transformOptions: {
                                fit: COVER, cropFocus: ATTENTION
                            }
                            width: 720

                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                            )
                        }
                    }
                    authors {
                        localProfileImage {
                            childImageSharp {
                                gatsbyImageData(
                                    transformOptions: {
                                        fit: COVER, cropFocus: ATTENTION
                                    }
                                width: 36
                                height: 36
                                placeholder: BLURRED
                                formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
                    }
                    ...GhostPostFields
                }
            }
        }
    }
`
