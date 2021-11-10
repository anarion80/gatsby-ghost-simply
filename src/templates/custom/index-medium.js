/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, StoryGrid, Pagination } from '../../components/common'
import HomeSmallPost from '../../components/common/home/HomeSmallPost'
import HomeFirstPost from '../../components/common/home/HomeFirstPost'
import HomeMediumPost from '../../components/common/home/HomeMediumPost'
import { MetaData } from '../../components/common/meta'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const IndexMedium = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} footer={true} isPost={false} bodyClass="is-home is-frontpage">
                {(pageContext.pageNumber > 0) ?
                    <div className="site-post feed-entry-content container mx-auto pt-12">
                        <div className="feed-entry-wrap max-w-1100 mx-auto">
                            <div className="row">
                                {posts.map((item, i) => {
                                    if (i === 6 || i === 7) {
                                        return <div className="col s12 m6 ss2" key={i}><StoryGrid key={item.node.id} post={item.node} /></div>
                                    } else {
                                        return <div className="col s12 m6 l4" key={i}><StoryGrid key={item.node.id} post={item.node} /></div>
                                    }
                                }
                                )}
                                <Pagination pageContext={pageContext} />
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <section className="homeHero pt-10">
                            <div className="homeHero-container container mx-auto flex flex-col items-stretch md:flex-row md:flex-wrap lg: lg:flex-nowrap">
                                {/*{posts.map((item, i) => {
                                    if (i === 0) {
                                        return <HomeFirstPost post={item.node} />
                                    } else if (i > 0 && i < 4) {
                                        return <div className="homeHero-smallCardWrap flex flex-col md:w-3/6 lg:w-full">
                                            <HomeSmallPost post={item.node} last={i === 3 ? true : false } />
                                        </div>
                                    } else if (i === 4) {
                                        return <HomeMediumPost post={item.node} />
                                    } else {
                                        return null
                                    }
                                })} */}

                                {/* {}!--} First Large Post - partials/home/home-first-post.hbs --} */}
                                <HomeFirstPost post={posts[0].node} />

                                {/* {}!--} Post small - partials/home/home-small-post.hbs --} */}
                                <div className="homeHero-smallCardWrap flex flex-col md:w-3/6 lg:w-full">
                                    {posts.map((item, i) => {
                                        if (i > 0 && i < 4) {
                                            return <HomeSmallPost post={item.node} key={item.node.id} last={i === 3 ? true : false } />
                                        } else {
                                            return null
                                        }
                                    })}
                                </div>

                                {/* {}!--} Post medium - partials/home/home-medium-post.hbs --} */}
                                {posts.map((item, i) => {
                                    if (i === 4) {
                                        return <HomeMediumPost post={item.node} key={item.node.id} />
                                    } else {
                                        return null
                                    }
                                })}
                            </div>
                        </section>
                        <div className="site-post feed-entry-content container mx-auto pt-12">
                            <div className="feed-entry-wrap max-w-1100 mx-auto">
                                <div className="row">
                                    {posts.map((item, i) => {
                                        if (i > 4 && i < 14) {
                                            if (i === 11 || i === 12) {
                                                return <div className="col s12 m6 ss2" key={i}>
                                                    <StoryGrid key={item.node.id} post={item.node} />
                                                </div>
                                            } else if (i === 13) {
                                                return <div className="col s12 m6 l12 ss1" key={i}>
                                                    <StoryGrid key={item.node.id} post={item.node} />
                                                </div>
                                            } else {
                                                return <div className="col s12 m6 l4" key={i}>
                                                    <StoryGrid key={item.node.id} post={item.node} />
                                                </div>
                                            }
                                        } else {
                                            return null
                                        }
                                    })}
                                    <Pagination pageContext={pageContext} />
                                </div>
                            </div>
                        </div>
                    </>
                }
            </Layout>
        </>
    )
}

IndexMedium.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default IndexMedium

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostMediumQuery($limit: Int!, $skip: Int!) {
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
