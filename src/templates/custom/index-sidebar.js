/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, StoryGrid, Pagination } from '../../components/common'
import { MetaData } from '../../components/common/meta'
import Sidebar from '../../components/common/sidebar/Sidebar'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const IndexSidebar = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges
    //const featuredPost = posts.filter(item => item.node.featured).length > 0 ? posts.filter(item => item.node.featured)[0].node : undefined

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} isPost={false} footer={true} bodyClass="is-frontpage">
                <div className="container mx-auto px-4 py-16">
                    <div className=" max-w-1100 mx-auto">
                        <div className="row">
                            <div className="col s12 l7">
                                <div className="feed-entry-content">
                                    <div className="feed-entry-wrap slist">
                                        {posts.map(item => <StoryGrid key={item.node.id} post={item.node} />)}
                                    </div>
                                </div>
                            </div>

                            <div className="col s12 l1"></div>

                            <Sidebar posts={posts.filter(item => item.node.featured)}/>
                            <Pagination pageContext={pageContext} />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

IndexSidebar.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default IndexSidebar

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostSidebarQuery($limit: Int!, $skip: Int!) {
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
  }
`
