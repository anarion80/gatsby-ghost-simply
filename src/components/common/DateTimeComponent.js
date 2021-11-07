import React from 'react'
import PropTypes from 'prop-types'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { useLang, getTranslation } from '../../utils/use-lang'

/**
* DateTimeComponent component
*/

const DateTimeComponent = ({ post, dateTimeClass }) => {
    const t = getTranslation(useLang())
    const readingTime = readingTimeHelper(post, {
        minute: t(`_x1xminxread`),
        minutes: t(`_xminxread`),
    })

    return (
        <>
            <div className={`hh-date flex items-center ` + (dateTimeClass ? dateTimeClass : `text-gray-500 text-sm`)}>
                <time className="datetime capitalize" dateTime={post.published_at} title={post.updated_at && `${t(`Updated`)} ` + post.updated_at} >{post.published_at_pretty}</time>
                <span className="bull mx-1">·</span>
                <span className="readingTime cursor-default" title={readingTime}>{readingTime}</span>
                {post.featured && <svg className="icon icon--star is-small p-1"><use xlinkHref="#icon-star"></use></svg>}
            </div>
        </>
    )
}

DateTimeComponent.propTypes = {
    post: PropTypes.shape({
        featured: PropTypes.bool,
        created_at_pretty: PropTypes.string,
        published_at: PropTypes.string,
        published_at_pretty: PropTypes.string,
        updated_at: PropTypes.string,
        updated_at_pretty: PropTypes.string,
        readingTime: PropTypes.number,
    }).isRequired,
    dateTimeClass: PropTypes.string,
}

export default DateTimeComponent