import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { relativeUrl } from "../../../utils/relativeUrl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const StoryPreviousNext = ({ post, storyTitle, divClass }) => (
    <div className={`flex relative godo-tracking ` + divClass}
        data-event-category="Article"
        data-event-action={storyTitle}
        data-event-label={post.url}
        data-event-non-interaction="true">

        <Link to={relativeUrl(post.url)} className="prev-next-image-link relative w-4/12 bg-gray-200 flex-none border border-gray-100" aria-label={post.title}>
            {post.feature_image &&
                <GatsbyImage image={getImage(post.localFeatureImage)} alt={post.title} className="absolute rounded u-image blur-up lazyloaded"/>}
        </Link>

        <div className="prev-next-body pl-6 flex-auto">
            <Link to={relativeUrl(post.url)}>
                <div className="text-sm leading-none text-gray-500 mb-2 font-medium">{storyTitle}</div>
                <h2 className="prev-next-title text-title mb-2 text-xl md:text-22">{post.title}</h2>
                <p className="prev-next-excerpt text-base text-gray-500 lineClamp-2 leading-snug">{post.excerpt && post.excerpt.split(` `).splice(0,25).join(` `)}</p>
            </Link>
        </div>
        {/*{!-- <a href="{{url}}" aria-label="{{title}}" class="absolute inset-0 z-2"></a> --}*/}
    </div>
)

StoryPreviousNext.propTypes = {
    post: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        localFeatureImage: PropTypes.object,
        excerpt: PropTypes.string.isRequired,
    }).isRequired,
    storyTitle: PropTypes.string,
    divClass: PropTypes.string,
}

export default StoryPreviousNext

