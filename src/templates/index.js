/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, StoryGrid, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} footer={true} isPost={false} bodyClass="is-frontpage">
                <div className="site-post feed-entry-content container mx-auto pt-10">
                    <div className="feed-entry-wrap max-w-1100 mx-auto">
                        <div className="row">
                            {posts.map((item, i) => {
                                if (i === 0) {
                                    return <div className="col s12 m6 l12 ss1" key={i}>
                                        <StoryGrid key={item.node.id} post={item.node} />
                                    </div>
                                } else if (i === 4 || i === 5) {
                                    return <div className="col s12 m6 ss2" key={i}>
                                        <StoryGrid key={item.node.id} post={item.node} />
                                    </div>
                                } else {
                                    return <div className="col s12 m6 l4" key={i}>
                                        <StoryGrid key={item.node.id} post={item.node} />
                                    </div>
                                }
                            })}

                            <Pagination pageContext={pageContext} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        filter: {tags: {elemMatch: {name: {nin: ["#podcast","#portfolio","#custom-kusi-doc"]}}}}
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
  }
`
