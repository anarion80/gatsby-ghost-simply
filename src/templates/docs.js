import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { Link } from "gatsby"
import { relativeUrl, resolveUrl } from "../utils/relativeUrl"

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const KusiHome = ({ data, pageContext }) => {
    //const page = data.ghostPage
    const posts = data.allGhostPost.edges
    const firstPost = posts[0].node
    firstPost.url = resolveUrl(pageContext.collectionPath, firstPost.url)

    return (
        <>
            <Layout footer={true} isPost={false} bodyClass="is-portfolio">
                <div className="spc-header simply-hero-cover flex items-center justify-center relative min-h-lg py-24 px-4 overflow-hidden">

                    <article className="spc-h-inner max-w-4xl relative flex flex-col text-center z-3 pt-16 text-title text-2xl md:text-3xl animated bounceIn">
                        <h1 className="spc-h-t text-title text-5xl md:text-6xl" >Documentation</h1>
                        <p className="spc-h-e">The docs</p>
                        <p className="spc-des">Beautiful theme for your documentation needs</p>
                        {/* <p className="spc-des" dangerouslySetInnerHTML={{ __html: page.html }}></p> */}
                        <div className="spc-buttons">

                            <Link to={relativeUrl(firstPost.url)} className="button">
                                <svg className="icon is-stroke"><use xlinkHref="#icon-docs"></use></svg>
                                <span>Start Here</span>
                            </Link>&nbsp;
                        </div>

                    </article>

                    {/* <MediaCover background={page.localFeatureImage} hasGradient={true} altTitle={page.title} /> */}
                </div>
            </Layout>
        </>
    )
}

KusiHome.propTypes = {
    data: PropTypes.shape({
        //ghostPage: PropTypes.object.isRequired,
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired,
}

export default KusiHome

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
        title="Documentation"
        description="Documentation starting page"
        type="WebSite"
    />
}

export const docsHomeQuery = graphql`
    query {
        allGhostPost(
            sort: {published_at: ASC}
            filter: {tags: {elemMatch: {name: {in: ["#custom-kusi-doc"]}}}}
        ) {
            edges {
                node{
                    ...GhostPostFields
                }
            }
        }
    }
`
