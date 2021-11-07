import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
//import { Tags } from '@tryghost/helpers-gatsby'
//import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Author, PrimaryTag } from '.'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    //const readingTime = readingTimeHelper(post)
    //const authorFirstName = post.primary_author.name ? post.primary_author.name.split(` `)[0] : null
    //const authorAvatar = post.primary_author.profile_image ? post.primary_author.profile_image : null
    //const createdDate = post.created_at_pretty
    const featureImage = post.feature_image || null
    const primaryTag = post.primary_tag
    const image = getImage(post.localFeatureImage)

    return (
        <>
            <article className="story relative mb-5 pb-5 border-b border-gray-100 md:border-0">
                <figure className="story-image relative border border-gray-300 bg-gray-200 block overflow-hidden">
                    {featureImage ?
                        <Link to={url} className="block">
                            <GatsbyImage image={image} alt={post.title} className="story-img absolute u-image block blur-up lazyloaded"/>
                        </Link>
                        :
                        <Link to={url} className="block" aria-label={post.title}></Link>
                    }
                    {primaryTag &&
                        <PrimaryTag tag={primaryTag} />
                    }
                </figure>

                <div className="story-body pt-5 flexColumnTop">
                    {/* <DateTimeComponent post={post} /> */}

                    <h2 className="story-title text-2xl font-sans text-title leading-tight mb-3"><a href={url} className="block">{post.title}</a></h2>

                    {post.excerpt &&
                        <p className="story-excerpt mb-5 text-lg leading-normal text-gray-500">
                            <a href={url} className="block">{post.excerpt}</a>
                        </p>
                    }
                    {/*{{> "components/author-meta"}}*/}
                    <Author post={post} />

                    {/*{{!-- Read more --}}
                    {{!-- <Link to={url} className="link is-hover font-medium">Read more<svg className="icon is-medium"><use xlinkHref="#icon-arrow"></use></svg></Link> --}}*/}
                </div>
            </article>
        </>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        localFeatureImage: PropTypes.object,
        featured: PropTypes.bool,
        primary_tag: PropTypes.string,
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
    }).isRequired,
}

export default PostCard
