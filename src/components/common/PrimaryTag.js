import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { relativeUrl } from "../../utils/relativeUrl"
import { useLang, getTranslation } from '../../utils/use-lang'

/**
* PrimaryTag component
*/

const PrimaryTag = ({ tag, tagClass }) => {
    const t = getTranslation(useLang())
    return (
        <>
            <Link to={relativeUrl(tag.url)} //TODO to be removed
                title={`${t(`Go_to`)} ` + tag.name}
                className={`button is-x-small is-dark-blue ` + (tagClass ? tagClass : `mt-3 mr-3`)}
                style= { tag.accent_color && { backgroundColor: tag.accent_color } }>{tag.name}
            </Link>
        </>
    )
}

PrimaryTag.propTypes = {
    tag: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        accent_color: PropTypes.string,
    }).isRequired,
    tagClass: PropTypes.string,
}

export default PrimaryTag