import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Layout, Author, MediaCover, PrimaryTag } from '../../components/common'
import { MetaData } from '../../components/common/meta'
import ArticleBody from '../../components/article/ArticleBody'
import ArticleRelated from '../../components/article/ArticleRelated'
import { resolveUrl } from '../../utils/relativeUrl'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const PostImage = ({ data, location, pageContext }) => {
    const post = data.currentPost
    const prevPost = data.previousPost
    const nextPost = data.nextPost
    const relatedPosts = data.relatedPosts.edges
    const tags = post.tags.map(item => item.name)
    post.url = resolveUrl(pageContext.collectionPath, post.url)
    if (prevPost) {
        prevPost.url = resolveUrl(pageContext.collectionPath, prevPost.url)
    }
    if (nextPost) {
        nextPost.url = resolveUrl(pageContext.collectionPath, nextPost.url)
    }

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout footer={true} bodyClass="is-article has-cover is-head-transparent" isPost={true}>

                <article className="post mb-10 relative">
                    <div className="postImage relative simply-hero-cover bg-dark min-h-lg lg:min-h-screen py-24">
                        {/* {!-- Featured Media - partials/components/media-cover.hbs --} */}
                        <MediaCover background={post.localFeatureImage} hasGradient={true} altTitle={post.title} />

                        <header className="post-header mx-auto max-w-740 px-4 p-24 relative z-3">
                            {post.primary_tag && <div className="mb-3 text-white tracking-wider text-sm"><PrimaryTag tag={post.primary_tag} tagClass="uppercase hover:underline"/></div>}

                            <h1 className="post-title mb-5 text-white text-4xl lg:text-5xl leading-tight">{post.title}</h1>
                            {post.custom_excerpt &&
                                     <p className="post-excerpt mb-8 text-2xl text-white leading-snug">{post.custom_excerpt}</p>
                            }

                            {/* {!-- [Author, DateTime, Reading Time] - ./partials/components/author-meta.hbs --} */}
                            <Author post={post} />
                        </header>
                    </div>

                    {/* {!-- Article Body - partials/article/article-body.hbs --} */}
                    <ArticleBody post={post} nextPost={nextPost} prevPost={prevPost} />
                </article>
                {(!tags.includes(`#podcast`) && !tags.includes(`#portfolio`)) && <ArticleRelated relatedPosts={relatedPosts} />}
            </Layout>
        </>
    )
}

PostImage.propTypes = {
    data: PropTypes.shape({
        currentPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            primary_tag: PropTypes.object,
            feature_image: PropTypes.string,
            localFeatureImage: PropTypes.object,
            id: PropTypes.string.isRequired,
            custom_excerpt: PropTypes.string,
            tags: PropTypes.array,
            url: PropTypes.string.isRequired,
        }).isRequired,
        nextPost: PropTypes.shape({
            url: PropTypes.string,
            title: PropTypes.string,
            feature_image: PropTypes.string,
            excerpt: PropTypes.string,
        }),
        previousPost: PropTypes.shape({
            url: PropTypes.string,
            title: PropTypes.string,
            feature_image: PropTypes.string,
            excerpt: PropTypes.string,
        }),
        relatedPosts: PropTypes.shape({
            edges: PropTypes.array.isRequired,
        }).isRequired,
        //allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired,
}

export default PostImage

export const postQuery = graphql`
    query($slug: String!, $next: String, $prev: String, $primary_tag: String) {
        currentPost: ghostPost(slug: { eq: $slug }) {
            localFeatureImage {
                childImageSharp {
                gatsbyImageData(
                    transformOptions: {
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
        nextPost: ghostPost(slug: { eq: $next }) {
            url
            title
            feature_image
            localFeatureImage {
            childImageSharp {
            gatsbyImageData(
                transformOptions: {
                    fit: COVER, cropFocus: ENTROPY
                    }
                aspectRatio: 1.84
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                )
            }
        }
            excerpt
        }
        previousPost: ghostPost(slug: { eq: $prev }) {
            url
            title
            feature_image
            localFeatureImage {
            childImageSharp {
            gatsbyImageData(
                transformOptions: {
                    fit: COVER, cropFocus: ENTROPY
                    }
                aspectRatio: 1.84
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                )
            }
        }
            excerpt
        }
        relatedPosts: allGhostPost(
            filter: {
                slug: {ne: $slug}, primary_tag: {slug: {eq: $primary_tag}}, tags: {elemMatch: {name: {nin: ["#portfolio","#podcast","#custom-kusi-doc"]}}}
                },
            sort: { order: DESC, fields: [published_at] },
            limit: 6,
        ) {
            edges {
                node {
                    url
                    title
                    feature_image
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
                    excerpt
                    html
                    reading_time
                    created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
                    published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
                    updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")
                    published_at
                    updated_at
                    internal {
                        type
                    }
                }
            }
        }
    }
`
