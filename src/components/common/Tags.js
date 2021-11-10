import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { relativeUrl } from "../../utils/relativeUrl"

const Tags = ({ tags }) => (
    <>
        <div className="post-tags mb-8">
            <div className="buttons">
                {tags.map(tag => (
                    (tag.visibility === `public` &&
                        <Link
                            to={relativeUrl(tag.url)}
                            key={tag.id}
                            className="button is-light font-medium text-sm capitalize godo-tracking"
                            data-event-category="Article"
                            data-event-action="Tags"
                            data-event-label={tag.name}
                            data-event-non-interaction="true">{tag.name}
                        </Link>
                    )
                ))}
            </div>
        </div>
    </>
)

Tags.propTypes = {
    tags: PropTypes.array.isRequired,
    divClass: PropTypes.string,
}

export default Tags
