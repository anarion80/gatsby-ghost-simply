import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'
import config from '../utils/siteConfig'
import { StoryGrid } from '../components/common'
import { useLang, getTranslation } from '../utils/use-lang'
/**
* Tag page (/tag/:slug)
*
* Loads all posts for the requested tag incl. pagination.
*
*/
const Tag = ({ data, location, pageContext }) => {
    const tag = data.ghostTag
    const posts = data.allGhostPost.edges
    const t = getTranslation(useLang())

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout footer={true} isPost={false} bodyClass="is-tag">
                <>
                    <section className="tag py-12 md:py-vw6 bg-gray-150">
                        <div className="mx-auto px-4 max-w-1000 text-center">
                            <h1 className="capitalize text-4xl text-title lg:text-5xl">{tag.name}</h1>

                            <div className="text-center font-medium mt-8">
                                <a className="hover:text-primary" href={config.siteUrl}>{t(`Home`)}</a>
                                <svg className="icon h-3 w-3"><use xlinkHref="#icon-arrow-forward"></use></svg>
                                <span className="text-gray-500">{`${t(`Posts_Tagged`)} ` + tag.name}</span>
                            </div>

                            {tag.description && <p className="text-xl mt-5 font-serif max-w-xl mx-auto">{tag.description}</p>}
                        </div>
                    </section>
                    <div className="site-post feed-entry-content py-12 px-4">
                        <div className="mx-auto max-w-1100 feed-entry-wrap">
                            <div className="row">
                                {posts.map(({ node }) => (
                                // The tag below includes the markup for each post - components/common/PostCard.js
                                    <div className="col s12 m6 l4" key={node.id}>
                                        <StoryGrid post={node} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Pagination pageContext={pageContext} />
                </>
            </Layout>
        </>
    )
}

Tag.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Tag

export const pageQuery = graphql`
    query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {tags: {elemMatch: {slug: {eq: $slug, nin: ["hash-portfolio","hash-podcast","hash-custom-kusi-doc"]}}}}
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
