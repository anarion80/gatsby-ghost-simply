import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { relativeUrl } from "../../../utils/relativeUrl"
import { Author } from '..'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const HomeFirstPost = ({ post }) => {
    const image = post.feature_image ? getImage(post.localFeatureImage) : null

    return (
        <>
            <article className="homeHero-largeCard flex-auto mb-8 md:mb-0 md:pr-6 md:w-3/6 lg:w-full">
                <Link to={relativeUrl(post.url)} className="hhp-image" aria-label={post.title}>
                    <div className="hhp-img mb-4 relative h-40">
                        {post.feature_image &&
                            <GatsbyImage image={image} alt={post.title} className="inset-image"/>
                        }
                    </div>
                </Link>

                <div className="hhp-body mb-4">
                    <h1 className="hhp-title text-2xl text-title mb-3 line-clamp-2">
                        <Link to={relativeUrl(post.url)} className="block" aria-label={post.title}>{post.title}</Link>
                    </h1>

                    {post.excerpt &&
                        <div className="hhp-excerpt text-lg leading-snug line-clamp-3 mb-3 text-gray-500">
                            <Link to={relativeUrl(post.url)} aria-label={post.title}>{post.excerpt.split(` `).splice(0,30).join(` `)}</Link>
                        </div>
                    }

                    {/* {!-- Author - Primary Tag - Datetime - Read time - ./partials/components/author-meta.hbs --} */}
                    <Author post={post} hideAvatar={true} />
                </div>
            </article>
        </>
    )
}

HomeFirstPost.propTypes = {
    post: PropTypes.shape({
        url: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        localFeatureImage: PropTypes.object,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
        primary_tag: PropTypes.shape({
            name: PropTypes.string,
            url: PropTypes.string,
            accent_color: PropTypes.string,
        }),
        created_at_pretty: PropTypes.string,
        published_at: PropTypes.string,
        published_at_pretty: PropTypes.string,
    }).isRequired,
}

export default HomeFirstPost
