import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import { Layout } from '../../components/common'
import { MetaData } from '../../components/common/meta'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { useLang, getTranslation } from '../../utils/use-lang'
import { relativeUrl } from "../../utils/relativeUrl"

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const ArchiveAuthors = ({ data, location }) => {
    const page = data.ghostPage
    const authors = data.allGhostAuthor.edges
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
            <Layout footer={true} isPost={false} bodyClass="archive-author bg-gray-150">
                <header className="author-header">
                    <div className="px-4 py-12 md:py-vw6 mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl lg:text-5xl text-title">{page.title}</h1>
                        <div className="mt-5 text-lg text-gray-500" dangerouslySetInnerHTML={{ __html: page.html }}></div>
                    </div>
                </header>
                <div className="container px-4 mx-auto pb-12">
                    <section className="row flex-row justify-center">

                        {authors.map((author) => {
                            const twitterUrl = author.node.twitter ? `https://twitter.com/${author.node.twitter.replace(/^@/, ``)}` : null
                            const facebookUrl = author.node.facebook ? `https://www.facebook.com/${author.node.facebook.replace(/^\//, ``)}` : null

                            return (
                                <div className="col s12 m6 l4 flex flex-col" key={author.node.slug}>
                                    <article className="author-card mb-8 relative flex flex-col p-5 bg-blank shadow-lg rounded-lg flex-1" >
                                        <header className="flex-1">
                                            <h2 className="author-card-name capitalize text-2xl font-semibold underscore"><Link to={relativeUrl(author.node.url)}>{author.node.name}</Link></h2>
                                            {author.node.bio && <p className="author-card-bio text-gray-600">{author.node.bio}</p>}
                                        </header>

                                        <footer className="relative text-center pt-5 flex items-center justify-between">
                                            <div className="author-card-media u-flex1">
                                                {author.node.facebook && <a href={facebookUrl} className="p-2 hover:text-facebook" title="Facebook" target="_blank" rel="noopener noreferrer"><svg className="icon"><use xlinkHref="#icon-facebook"></use></svg></a>}
                                                {author.node.twitter && <a href={twitterUrl} className="p-2 hover:text-twitter" title={author.node.twitter} target="_blank" rel="noopener noreferrer"><svg className="icon"><use xlinkHref="#icon-twitter"></use></svg></a>}
                                                {author.node.website && <a href={author.node.website} className="p-2" title="{{website}}" target="_blank" rel="noopener noreferrer"><svg className="icon is-stroke"><use xlinkHref="#icon-link"></use></svg></a>}
                                            </div>

                                            <Link to={relativeUrl(author.node.url)}>
                                                {author.node.profile_image ?
                                                    <GatsbyImage image={getImage(author.node.localProfileImage)} className="author-card-avatar u-image rounded-full w-20 h-20" alt={`${t(`Hi_I_m`)} ` + author.name}/>
                                                    : <StaticImage src="../../images/avatar.png" className="avatar is-100x100 rounded-full object-cover" alt={`${t(`Hi_I_m`)} ` + author.name} />
                                                }
                                            </Link>
                                        </footer>
                                    </article>
                                </div>
                            )
                        })}
                    </section>
                </div>
            </Layout>
        </>
    )
}

ArchiveAuthors.propTypes = {
    data: PropTypes.shape({
        allGhostAuthor: PropTypes.object.isRequired,
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default ArchiveAuthors

export const archiveAuthorsQuery = graphql`
    query($slug: String!) {
        allGhostAuthor(
            sort: {count: {posts: DESC}}
        ) {
            edges {
                node {
                    localCoverImage{
                    childImageSharp {
                        gatsbyImageData(transformOptions: {
                                fit: COVER, cropFocus: ATTENTION
                            }
                            width: 1200
                            height: 628

                            placeholder: BLURRED
                            formats: [AUTO, WEBP]
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
                                    formats: [AUTO, WEBP]
                                    )
                                }
                            }
                    count {
                        posts
                    }
                    ...GhostAuthorFields
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
