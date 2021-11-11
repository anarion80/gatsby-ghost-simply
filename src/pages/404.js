import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../components/common'
import { useLang, getTranslation } from '../utils/use-lang'
import { MetaData } from '../components/common/meta'
import StoryCardSmall from '../components/common/story/StoryCardSmall'

const NotFoundPage = ({ data, location }) => {
    const posts = data.allGhostPost.edges
    const t = getTranslation(useLang())

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={true} footer={false} isPost={false} bodyClass="is-error-page bg-gray-200">
                <section className="errorPage leading-none py-12 lg:py-vw8">
                    <div className="errorPage-wrap container mx-auto text-center text-gray-500">
                        <div className="errorPage-emoji font-bold text-title text-8xl lg:text-9xl">404</div>
                        <div className="errorPage-text mt-10">{t(`Unfortunately__this_page_doesn_t_exist`)}</div>
                    </div>
                </section>

                <div className="container mx-auto">
                    <div className="max-w-1100 mx-auto pb-8">
                        <div className="row">
                            {posts.map(item => (
                                <div className="col s12 m6 l4" key={item.node.id}>
                                    <StoryCardSmall post={item.node}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

NotFoundPage.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
}

export default NotFoundPage

export const notFoundQuery = graphql`
    query {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        filter: {tags: {elemMatch: {name: {nin: ["#podcast","#portfolio","#custom-kusi-doc"]}}}}
        limit: 6,
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
