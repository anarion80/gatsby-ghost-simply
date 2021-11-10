/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, StoryGrid, Pagination } from '../../components/common'
import StoryFeatured from '../../components/common/story/StoryFeatured'
import { MetaData } from '../../components/common/meta'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const IndexGrid = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges
    //const featuredPost = posts.filter(item => item.node.featured).length > 0 ? posts.filter(item => item.node.featured)[0].node : undefined
    const featuredPost = data.ghostPost

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} footer={true} isPost={false} bodyClass="is-frontpage">

                {/* {!-- Featured Story --} */}
                {featuredPost && <StoryFeatured post={featuredPost} />}
                <div className="site-post feed-entry-content py-12 px-4">
                    <div className="mx-auto max-w-1100 feed-entry-wrap">
                        <div className="row">
                            {posts.map(item => <div className="col s12 m6 l4" key={item.node.id}><StoryGrid key={item.node.id} post={item.node} /></div>)}
                            <Pagination pageContext={pageContext} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

IndexGrid.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
        ghostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default IndexGrid

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostGridQuery($limit: Int!, $skip: Int!) {
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
    ghostPost (featured: {eq: true})
    {
        title
        custom_excerpt
        excerpt
        feature_image
        url
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")
        created_at
        published_at
        updated_at
        reading_time
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
