import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Author } from '..'
import { relativeUrl } from "../../../utils/relativeUrl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useLang, getTranslation } from '../../../utils/use-lang'
import IconListen from '../icons/IconListen'

const StoryPodcast = ({ post }) => {
    const image = post.feature_image ? getImage(post.localFeatureImage) : null
    const t = getTranslation(useLang())

    return (
        <article className="podcast-card flex flex-col md:flex-row w-full relative overflow-hidden mb-12">
            <header className="podcast-card-header md:ml-4 p-5 order-2">
                <Author post={post} />

                <h2 className="spc-c-title my-5 text-2xl text-title font-sans"><Link to={relativeUrl(post.url)} className="relative z-3">{post.title}</Link></h2>
                <p className="spc-c-excerpt mb-5">{post.excerpt.split(` `).splice(0,30).join(` `)}</p>
                <Link to={relativeUrl(post.url)} className="listen-btn button is-primary relative z-3"><IconListen /><span className="uppercase">{t(`Listen`)}</span></Link>
            </header>

            <Link to={relativeUrl(post.url)} className="spc-c-img relative w-full md:w-1/3 flex-none bg-gray-200 story-image md:h-auto">
                {post.feature_image &&
                    <GatsbyImage image={image} alt={post.title} style={{
                        position: `absolute`,
                        height: `100%`,
                        width: `100%`,
                        inset: 0,
                        objectFit: `cover`,
                    }} className="absolute u-image block blur-up lazyloaded rounded-2xl"/>
                }
            </Link>
        </article>
    )
}

StoryPodcast.propTypes = {
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

export default StoryPodcast
