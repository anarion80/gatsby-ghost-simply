/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Layout, Pagination } from '../../components/common'
import DateTimeComponent from '../../components/common/DateTimeComponent'
import { MetaData } from '../../components/common/meta'
import { relativeUrl } from "../../utils/relativeUrl"
import { useLang, getTranslation } from '../../utils/use-lang'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const IndexArchive = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges
    const t = getTranslation(useLang())
    //const featuredPost = posts.filter(item => item.node.featured).length > 0 ? posts.filter(item => item.node.featured)[0].node : undefined

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} footer={true} bodyClass="is-frontpage">

                <header className="author-header">
                    <div className="px-4 py-12 md:py-vw6 mx-auto max-w-3xl text-center">
                        <h1 className="text-3xl md:text-4xl text-title">The full archive</h1>
                        <div className="mt-5 text-lg text-gray-500">{`${t(`Total_number_of_posts`)}: ${data.allGhostPost.totalCount}`}</div>
                    </div>
                </header>

                <div className="site-post feed-entry-content container mx-auto pb-10">
                    <div className="feed-entry-wrap max-w-740 mx-auto">

                        {posts.map(item => (
                            <article className={`archive-post archive-date-` + item.node.published_at_month} key={item.node.id}>
                                <div className="archive-label text-primary px-6 mt-4 mb-2 text-2xl font-bold capitalize">{item.node.published_at_archive}</div>
                                <Link className="archive-link px-6 block text-title hover:text-dark hover:bg-amber-300 rounded" to={relativeUrl(item.node.url)}>
                                    <div className="border-t border-gray-200 py-6">
                                        <h2 className="archive-title text-xl md:text-2xl font-bold">{item.node.title}</h2>
                                        <DateTimeComponent post={item.node} dateTimeClass="mt-2 text-gray-500 text-sm" />
                                    </div>
                                </Link>
                            </article>
                        ))}
                        <Pagination pageContext={pageContext} />
                    </div>
                </div>
            </Layout>
        </>
    )
}

IndexArchive.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default IndexArchive

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostArchiveQuery($limit: Int!, $skip: Int!) {
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
      totalCount
    }
  }
`
