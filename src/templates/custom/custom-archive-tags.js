import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import { Layout } from '../../components/common'
import { MetaData } from '../../components/common/meta'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useLang, getTranslation } from '../../utils/use-lang'
import { relativeUrl } from "../../utils/relativeUrl"
import * as containerStyles from "./custom-archive-tags.module.css"

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const ArchiveTags = ({ data, location }) => {
    const page = data.ghostPage
    const tags = data.allGhostTag.edges
    const t = getTranslation(useLang())

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout footer={true} isPost={false} bodyClass="topic">
                <header className={containerStyles.topicHeader} style={{ background: `url("../images/bg-setup.svg") bottom no-repeat, linearGradient(60deg,#2e2ea2,#138395)` }}>
                    <div className="px-4 py-12 mx-auto max-w-3xl text-center text-white md:py-vw6">
                        <h1 className="capitalize text-4xl lg:text-5xl font-semibold">{page.title}</h1>
                        <div className="mt-8 text-xl" dangerouslySetInnerHTML={{ __html: page.html }}></div>
                    </div>
                </header>
                <section className="container mx-auto py-8 lg:py-16">
                    <div className="max-w-1100 mx-auto">

                        <div className="row">

                            {tags.map(tag => (
                                <div className="col s12 m6 l4 mb-8 flex" key={tag.node.slug}>
                                    <article className="topic-story relative bg-dark overflow-hidden rounded-md w-full" style={ tag.node.accent_color && { backgroundColor: `${tag.node.accent_color}` }}>
                                        {tag.node.feature_image &&
                                            <>
                                                <Link to={relativeUrl(tag.node.url)}>
                                                    <GatsbyImage image={getImage(tag.node.localFeatureImage)} style={{
                                                        position: `absolute`,
                                                        height: `100%`,
                                                        width: `100%`,
                                                        inset: 0,
                                                        objectFit: `cover`,
                                                    }} className="image-inset blur-up lazyloaded" alt={tag.node.name} />
                                                </Link>
                                                <div className={containerStyles.topicBgGradient + ` absolute inset-0 z-2`}></div>
                                            </>
                                        }

                                        <header className="relative text-white z-4 text-center w-full px-4 py-16 lg:px-6" key={tag.node.id}>
                                            <div className="text-xs uppercase mb-3 opacity-90 tracking-widest font-medium">{tag.node.count.posts} {
                                                tag.node.count.posts === 0 ? t(`No_Stories`) : tag.node.count.posts === 1 ? t(`_1_Story`) : t(`_xStories`)
                                            }</div>
                                            <h2 className="text-2xl capitalize font-semibold tracking-wide"><Link to={relativeUrl(tag.node.url)}>{tag.node.name}</Link></h2>
                                        </header>

                                        <Link to={relativeUrl(tag.node.url)} className="absolute inset-0 z-4" aria-label={tag.node.name}></Link>
                                    </article>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

ArchiveTags.propTypes = {
    data: PropTypes.shape({
        allGhostTag: PropTypes.object.isRequired,
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default ArchiveTags

export const archiveTagsQuery = graphql`
    query($slug: String!) {
        allGhostTag(
            limit: 18
            filter: {visibility: {eq: "public"}}
            sort: {count: {posts: DESC}}
        ) {
            edges {
                node {
                    localFeatureImage {
                        childImageSharp {
                        gatsbyImageData(
                            transformOptions: {
                                fit: COVER, cropFocus: ATTENTION
                            }
                            width: 600
                            placeholder: BLURRED
                            formats: [AUTO, WEBP]
                            )
                        }
                    }
                    count {
                        posts
                    }
                    accent_color
                    ...GhostTagFields
                }
            }
        }
        ghostPage(slug: { eq: $slug }) {
            localFeatureImage {
                childImageSharp {
                gatsbyImageData(
                    transformOptions: {
                        fit: COVER, cropFocus: ATTENTION
                    }
                    width: 2000
                    placeholder: BLURRED
                    formats: [AUTO, WEBP]
                    )
                }
            }
            ...GhostPageFields
        }
    }
`
