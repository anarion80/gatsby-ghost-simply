import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Author, SocialShare } from '../common'
import { relativeUrl } from '../../utils/relativeUrl'

const ArticleHeader = ({ post }) => (
    <header className="post-header px-4 mx-auto max-w-740 relative z-3">
        { post.primary_tag &&
            <div className="mb-3 text-gray-500 tracking-wider text-sm font-medium">
                <Link className="uppercase hover:underline" to={relativeUrl(post.primary_tag.url)}>{post.primary_tag.name}</Link> {/* TODO: update to proper link */}
            </div>
        }

        <h1 className="post-title text-32 md:text-4xl lg:text-44 text-title leading-tight">{post.title}</h1>
        {post.custom_excerpt && <p className="post-excerpt mt-6 text-22 text-gray-500">{post.custom_excerpt}</p>}

        <div className="post-share flex flex-col md:flex-row mt-8">
            <Author post={post} />
            <SocialShare post={post} trackingName="Header" divClass="order-first mb-6 md:mb-0 md:order-none" />
        </div>
    </header>
)

ArticleHeader.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        custom_excerpt: PropTypes.string,
        primary_tag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
        }),
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default ArticleHeader
