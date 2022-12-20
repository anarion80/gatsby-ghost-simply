import React from 'react'
import PropTypes from 'prop-types'
import { SocialShare, Tags } from '../common'
import StoryPreviousNext from '../common/story/StoryPreviousNext'
import { useLang, getTranslation } from '../../utils/use-lang'

const ArticleBody = ({ post, nextPost, prevPost }) => {
    const t = getTranslation(useLang())

    return (
        <>
            <div className="post-wrap max-w-1100 relative mx-auto">
                <div id="post-body" className="post-body px-4 mx-auto max-w-740 relative" dangerouslySetInnerHTML={{ __html: post.childHtmlRehype.html }}></div>
            </div>

            <footer className="post-footer px-4 mx-auto max-w-740 pt-10">
                <Tags tags={post.tags} />

                <SocialShare post={post} trackingName="Footer" />

                {/*{!-- Previous and next article --}*/}
                <div className="prev-next pb-8">
                    <hr className="my-10" />
                    {prevPost &&
                        <StoryPreviousNext post={prevPost} storyTitle={ t(`Previous_article`) } divClass="mb-8" />
                    }

                    {nextPost &&
                        <StoryPreviousNext post={nextPost} storyTitle={ t(`Next_article`) } divClass="" />
                    }
                </div>
            </footer>
        </>
    )
}

ArticleBody.propTypes = {
    post: PropTypes.shape({
        feature_image: PropTypes.string,
        title: PropTypes.string.isRequired,
        html: PropTypes.string.isRequired,
        tags: PropTypes.array,
        childHtmlRehype: PropTypes.shape({
            html: PropTypes.string,
        }),
    }).isRequired,
    nextPost: PropTypes.object,
    prevPost: PropTypes.object,
    divClass: PropTypes.string,
}

export default ArticleBody
