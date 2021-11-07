import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

/**
* DateTimeComponent component
*/

const Authors = ({ authors }) => (
    <>
        {authors.map((author, i) => (
            <span key={author.id} className="hh-author-name text-sm noWrapWithEllipsis">
                <Link to={`/author` + `/${author.slug}/`} key={author.id}>{author.name}</Link>
                {(authors.length === 2 && i === 0) && `,\u00A0`}
            </span>
        ))}
    </>
)

Authors.propTypes = {
    authors: PropTypes.array.isRequired,
}

export default Authors