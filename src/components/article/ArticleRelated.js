import React from 'react'
import PropTypes from 'prop-types'
import StoryCardSmall from '../common/story/StoryCardSmall'
import { useLang, getTranslation } from '../../utils/use-lang'

const ArticleRelated = ({ relatedPosts }) => {
    const t = getTranslation(useLang())

    return (
        <div className="post-related bg-gray-150 py-10">
            <div className="container mx-auto">
                <div className="max-w-1100 mx-auto">
                    <div className="row">

                        <div className="col s12 mb-12 text-center">
                            <h3 className="text-title text-32" dangerouslySetInnerHTML={{ __html: t(`Related__span_class__text_primary__Articles__span_`) }}></h3>
                        </div>

                        {relatedPosts.map(item => (
                            <div className="col s12 m6 l4 flex" key={item.node.url}>
                                <StoryCardSmall post={item.node}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

ArticleRelated.propTypes = {
    relatedPosts: PropTypes.array.isRequired,
}

export default ArticleRelated
