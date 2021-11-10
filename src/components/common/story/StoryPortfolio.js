import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { relativeUrl } from "../../../utils/relativeUrl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useLang, getTranslation } from '../../../utils/use-lang'

const StoryPortfolio = ({ post }) => {
    const image = post.feature_image ? getImage(post.localFeatureImage) : null
    const t = getTranslation(useLang())

    return (
        <article className="portfolio-card relative overflow-hidden mb-8 rounded-sm flex items-center justify-center h-90 has-overlay">
            <Link to={relativeUrl(post.url)} >
                {post.feature_image &&
                    <GatsbyImage image={image} alt={post.title} style={{
                        position: `absolute`,
                        height: `100%`,
                        width: `100%`,
                        inset: 0,
                        objectFit: `cover`,
                    }} className="image-inset"/>
                }

                <div className="portfolio-card-body relative text-white z-4 text-center px-4 py-16 overlay-toggle">
                    <h2 className="text-xl capitalize font-medium mb-4">{post.title}</h2>
                    <div className="tracking-wide"><span className="button is-small is-primary">{t(`View_Project`, `View Project`)}</span></div>
                </div>

                <div className="portfolio-card-bg absolute inset-0 z-2 bg-black bg-opacity-80 overlay-toggle"></div>
            </Link>
        </article>
    )
}

StoryPortfolio.propTypes = {
    post: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        localFeatureImage: PropTypes.object,
    }).isRequired,
}

export default StoryPortfolio
