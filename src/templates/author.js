import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'
import { StoryGrid } from '../components/common'
import MediaCover from '../components/common/MediaCover'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { StaticImage } from 'gatsby-plugin-image'
import { useLang, getTranslation } from '../utils/use-lang'

/**
* Author page (/author/:slug)
*
* Loads all posts for the requested author incl. pagination.
*
*/
const Author = ({ data, location, pageContext }) => {
    const author = data.ghostAuthor
    const posts = data.allGhostPost.edges
    const t = getTranslation(useLang())
    //const twitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
    //const facebookUrl = author.facebook ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}` : null

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="profile"
            />
            <Layout footer={true} isPost={false} bodyClass="is-author has-cover is-head-transparent">
                <div className="simply-hero-cover author shadow flex items-center justify-center relative min-h-lg py-24 bg-dark">
                    {/*{{!-- Featured Media - partials/components/media-cover.hbs --}} */}
                    <MediaCover background={author.localCoverImage} hasGradient={true} altTitle={author.name} />
                    <article className="container relative flex flex-col text-center z-3 pt-16">

                        {/*{!-- Author avatar --}*/}
                        <figure className="author-avatar animated bounceInDown relative mx-auto">
                            {author.profile_image ?
                                <GatsbyImage image={getImage(author.localProfileImage)} className="avatar is-100x100 rounded-full object-cover" alt={`${t(`Hi_I_m`)} ` + author.name} />
                                : <StaticImage src="../images/avatar.png" className="avatar is-100x100 rounded-full object-cover" alt={`${t(`Hi_I_m`)} ` + author.name} />
                            }
                        </figure>

                        {/*{!-- Author name --}*/}
                        <h1 className="cover-title animated bounceIn text-4xl lg:text-5xl underscore is-center mt-5 text-white">{author.name}</h1>

                        {/*{!-- author biography --}*/}
                        {author.bio && <p className="cover-des mx-auto mb-8 text-xl text-white max-w-3xl">{author.bio}</p>}

                        {/*{!-- Author (Location - website - RSS) --}*/}
                        <div className="author-meta buttons justify-center">
                            {author.location &&
                                <span className="author-location button is-transparent">
                                    <svg className="icon is-stroke"><use xlinkHref="#icon-map"></use></svg>
                                    <span>{author.location}</span>
                                </span>
                            }

                            {author.website &&
                                <a href={author.website} className="author-link button is-transparent" target="_blank" rel="noopener noreferrer">
                                    <svg className="icon is-stroke"><use xlinkHref="#icon-link"></use></svg>
                                    <span>{author.website}</span>
                                </a>
                            }

                            <a href={`https://feedly.com/i/subscription/feed/` + author.url + `rss/`} className="author-stats button is-transparent" target="_blank" rel="noopener noreferrer">
                                <svg className="icon"><use xlinkHref="#icon-rss"></use></svg>
                                {/* <span>{{plural ../pagination.total empty=(t "No posts") singular=(t "1 post") plural=(t "% posts")}}</span> */}
                            </a>
                        </div>

                        {/*{!-- Author Facebook and Twitter --}*/}
                        <div className="author-follow buttons justify-center mt-8">
                            {author.facebook &&
                            <a href={author.facebook} title="Facebook" className="button text-white bg-facebook hover:text-white border-0" target="_blank" rel="noopener noreferrer">
                                <svg className="icon"><use xlinkHref="#icon-facebook"></use></svg>
                                <span>Facebook</span>
                            </a>
                            }

                            {author.twitter &&
                            <a href={author.twitter} title={author.twitter} className="button text-white bg-twitter hover:text-white border-0" target="_blank" rel="noopener noreferrer">
                                <svg className="icon"><use xlinkHref="#icon-twitter"></use></svg>
                                <span>Twitter</span>
                            </a>
                            }
                        </div>
                    </article>
                </div>
                <div className="site-post feed-entry-content py-12 px-4">
                    <div className="mx-auto max-w-1100 feed-entry-wrap">
                        <div className="row">
                            {posts.map(({ node }) => (
                                <div className="col s12 m6 l4" key={node.id}>
                                    <StoryGrid post={node} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Pagination pageContext={pageContext} />
            </Layout>
        </>
    )
}

Author.propTypes = {
    data: PropTypes.shape({
        ghostAuthor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            localCoverImage: PropTypes.object,
            profile_image: PropTypes.string,
            localProfileImage: PropTypes.object,
            website: PropTypes.string,
            bio: PropTypes.string,
            location: PropTypes.string,
            facebook: PropTypes.string,
            twitter: PropTypes.string,
            url: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Author

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            localCoverImage{
                childImageSharp {
                    gatsbyImageData(transformOptions: {
                            fit: COVER, cropFocus: ATTENTION
                        }
                        width: 1200
                        height: 628

                        placeholder: BLURRED
                        formats: [AUTO, WEBP, AVIF]
                        )
                    }
                }
                localProfileImage {
                            childImageSharp {
                            gatsbyImageData(
                                transformOptions: {
                                    fit: COVER, cropFocus: ATTENTION
                                }
                                placeholder: BLURRED
                                formats: [AUTO, WEBP, AVIF]
                                )
                            }
                        }
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {
              authors: {elemMatch: {slug: {eq: $slug}}},
              tags: {elemMatch: {name: {nin: ["#podcast","#portfolio","#custom-kusi-doc"]}}},
            },
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
                    authors{
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
