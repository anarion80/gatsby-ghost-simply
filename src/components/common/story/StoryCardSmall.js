import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { DateTimeComponent } from '..'
import { relativeUrl } from "../../../utils/relativeUrl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const StoryCardSmall = ({ post }) => {
    const internal = post.internal.type === `Ghost Post`
    const image = post.feature_image ? getImage(post.localFeatureImage) : null

    return (
        <div className={`storySmall overflow-hidden flex flex-col relative mb-8 w-full shadow ` + (internal && `godo-tracking`)}
            data-event-category={internal && `Article`}
            data-event-action={internal && `Related Posts`}
            data-event-label={relativeUrl(post.url)}
            data-event-non-interaction="true">

            {image &&
                    <Link to={relativeUrl(post.url)} className="storySmall-img-link">
                        <GatsbyImage image={image} alt={post.title} className="storySmall-img object-cover w-full h-40 blur-up lazyloaded"/>
                    </Link>
            }

            <div className="storySmall-inner p-4 flex flex-col justify-between flex-grow">
                <div className="storySmall-body">
                    {post.feature_image ?
                        <h2 className="text-22 lineClamp-2 text-title mb-2 leading-tight"><Link to={relativeUrl(post.url)}>{post.title}</Link></h2>
                        :
                        <>
                            <h2 className="text-22 text-title leading-tight">
                                <Link to={relativeUrl(post.url)}>{post.title}</Link>
                            </h2>
                            <p className="pt-4 mb-2">{post.excerpt && post.excerpt.split(` `).splice(0,20).join(` `)}</p>
                        </>
                    }
                </div>

                <DateTimeComponent post={post} />
            </div>

            <Link to={relativeUrl(post.url)} className="absolute inset-0 z-3" aria-label={post.title}></Link>
        </div>
    )
}

StoryCardSmall.propTypes = {
    post: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        localFeatureImage: PropTypes.object,
        excerpt: PropTypes.string,
        internal: PropTypes.shape({
            type: PropTypes.string.isRequired,
        }),
    }).isRequired,
}

export default StoryCardSmall
