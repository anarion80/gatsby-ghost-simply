import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { DateTimeComponent } from '..'
import { relativeUrl } from "../../../utils/relativeUrl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useLang, getTranslation } from '../../../utils/use-lang'

const StoryFeatured = ({ post }) => {
    const image = post.feature_image ? getImage(post.localFeatureImage) : null
    const t = getTranslation(useLang())

    return (
        <article className="godo-f-story relative px-4 overflow-hidden py-vw8 bg-dark w-full flex-none">
            <div className="max-w-1100 mx-auto relative z-3">
                <div className="row">
                    <div className="col s12 m10 l8">
                        <p className="mb-4 text-base font-semibold uppercase text-amber-400">{t(`Featured_Story`)}</p>
                        <h2 className="relative text-32 md:text-5xl font-semibold leading-tight mb-4">
                            <Link to={relativeUrl(post.url)} className="text-white" aria-label={post.title}>{post.title}</Link>
                        </h2>
                        <p className="godo-f-story-excerpt mb-5 text-white font-normal lineClamp-2 text-xl">{post.excerpt.split(` `).splice(0,50).join(` `)}</p>

                        <DateTimeComponent post={post} dateTimeClass="godo-f-story-date mb-5 text-base text-white opacity-80" />
                        <Link to={relativeUrl(post.url)} className="button is-primary font-medium" aria-label={post.title}>{t(`Read_post`)}</Link>
                    </div>
                </div>
            </div>
            {post.feature_image &&
                <GatsbyImage image={image} alt={post.title} className="u-image absolute inset-0" style={{
                    position: `absolute`,
                    height: `100%`,
                    width: `100%`,
                    inset: 0,
                    objectFit: `cover`,
                }}/>
            }

            <div className="u-primaryGradient absolute inset-0 z-2 opacity-70"></div>
        </article>
    )
}

StoryFeatured.propTypes = {
    post: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        localFeatureImage: PropTypes.object,
        excerpt: PropTypes.string.isRequired,
        internal: PropTypes.shape({
            type: PropTypes.string.isRequired,
        }),
    }).isRequired,
}

export default StoryFeatured
