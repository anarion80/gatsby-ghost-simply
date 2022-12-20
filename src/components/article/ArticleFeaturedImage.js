import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ZoomableMedia from '../common/ImageZoom'

const ArticleFeaturedImage = ({ article, figureClass, divClass, imgClass, zoomable }) => {
    const image = getImage(article.localFeatureImage)

    return (
        <figure className={`post-image ` + figureClass}>
            {zoomable ?
                <ZoomableMedia>
                    <GatsbyImage
                        image={image} alt={article.title}
                        className={divClass} imgClassName={imgClass} />
                </ZoomableMedia>
                :
                <GatsbyImage image={image} alt={article.title} className={divClass} imgClassName={imgClass} />
            }
        </figure>
    )
}

ArticleFeaturedImage.propTypes = {
    article: PropTypes.shape({
        feature_image: PropTypes.string.isRequired,
        localFeatureImage: PropTypes.object,
        title: PropTypes.string.isRequired,
    }).isRequired,
    divClass: PropTypes.string,
    imgClass: PropTypes.string,
    figureClass: PropTypes.string,
    zoomable: PropTypes.bool,
}

export default ArticleFeaturedImage
