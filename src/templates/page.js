import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import ArticleFeaturedImage from '../components/article/ArticleFeaturedImage'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
const Page = ({ data }) => {
    const page = data.ghostPage

    return (
        <>
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout footer={true} isPost={false} bodyClass="is-article">
                <article className="post mb-4 pt-8 lg:p-16 relative">
                    <header className="post-header px-4 mx-auto max-w-740 u-paddingTop30 relative z-3">
                        <h1 className="post-title text-32 md:text-4xl lg:text-44 text-title">{page.title}</h1>
                        {page.custom_excerpt && <p className="post-excerpt mt-6 text-xl text-gray-500">{page.custom_excerpt}</p>}
                    </header>

                    {page.feature_image && <ArticleFeaturedImage article={page} figureClass="block mx-auto max-w-1000 mt-12" />}

                    <div className="post-wrap max-w-1100 relative mx-auto">
                        <div id="post-body" className="post-body px-4 mx-auto max-w-740 relative" dangerouslySetInnerHTML={{ __html: page.html }}></div>
                    </div>
                </article>
            </Layout>
        </>
    )
}

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            custom_excerpt: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

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
        type="website"
    />
}

export const postQuery = graphql`
    query($slug: String!) {
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
