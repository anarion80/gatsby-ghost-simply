import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { relativeUrl } from "../../../utils/relativeUrl"
import { Author } from '..'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const HomeSmallPost = ({ post, last }) => {
    const image = post.feature_image ? getImage(post.localFeatureImage) : null

    return (
        <>
            <article className={`homeHero-smallCard flex relative ` + (!last ? `mb-5` : ``)}>
                <div className="hhp-smallCard-img w-1/3 relative flex-none mr-5">

                    {post.feature_image &&
                        <GatsbyImage image={image} alt={post.title} className="inset-image"/>
                    }

                </div>

                <div className="hhp-smallCard-body flex flex-col justify-between">
                    <h2 className="hhp-smallCard-title text-lg mb-3 leading-tight font-semibold text-title lineClamp-2">
                        <Link to={relativeUrl(post.url)} aria-label={post.title}>{post.title}</Link>
                    </h2>

                    {/* {!-- Author - Primary Tag - Datetime - Read time - ./partials/components/author-meta.hbs --} */}
                    <Author post={post} hideAvatar={true} />
                </div>

                {/* {!-- Links --} */}
                <Link to={relativeUrl(post.url)} className="absolute inset-0 z-2" aria-label={post.title}></Link>

            </article>
        </>
    )
}

HomeSmallPost.propTypes = {
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
    last: PropTypes.bool,
}

export default HomeSmallPost
