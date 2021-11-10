/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, Pagination } from '../../components/common'
import { Link } from 'gatsby'
import { relativeUrl } from "../../utils/relativeUrl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MetaData } from '../../components/common/meta'
import DateTimeComponent from '../../components/common/DateTimeComponent'
import { useLang, getTranslation } from '../../utils/use-lang'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const IndexMediumSidebar = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges
    const tags = data.allGhostTag.edges
    const post = data.ghostPost
    const t = getTranslation(useLang())
    //const featuredPost = posts.filter(item => item.node.featured).length > 0 ? posts.filter(item => item.node.featured)[0].node : undefined
    const featuredPost = post
    const image = featuredPost ? getImage(featuredPost.localFeatureImage) : undefined

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} footer={true} isPost={false} bodyClass="medium-sidebar has-cover is-head-transparent">
                {featuredPost &&
                    <div className="simply-hero-cover u-primaryGradient overflow-hidden pt-16">
                        <div className="mx-auto container py-12 relative flex justify-between flex-col items-center md:flex-row md:py-vw4 md:px-5">
                            <div className="text-white md:pr-5 flex-none text-center md:text-left md:max-w-md lg:max-w-xl">
                                <h1 className="text-5xl pt-5 font-serif lg:text-6xl">{featuredPost.title}</h1>
                                {featuredPost.custom_excerpt &&
                                    <p className="mt-6 text-22">{featuredPost.custom_excerpt}</p>
                                }
                                <Link className="button is-medium is-primary gh-portal-close mt-12" to={relativeUrl(featuredPost.url)}>{t(`Read_more`)}</Link>
                            </div>

                            {featuredPost.feature_image &&
                            <figure className="relative max-w-lg w-full mt-10 hidden md:flex md:mt-0">
                                <GatsbyImage image={image} alt={featuredPost.title} className="blur-up lazyloaded object-cover object-center w-full max-h-96 animated bounceIn"/>
                            </figure>

                            }
                        </div>
                    </div>
                }

                <div className="mx-auto container mt-12 lg:px-5">
                    <div className="row">
                        <div className="col s12 l7 feed-entry-content">
                            <div className="feed-entry-wrap">
                                {posts.map(item => (
                                    <article className="mb-12 flex justify-between items-center" key={item.node.id}>
                                        <header className="mr-5 w-full" key={item.node.id}>
                                            <div className="mb-2 flex flex-row items-center" key={item.node.id}>
                                                <Link to={relativeUrl(item.node.primary_author.url)} title={`${t(`Go_to_the_profile_of`)} ` + item.node.primary_author.name}>
                                                    <img
                                                        className="w-5 h-5 object-cover rounded-full"
                                                        src={ item.node.primary_author.profile_image ? item.node.primary_author.profile_image : `images/avatar.png`}
                                                        alt={`${t(`Go_to_the_profile_of`)} ` + item.node.primary_author.name}
                                                        width="20"
                                                        height="20"
                                                    />
                                                </Link>

                                                <div className="ml-2 text-sm">
                                                    <Link to={relativeUrl(item.node.primary_author.url)} title={`${t(`Go_to_the_profile_of`)} ` + item.node.primary_author.name}>{item.node.primary_author.name}</Link>
                                                    {item.node.primary_tag &&
                                                        <><span className="text-gray-500"> {t(`in`)} </span><Link to={relativeUrl(item.node.primary_tag.url)}>{item.node.primary_tag.name}</Link></>
                                                    }
                                                </div>
                                            </div>

                                            <Link to={relativeUrl(item.node.url)} >
                                                <h2 className="text-2xl lineClamp-2 text-title leading-tight">{item.node.title}</h2>
                                                {item.node.excerpt && <p className="mt-2 text-gray-500 text-base lineClamp-2">{item.node.excerpt.split(``).splice(0,150).join(``)}</p>}
                                            </Link>

                                            {/* {!-- Date Time and reading Time - ./partials/components/datetime.hbs --} */}
                                            <DateTimeComponent post={item.node} dateTimeClass="mt-3 text-gray-500 text-sm" />
                                        </header>

                                        {item.node.feature_image &&
                                            <Link to={relativeUrl(item.node.url)} className="flex-none" >
                                                <GatsbyImage image={getImage(item.node.localFeatureImage)} alt={item.node.title} className="block lazyload h-32 object-cover w-52"/>
                                            </Link>
                                        }
                                    </article>
                                )
                                )}

                                <Pagination pageContext={pageContext} />
                            </div>
                        </div>

                        <div className="col s12 l1"></div>

                        {/* {!-- sidebar --} */}
                        <aside className="sidebar col s12 l4 flex flex-col flex-1 justify-start mt-12 lg:mt-0">
                            <div className="lg:sticky lg:top-28">
                                <h3 className="uppercase text-sm mb-4">{t(`Discover_more_of_what_matters_to_you`)}</h3>
                                <div className="buttons">
                                    {tags.map(item => <Link to={relativeUrl(item.node.url)} key={item.node.id} className="button is-light font-medium text-sm capitalize">{item.node.name}</Link>)}
                                </div>
                                <hr />
                            </div>
                        </aside>
                    </div>
                </div>
            </Layout>
        </>
    )
}

IndexMediumSidebar.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
        allGhostTag: PropTypes.object.isRequired,
        ghostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default IndexMediumSidebar

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostMediumSidebarQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        filter: {tags: {elemMatch: {name: {nin: ["#podcast","#portfolio","#custom-kusi-doc"]}}}},
        limit: $limit,
        skip: $skip
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
    allGhostTag(
            limit: 10
            filter: {visibility: {eq: "public"}}
            sort: {fields: postCount, order: DESC}
        ) {
            edges {
                node {
                    name
                    slug
                    url
                    canonical_url
                    accent_color
                    id
                    postCount
                }
            }
        }
    ghostPost (featured: {eq: true})
    {
        title
        custom_excerpt
        excerpt
        feature_image
        url
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
    }
  }
`
