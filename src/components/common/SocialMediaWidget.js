import React from 'react'
import PropTypes from 'prop-types'
import siteConfig from '../../utils/siteConfig'
/**
* Social Media Widget component
*
*
*/

const SocialMediaWidget = ({ site, divClass }) => {
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null
    //const socialMedia = Object.keys(siteConfig.followSocialMedia).map(key => [key, siteConfig.followSocialMedia[key]])
    const socialMedia = siteConfig.followSocialMedia

    return (
        <>
            {
                <div className={ divClass ? `js-social-media social-media ` + divClass : `js-social-media social-media`}>
                    {/* Facebook and Twitter straight from Ghost settings */}
                    {site.facebook &&
                    <a className="godo-tracking p-2 inline-block hover:text-facebook"
                        data-event-category="Header"
                        data-event-action="Social"
                        data-event-label="Facebook"
                        data-event-non-interaction="true"
                        title={`Facebook ` + site.facebook}
                        aria-label={`Facebook ` + site.facebook}
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        <svg className="icon icon--facebook"><use xlinkHref="#icon-facebook"></use></svg>
                    </a>}

                    {site.twitter &&
                    <a className="godo-tracking p-2 inline-block hover:text-twitter"
                        data-event-category="Header"
                        data-event-action="Social"
                        data-event-label="Twitter"
                        data-event-non-interaction="true"
                        title={`Twitter ` + site.twitter}
                        aria-label={`Twitter ` + site.twitter}
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer">
                        <svg className="icon icon--twitter"><use xlinkHref="#icon-twitter"></use></svg>
                    </a>}
                    {/* Other services from our own settings */}
                    {socialMedia.map(item => (
                        <a className="godo-tracking p-2 inline-block hover:text-twitter"
                            key={item.service}
                            data-event-category="Header"
                            data-event-action="Social"
                            data-event-label={item.service}
                            data-event-non-interaction="true"
                            title={item.service + `: ` + item.title}
                            aria-label={item.service + `: ` + item.title}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer">
                            <svg className={`icon icon-` + item.service}><use xlinkHref={`#icon-` + item.service}></use></svg>
                        </a>
                    ))}
                </div>
            }

        </>
    )
}

SocialMediaWidget.defaultProps = {
    divClass: `footer-social-media`,
}

SocialMediaWidget.propTypes = {
    site: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        navigation: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            }).isRequired,
        ).isRequired,
        secondary_navigation: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            }).isRequired,
        ),
        facebook: PropTypes.string,
        twitter: PropTypes.string,
    }).isRequired,
    divClass: PropTypes.string,
}

export default SocialMediaWidget