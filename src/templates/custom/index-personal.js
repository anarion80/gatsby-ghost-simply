/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../../components/common'
import MediaCover from '../../components/common/MediaCover'
import { MetaData } from '../../components/common/meta'
import { getImage } from "gatsby-plugin-image"

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const IndexPersonal = ({ data, location }) => {
    //const posts = data.allGhostPost.edges
    //const featuredPost = posts.filter(item => item.node.featured).length > 0 ? posts.filter(item => item.node.featured)[0].node : undefined
    const featuredPost = data.ghostPage
    const image = featuredPost ? getImage(featuredPost.localFeatureImage) : undefined

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} footer={false} isPost={false} bodyClass="has-cover is-head-transparent overflow-hidden">

                <article className="simply-hero-cover flex items-center justify-center relative min-h-screen py-24 bg-dark">
                    {/* {!-- Featured Media - partials/components/media-cover.hbs --} */}
                    {featuredPost.feature_image &&
                        <MediaCover background={image} hasGradient={true} altTitle={featuredPost.title} />
                    }

                    <div className="mx-auto max-w-740 px-4 p-24 z-3 text-white text-center">
                        <h1 className="mb-6 text-5xl md:text-6xl tracking-wider animated bounceIn">{featuredPost.title}</h1>
                        <div className="text-3xl md:text-32" dangerouslySetInnerHTML={{ __html: featuredPost.html }}></div>
                    </div>

                    {/* {!-- Social Media - partilas/widget/social-media.hbs --} */}
                    {/* <SocialMediaWidget site={site} className="absolute right-0 bottom-0 mr-8 mb-8 text-white z-2 flex-col hidden md:flex" /> */}
                </article>
            </Layout>
        </>
    )
}

IndexPersonal.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default IndexPersonal

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostPersonalQuery {
    ghostPage (slug: {eq: "home-personal"})
    {
        localFeatureImage {
                childImageSharp {
                gatsbyImageData(transformOptions: {
                        fit: COVER, cropFocus: ATTENTION
                    }
                    width: 2000

                    placeholder: BLURRED
                    formats: [AUTO, WEBP]
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
                             formats: [AUTO, WEBP]
                         )
                     }
                 }
             }
        ...GhostPageFields
    }
  }
`
