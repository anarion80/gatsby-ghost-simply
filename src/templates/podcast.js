import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'
import StoryPodcast from "../components/common/story/StoryPodcast"
import { StaticImage } from "gatsby-plugin-image"
import { resolveUrl } from "../utils/relativeUrl"

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Podcast = ({ data, pageContext }) => {
    //const page = data.ghostPage
    const posts = data.allGhostPost.edges

    return (
        <>
            <Layout footer={true} isPost={false} bodyClass="is-podcast has-cover is-head-transparent">
                <div className="spc-header simply-hero-cover flex items-center justify-center relative min-h-lg py-24 px-4 bg-dark overflow-hidden">

                    <article className="spc-h-inner max-w-4xl relative flex flex-col text-center z-3 pt-16 text-white text-2xl md:text-3xl animated bounceIn">
                        <h1 className="spc-h-t text-white text-5xl md:text-6xl" >Podcasts</h1>
                        <p className="spc-h-e">The Podcast</p>
                        <p className="spc-des">Updates and behind the scenes stories about the world of Ghost. Hosted by Ghost founders <em>John O&apos;Nolan</em> &amp; <em>Hannah Wolfe</em>.</p>
                        {/* <p className="spc-des" dangerouslySetInnerHTML={{ __html: page.html }}></p> */}
                        <div className="spc-buttons">

                            <a href="https://itunes.apple.com/" className="button">
                                <StaticImage src="../images/icon-itunes.png" alt="iTunes Logo" rel="presentation" height={20} style={{ margin: `0 0.5rem 0 0` }}/>
                                <span>iTunes</span>
                            </a>&nbsp;

                            <a href="https://www.pocketcasts.com/" className="button">
                                <StaticImage src="../images/icon-pocketcasts.png" alt="Pocket Casts Logo" rel="presentation" height={20} style={{ margin: `0 0.5rem 0 0` }}/>
                                <span>Pocket Casts</span>
                            </a>&nbsp;

                            <a href="https://anchor.fm/" className="button">
                                <StaticImage src="../images/icon-rss.png" alt="RSS Icon" rel="presentation" height={20} style={{ margin: `0 0.5rem 0 0` }}/>
                                <span>RSS</span>
                            </a>

                        </div>

                    </article>

                    {/* <MediaCover background={page.localFeatureImage} hasGradient={true} altTitle={page.title} /> */}
                </div>
                <div className="feed-entry-content py-12 px-4">
                    <div className="mx-auto max-w-4xl feed-entry-wrap">
                        {posts.map((item) => {
                            const post = item.node
                            post.url = resolveUrl(pageContext.collectionPath, post.url)
                            return <StoryPodcast post={post} key={item.node.id}/>
                        })}

                        <Pagination pageContext={pageContext} />
                    </div>
                </div>
            </Layout>
        </>
    )
}

Podcast.propTypes = {
    data: PropTypes.shape({
        //ghostPage: PropTypes.object.isRequired,
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired,
}

export default Podcast

export const Head = ({ data, location }) => {
    Head.propTypes = {
        data: PropTypes.object.isRequired,
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
        }).isRequired,
    }

    return <MetaData
        data={data}
        location={location}
        title="Podcasts"
        description="Podcasts page"
        type="WebSite"
    />
}

export const podcastQuery = graphql`
    query($limit: Int!, $skip: Int!) {
        allGhostPost(
            sort: {published_at: DESC}
            filter: {tags: {elemMatch: {name: {in: ["#podcast"]}}}}
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
                    ...GhostPostFields
                }
            }
        }
    }
`
