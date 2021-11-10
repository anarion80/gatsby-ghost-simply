import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Layout, Author, Tags, SocialShare } from '../../components/common'
import { MetaData } from '../../components/common/meta'
import StoryPreviousNext from '../../components/common/story/StoryPreviousNext'
import ArticleRelated from '../../components/article/ArticleRelated'
import ArticleFeaturedImage from '../../components/article/ArticleFeaturedImage'
import SidebarPost from '../../components/common/sidebar/SidebarPost'
import { resolveUrl } from '../../utils/relativeUrl'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const PostSidebar = ({ data, location, pageContext }) => {
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
            <Layout footer={true} bodyClass="is-article is-sidebar" isPost={true}>
                <div className="container mx-auto px-4 py-16">
                    <div className=" max-w-1100 mx-auto">
                        <div className="row">
                            <div className="col s12 l7">
                                <article>
                                    <header className="story-post-header mb-5">
                                        <h1 className="text-4xl leading-tight text-title mb-5">{post.title}</h1>
                                        {post.custom_excerpt && <p className="post-excerpt my-6 text-xl text-gray-500">{post.custom_excerpt}</p>}
                                        {/* {!-- Author - Primary Tag - Datetime - Read time - ./partials/components/author-meta.hbs --} */}
                                        <Author post={post} />
                                    </header>

                                    { post.feature_image &&
                                        <ArticleFeaturedImage
                                            article={post}
                                            figureClass="story-post-media relative overflow-hidden rounded-lg shadow-3xl"
                                            divClass="story-img block w-full object-cover object-center simply-zoom"
                                            zoomable={true} /> }

                                    <div id="post-body" className="post-body has-sidebar relative" dangerouslySetInnerHTML={{ __html: post.childHtmlRehype.html }}></div>

                                    {/* {!-- Tags - ./partials/components/tags,hbs --} */}
                                    <footer className="post-footer px-4 mx-auto max-w-740 pt-10">
                                        <Tags tags={post.tags} />

                                        {/* {!-- Social Share - ./partials/components/social-share --} */}
                                        <SocialShare post={post} trackingName="Footer" divClass="block" />

                                        {/*{!-- Previous and next article --}*/}
                                        <div className="prev-next pb-8">
                                            <hr className="my-10" />
                                            {prevPost &&
                                                <StoryPreviousNext post={prevPost} storyTitle="Previous article" divClass="mb-8" />
                                            }

                                            {nextPost &&
                                                <StoryPreviousNext post={nextPost} storyTitle="Next article" divClass="" />
                                            }
                                        </div>
                                    </footer>
                                </article>
                            </div>

                            <div className="col s12 l1"></div>

                            {/* {!-- Sidebar - partials/sidebar/sidebar-post.hbs --} */}
                            <SidebarPost />
                        </div>
                    </div>
                </div>

                {(!tags.includes(`#podcast`) && !tags.includes(`#portfolio`)) && <ArticleRelated relatedPosts={relatedPosts} />}
            </Layout>
        </>
    )
}

PostSidebar.propTypes = {
    data: PropTypes.shape({
        currentPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            primary_tag: PropTypes.object,
            feature_image: PropTypes.string,
            id: PropTypes.string.isRequired,
            custom_excerpt: PropTypes.string,
            childHtmlRehype: PropTypes.object.isRequired,
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

export default PostSidebar

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
