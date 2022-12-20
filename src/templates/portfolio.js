import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import StoryPortfolio from "../components/common/story/StoryPortfolio"
import { useLang, getTranslation } from '../utils/use-lang'
import { resolveUrl } from "../utils/relativeUrl"

/**
* Portfolio Collection view (/portfolio)
*
* This file renders a collection of posts tagged with #portfolio tag.
*
*/
const Portfolio = ({ data, pageContext }) => {
    //const page = data.ghostPage
    const t = getTranslation(useLang())
    const posts = data.allGhostPost.edges
    const tags = [...new Set(posts.map(item => item.node.primary_tag && item.node.primary_tag.name).filter(a => a))] //return unique, non-null primary tags

    useEffect(() => {
        const filterBtn = document.querySelectorAll(`.js-filter-btn`)

        if (!filterBtn.length) {
            return
        }

        function filterSelection(str) {
            const allCard = document.querySelectorAll(`.js-filter-items`)
            if (!allCard.length) {
                return
            }

            for (let i = 0; i < allCard.length; i++) {
                const portfolioCard = allCard[i]

                portfolioCard.classList.add(`hidden`)
                if (portfolioCard.getAttribute(`data-id`) === str || str === `all`) {
                    portfolioCard.classList.remove(`hidden`)
                }
            }
        }

        filterBtn.forEach((btn) => {
            btn.addEventListener(`click`, function (e) {
                e.preventDefault()
                const current = document.querySelector(`.js-filter-btn.border-primary`)
                current.classList.remove(`border-primary`)
                this.classList.add(`border-primary`)
                const dataFilter = btn.getAttribute(`data-id`)
                filterSelection(dataFilter.split(` `).join(`-`).toLowerCase())
            })
        }
        )
    }, [])

    return (
        <>
            <Layout footer={true} isPost={false} bodyClass="is-portfolio">
                <header className="topic-header">
                    <div className="px-4 py-10 lg:py-vw6 lg:pb-8 mx-auto max-w-3xl text-center">
                        <h1 className="capitalize text-5xl text-title md:text-6xl">Portfolio</h1>
                        <div className="max-w-lg mt-2 mx-auto text-xl text-gray-500">Please check out my portfolio!</div>
                    </div>
                </header>

                {tags.length > 0 &&
                    <ul className="list-inline text-center px-4 mt-4">
                        <li className="js-filter-btn inline-block border-b-2 border-transparent border-primary hover:border-primary cursor-pointer mb-2" data-id="all">{t(`All`, `All`)}</li>
                        {tags.map(item => (
                            <li key={item} className="js-filter-btn inline-block border-b-2 border-transparent hover:border-primary cursor-pointer mb-2 ml-4" data-id={item}>{item}</li>
                        ))}
                    </ul>
                }

                <div className="site-post feed-entry-content py-12 px-4">
                    <div className="mx-auto max-w-1100 feed-entry-wrap">
                        <div className="row flex-row justify-center">

                            {posts.map((item) => {
                                const post = item.node
                                post.url = resolveUrl(pageContext.collectionPath, post.url)
                                return (<div className="col s12 m6 l4 js-filter-items" data-id={ item.node.primary_tag && item.node.primary_tag.slug} key={item.node.id}>
                                    <StoryPortfolio post={post} />
                                </div>)
                            })}

                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

Portfolio.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
    pageContext: PropTypes.object.isRequired,
}

export default Portfolio

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
        title="Portfolio"
        description="Personal portfolio page"
        type="WebSite"
    />
}

export const portfolioQuery = graphql`
    query {
        allGhostPost(
            sort: {published_at: DESC}
            filter: {tags: {elemMatch: {name: {in: ["#portfolio"]}}}}
        ) {
            edges {
                node {
                    localFeatureImage {
                        childImageSharp {
                        gatsbyImageData(transformOptions: {
                                fit: COVER, cropFocus: ATTENTION
                            }
                            width: 1000

                            placeholder: BLURRED
                            formats: [AUTO, WEBP]
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
                                formats: [AUTO, WEBP]
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
