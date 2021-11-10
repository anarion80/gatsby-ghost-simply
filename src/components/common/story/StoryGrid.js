import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Author, PrimaryTag } from '..'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
//import { useLang, getTranslation } from '../../../utils/use-lang'
import { relativeUrl } from "../../../utils/relativeUrl"

const StoryGrid = ({ post }) => {
    //const url = `/${post.slug}/`
    const url = relativeUrl(post.url)
    const featureImage = post.feature_image
    const primaryTag = post.primary_tag
    const image = featureImage && getImage(post.localFeatureImage)
    //const t = getTranslation(useLang())

    return (
        <>
            <article className="story relative mb-5 pb-5 border-b border-gray-100 md:border-0">
                <figure className="story-image relative border border-gray-300 bg-gray-200 block overflow-hidden">
                    {featureImage ?
                        <Link to={url} className="block">
                            <GatsbyImage image={image} alt={post.title} style={{
                                position: `absolute`,
                                height: `100%`,
                                width: `100%`,
                                inset: 0,
                                objectFit: `cover`,
                            }} className="story-img absolute u-image block blur-up lazyloaded"/>
                        </Link>
                        :
                        <Link to={url} className="block" aria-label={post.title}></Link>
                    }
                    {primaryTag &&
                        <div className="absolute right-0 top-0"><PrimaryTag tag={primaryTag} /></div>
                    }
                </figure>

                <div className="story-body pt-5 flexColumnTop">
                    {/* <DateTimeComponent post={post} /> */}

                    <h2 className="story-title text-2xl font-sans text-title leading-tight mb-3"><Link to={url} className="block">{post.title}</Link></h2>

                    {post.excerpt &&
                        <p className="story-excerpt mb-5 text-lg leading-normal text-gray-500">
                            <Link to={url} className="block">{post.excerpt.split(` `).splice(0,30).join(` `)}</Link>
                        </p>
                    }
                    {/*{{> "components/author-meta"}}*/}
                    <Author post={post} />

                    {/*{{!-- Read more --}}
                    {{!-- <Link to={url} className="link is-hover font-medium">{t(`Read_more`)}<svg className="icon is-medium"><use xlinkHref="#icon-arrow"></use></svg></Link> --}}*/}
                </div>
            </article>
        </>
    )
}

StoryGrid.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        localFeatureImage: PropTypes.object,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string,
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
    tagClass: PropTypes.string,
}

export default StoryGrid
