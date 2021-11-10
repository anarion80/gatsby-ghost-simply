/* eslint-disable max-lines */
import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../../components/common'
import { Link } from "gatsby"
import { MetaData } from '../../components/common/meta'
import PrimaryTag from "../../components/common/PrimaryTag"
import { relativeUrl } from "../../utils/relativeUrl"
import DateTimeComponent from "../../components/common/DateTimeComponent"
import MediaCover from "../../components/common/MediaCover"
import Author from '../../components/common/Author'
//import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider"

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const IndexPhotographer = ({ data, location }) => {
    const posts = data.allPosts.edges
    //const featuredPosts = posts.filter(item => item.node.featured).length > 0 ? posts.filter(item => item.node.featured).slice(0,3) : undefined
    const featuredPosts = data.featuredPosts.edges

    useEffect(() => {
        const isSSR = typeof window === `undefined`
        if (!isSSR) {
            require(`tiny-slider/src/tiny-slider`).tns({
                container: `.simply-slider`,
                loop: true,
                mouseDrag: true,
                items: 1,
                nav: false,
                speed: 400,
                autoplay: true,
                autoplayButtonOutput: false,
                prevButton: `.simply-slider-prev`,
                nextButton: `.simply-slider-next`,
                mode: `gallery`,
            })
        }
    }, [])

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} footer={false} isPost={false} bodyClass="is-photographer has-cover is-head-transparent">

                {/* {!-- Featured Story --} */}
                {featuredPosts &&
                <div className="simply-hero-cover relative bg-dark">
                    <div className="simply-slider flex overflow-hidden">
                        {featuredPosts.map(item => (
                            <article className="overflow-hidden bg-dark flex-none relative z-2" key={item.node.id}>
                                <div className="px-4 py-vw8 min-h-lg h-screen flex items-center justify-center">
                                    <div className="max-w-1100 mx-auto text-center">
                                        {/* {!-- Primary Tag- partials/components/primary-tag.hbs --} */}
                                        {item.node.primary_tag && <div className="mb-4"><PrimaryTag tag={item.node.primary_tag} tagClass=" relative z-3"/></div>}

                                        <h2 className="text-4xl md:text-7xl font-semibold leading-tight mb-4">
                                            <Link to={relativeUrl(item.node.url)} className="text-white relative z-3">{item.node.title}</Link>
                                        </h2>

                                        {/* {!-- Date Time and reading Time - ./partials/components/datetime.hbs --} */}
                                        <DateTimeComponent dateTimeClass="relative z-3 text-white opacity-80 justify-center" post={item.node} />
                                    </div>
                                </div>

                                {/* {!-- Featured Media - partials/components/media-cover.hbs --} */}
                                <Link to={relativeUrl(item.node.url)}><MediaCover background={item.node.localFeatureImage} hasGradient={true} altTitle={item.node.title} /></Link>
                            </article>
                        ))}
                    </div>

                    <div className="simply-slider-prev absolute bottom-0 lg:bottom-1/2 right-16 lg:right-auto lg:left-4 text-white cursor-pointer opacity-30 hover:opacity-100 focus:outline-none">
                        <svg className="w-12 h-12 fill-current -mt-6 rotate-180 transform"><use xlinkHref="#icon-arrow-forward"></use></svg>
                    </div>

                    <div className="simply-slider-next absolute bottom-0 lg:bottom-1/2 right-4 text-white cursor-pointer opacity-30 hover:opacity-100 focus:outline-none">
                        <svg className="w-12 h-12 fill-current -mt-6"><use xlinkHref="#icon-arrow-forward"></use></svg>
                    </div>

                </div>
                }

                <div className="feed-entry-content">
                    <div className="feed-entry-wrap">
                        <div className="row is-gapless">
                            {posts.map(item => (
                                <article className="col s12 m6 l4 relative story-cover min-h-lg" key={item.node.id}>

                                    {/* {!-- Featured Media - partials/components/media-cover.hbs --} */}
                                    <figure className="story-cover-thumbnail overflow-hidden pt-96">
                                        <Link to={relativeUrl(item.node.url)}><MediaCover background={item.node.localFeatureImage} hasGradient={true} altTitle={item.node.title} /></Link>
                                    </figure>

                                    <header className="absolute bottom-0 left-0 right-0 text-white px-4 py-10">
                                        {/* {!-- Primary Tag- partials/components/primary-tag.hbs --} */}
                                        {item.node.primary_tag && <div className="mb-4"><PrimaryTag tag={item.node.primary_tag} tagClass="relative z-3"/></div>}

                                        <h2 className="text-4xl leading-tight mb-4"><Link className="relative z-3" to={relativeUrl(item.node.url)}>{item.node.title}</Link></h2>

                                        {/* {!-- Author - Primary Tag - Datetime - Read time - ./partials/components/author-meta.hbs --} */}
                                        <Author post={item.node} />
                                    </header>

                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

IndexPhotographer.propTypes = {
    data: PropTypes.shape({
        allPosts: PropTypes.object.isRequired,
        featuredPosts: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default IndexPhotographer

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostPhotographerQuery($limit: Int!, $skip: Int!) {
    allPosts: allGhostPost(
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
      }
    }
    featuredPosts: allGhostPost(
            limit: 3
            filter: {visibility: {eq: "public"}, featured: {eq: true}}
            sort: {order: DESC, fields: [published_at]}
        ) {
      edges {
        node {
            localFeatureImage {
                childImageSharp {
                gatsbyImageData(transformOptions: {
                        fit: COVER, cropFocus: ATTENTION
                    }
                    width: 1200

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
