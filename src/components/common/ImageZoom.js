import React from 'react'
import { node } from 'prop-types'
import Zoom from 'react-medium-image-zoom'
//import 'react-medium-image-zoom/dist/styles.css'

// Can't be used with ResponsiveMedia

const ZoomableMedia = ({ children }) => (
    <Zoom
        //className={styles.ZoomableMedia}
        transitionDuration={200}
        overlayBgColorEnd={`rgba(255, 255, 255, 0.8)`}
        overlayBgColorStart="rgba(0, 0, 0, 0)"
        zoomMargin={20}
        zoomZindex={7}
    >
        {children}
    </Zoom>
)

ZoomableMedia.propTypes = {
    children: node,
}

export default ZoomableMedia