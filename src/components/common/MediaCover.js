import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

/**
* SearchWidget component
*/

const MediaCover = ({ background, hasGradient, altTitle }) => (
    <>
        {background &&
            <GatsbyImage image={getImage(background)} style={{
                position: `absolute`,
                height: `100%`,
                width: `100%`,
                inset: 0,
                objectFit: `cover`,
            }} className="image-inset blur-up lazyloaded !important" alt={altTitle && altTitle} />
        }

        {hasGradient && <div className="simply-cover-gradient absolute inset-0 z-2 bg-black bg-opacity-50"></div>}
    </>
)

MediaCover.propTypes = {
    background: PropTypes.object,
    hasGradient: PropTypes.bool,
    altTitle: PropTypes.string,
}

export default MediaCover