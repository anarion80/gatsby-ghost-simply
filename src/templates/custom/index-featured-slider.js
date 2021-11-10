/* eslint-disable max-lines */
import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, StoryGrid, Pagination } from '../../components/common'
import StoryFeatured from '../../components/common/story/StoryFeatured'
import { MetaData } from '../../components/common/meta'
//import { tns } from "../../../node_modules/tiny-slider/src/tiny-slider"

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const IndexFeaturedSlider = ({ data, location, pageContext }) => {
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
            <Layout isHome={true} footer={true} isPost={false} bodyClass="is-frontpage">

                {/* {!-- Featured Story --} */}
                {featuredPosts &&
                <div className="relative overflow-hidden">
                    <div className="simply-slider flex overflow-hidden">

                        {featuredPosts.map(item => (
                            <StoryFeatured post={item.node} key={item.node.id} />
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

                <div className="site-post feed-entry-content container mx-auto pt-10">
                    <div className="feed-entry-wrap max-w-1100 mx-auto">
                        <div className="row">
                            {posts.map((item, i) => {
                                if (i === 5) {
                                    return <div className="col s12 m6 l12 ss1" key={i}>
                                        <StoryGrid key={item.node.id} post={item.node} />
                                    </div>
                                } else if (i === 3 || i === 4) {
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

IndexFeaturedSlider.propTypes = {
    data: PropTypes.shape({
        allPosts: PropTypes.object.isRequired,
        featuredPosts: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default IndexFeaturedSlider

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostFeaturedSliderQuery($limit: Int!, $skip: Int!) {
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
            ...GhostPostFields
        }
      }
    }
  }
`
