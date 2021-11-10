import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { relativeUrl } from "../../../utils/relativeUrl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Author } from '..'
import { useLang, getTranslation } from '../../../utils/use-lang'

const StoryPost = ({ post }) => {
    const image = post.feature_image ? getImage(post.localFeatureImage) : null
    const t = getTranslation(useLang())

    return (
        <article className="story-post mb-16">
            <header className="story-post-header mb-5">
                <h2 className="text-4xl leading-tight text-title mb-5 hover:text-primary"><Link to={relativeUrl(post.url)}>{post.title}</Link></h2>
                {/* {!-- Author - Primary Tag - Datetime - Read time - ./partials/components/author-meta.hbs --} */}
                <Author post={post} />
            </header>

            {post.feature_image &&
                <figure className="story-post-media relative overflow-hidden rounded-lg shadow-3xl has-overlay h-56">
                    <Link to={relativeUrl(post.url)}>
                        <GatsbyImage image={image} alt={post.title} className="story-img absolute image-inset block blur-up lazyload"/>
                        <span className="story-post-overlay inset-0 bg-primary absolute flex items-center justify-center overlay-toggle">
                            <svg className="icon h-10 w-10 text-white"><use xlinkHref="#icon-arrow"></use></svg>
                        </span>
                    </Link>
                </figure>
            }

            <div className="story-post-body">
                <div className="post-body text-xl mb-5"><p>{post.excerpt}</p></div>
                <Link to={relativeUrl(post.url)} className="link is-hover font-medium">
                    {t(`Read more`)}
                    <svg className="icon is-medium"><use xlinkHref="#icon-arrow"></use></svg>
                </Link>
            </div>
        </article>
    )
}

StoryPost.propTypes = {
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

export default StoryPost
