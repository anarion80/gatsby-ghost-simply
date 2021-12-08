import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import {
    //Footer,
    FooterDark,
    //FooterNotMenu,
    Header,
    SvgIcons,
} from '.'

// Styles
import '../../styles/main.css'
import '../../styles/react-medium-image-zoom.css'

import videoResponsive from "../../utils/videoResponsive"
import resizeImageGalleries from "../../utils/resizeImageGalleries"
import mediumZoomImg from "../../utils/mediumZoom"
import toggle from "../../utils/toggle"
import siteConfig from "../../utils/siteConfig"
import CookieConsent, { Cookies } from "react-cookie-consent"
import { useLocation } from "@reach/router" // this helps tracking the location
import { initializeAndTrack } from 'gatsby-plugin-gdpr-cookies'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, footer, isPost }) => {
    const site = data.allGhostSettings.edges[0].node
    const hasDropDown = siteConfig.menuDropdown ? true : false
    const location = useLocation()

    /* to turn the Header transparent when hero picture is used (and back to normal when srolled down) */
    const scrollEventListener = () => {
        const lastScrollY = window.scrollY
        lastScrollY >= 60 ?
            document.body.closest(`.has-cover`) && document.body.classList.remove(`is-head-transparent`)
            :
            document.body.closest(`.has-cover`) && document.body.classList.add(`is-head-transparent`)
    }

    useEffect(() => {
        window.addEventListener(`scroll`, scrollEventListener, { passive: true })
        return () => {
            window.removeEventListener(`scroll`, scrollEventListener)
        }
    }, [bodyClass])

    useEffect(() => {
        videoResponsive() // responsive, bigger embedded videos from Ghost posts
        resizeImageGalleries() // proper sizes of images in galleries in Ghost posts
        mediumZoomImg(`.post-body img`) // Medium-style image zoom
        toggle() // enable toggle for toggle card
        //mediumZoomImg(`.post-image img`) // Medium-style image zoom
    }, [])

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <style type="text/css">{`${site.codeinjection_head}`}</style>
                <style type="text/css">{`:root {--ghost-accent-color: ${site.accent_color};}`}</style>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.3/tiny-slider.css"></link>
                {/*<script src="/scripts/main.js" type="text/javascript"></script>*/}
                {/* <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=PT+Serif:ital,wght@0,400;0,700;1,400&display=swap" as="style" onLoad="this.onload=null;this.rel='stylesheet'" /> */}

                <body className={bodyClass} />
            </Helmet>
            <CookieConsent
                location="none"
                buttonText="Accept"
                declineButtonText="Decline"
                enableDeclineButton
                disableButtonStyles
                disableStyles
                containerClasses="cc-window cc-banner cc-type-info cc-theme-block cc-bottom"
                contentClasses="cc-message"
                buttonClasses="button is-primary text-sm font-medium md:flex gh-portal-close"
                declineButtonClasses="button is-primary text-sm font-medium md:flex gh-portal-close"
                cookieName="gatsby-gdpr-google-analytics"
                //style={{ background: `#2B373B` }}
                buttonStyle={{ backgroundColor: `green`, margin: `10px` }}
                declineButtonStyle={{ backgroundColor: `red`, margin: `10px` }}
                buttonWrapperClasses="cc-compliance justify-between"
                expires={150}
                //overlay
                onAccept={() => {
                    Cookies.set(`gatsby-gdpr-google-analytics`, `true`)
                    Cookies.set(`gatsby-gdpr-facebook-pixel`, `true`)
                    Cookies.set(`gatsby-gdpr-google-tagmanager`, `true`)
                    Cookies.set(`gatsby-gdpr-tiktok-pixel`, `true`)
                    Cookies.set(`gatsby-gdpr-hotjar`, `true`)
                    initializeAndTrack(location)
                }}>
                <span id="cookieconsent:desc" className="cc-message">This website uses cookies to enhance user experience. Please check the <a aria-label="learn more about cookies" role="button" tabIndex="0" className="cc-link" href={`${siteConfig.siteUrl}/privacy`} rel="noopener noreferrer nofollow" target="_blank">privacy policy</a> for more details.</span>

            </CookieConsent>
            <div className="simply-viewport flexColumnTop">
                <Header site={site} hasDropDown={hasDropDown} />

                <main className="simply-main relative min-h-lg">{children}</main>

                {footer &&
                    //<Footer site={site} isPost={isPost}/>
                    <FooterDark site={site}/>
                    //<FooterNotMenu site={site} isPost={false}/>
                }

            </div>
            <div className="loadingBar top-0 fixed right-0 left-0 hidden"></div>
            <SvgIcons />
            {/*             <script>{`
                var siteUrl = {site.url};
                var siteSearch = "scripts/search.js";
                var prismJs = 'scripts/prismjs.js';
                var prismJsComponents = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/components/';
                `}
            </script> */}
            {/* <script>{`${site.codeinjection_foot}`}</script> */}

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    footer: PropTypes.bool,
    isPost: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            localLogo {
                                childImageSharp {
                                gatsbyImageData(
                                    transformOptions: {
                                        fit: COVER, cropFocus: ATTENTION
                                    }
                                    height: 30
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                    )
                                }
                            }
                            localIcon {
                                childImageSharp {
                                gatsbyImageData(
                                    transformOptions: {
                                        fit: COVER, cropFocus: ATTENTION
                                    }
                                    width: 36
                                    height: 36
                                    placeholder: BLURRED
                                    formats: [AUTO, WEBP, AVIF]
                                    )
                                }
                            }
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        gatsbyImageData(layout: FIXED)
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
