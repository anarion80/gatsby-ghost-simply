import React from 'react'
import { node } from 'prop-types'
import Zoom from 'react-medium-image-zoom'
//import 'react-medium-image-zoom/dist/styles.css'

// Can't be used with ResponsiveMedia

const ZoomableMedia = ({ children }) => (
    <Zoom zoomMargin={20}>
        {children}
    </Zoom>
)

ZoomableMedia.propTypes = {
    children: node,
}

export default ZoomableMedia