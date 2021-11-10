import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { relativeUrl } from "../../utils/relativeUrl"
import siteConfig from "../../utils/siteConfig"

/**
* Navigation component
*
* The Navigation component takes an array of your Ghost
* navigation property that is fetched from the settings.
* It differentiates between absolute (external) and relative link (internal).
* You can pass it a custom class for your own styles, but it will always fallback
* to a `site-nav-item` class.
*
*/
const Navigation = ({ site, navClass, isSecondary, mobile }) => {
    const menuDropdown = siteConfig.menuDropdown

    return (
        <>
            { isSecondary ?
                <nav className="menu-secondary">
                    <ul itemScope itemType="http://www.schema.org/SiteNavigationElement" role="menu">
                        {site.secondary_navigation.map((navItem, i) => (
                            <li itemProp="name" role="menuitem" className={ i !== site.secondary_navigation.length - 1 ? `inline-block separator` : `inline-block` } key={i}>
                                <Link
                                    className="godo-tracking hover:text-primary font-medium p-2 inline-block"
                                    to={relativeUrl(navItem.url)}
                                    partiallyActive={true}
                                    data-event-category="Footer"
                                    data-event-action="Menu"
                                    data-event-label={navItem.label}
                                    data-event-non-interaction="true">{navItem.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                :
                (mobile ?
                    (<ul>
                        {site.navigation.map((navItem, i) => (
                            <li key={i}>
                                <Link to={relativeUrl(navItem.url)} className="block px-5 py-2 font-medium text-22 leading-tight">{navItem.label}</Link>
                            </li>
                        ))}
                        {menuDropdown.map((navItem, i) => (
                            <li key={i}>
                                <Link to={relativeUrl(navItem.url)} className="block px-5 py-2 font-medium text-22 leading-tight">{navItem.label}</Link>
                            </li>
                        ))}
                    </ul>)
                    :
                    (site.navigation.map((navItem, i) => {
                        if (navItem.url.match(/^\s?http(s?)/gi)) {
                            return <li itemProp="name" className={ i === 0 ? `ml-0` : `ml-5` } key={i}>
                                <Link
                                    className={navClass}
                                    to={relativeUrl(navItem.url)}
                                    activeClassName="active text-primary font-semibold"
                                    /*partiallyActive={true}*/
                                    target="blank"
                                    rel="noopener noreferrer"
                                    data-event-category="Header"
                                    data-event-action="Menu"
                                    data-event-label={navItem.label}
                                    data-event-non-interaction="true">{navItem.label}
                                </Link>
                            </li>
                        } else {
                            return <li itemProp="name" className={ i === 0 ? `ml-0` : `ml-5` } key={i}>
                                <Link
                                    className={navClass}
                                    to={relativeUrl(navItem.url)}
                                    activeClassName="active text-primary font-semibold"
                                    /*partiallyActive={true}*/
                                    data-event-category="Header"
                                    data-event-action="Menu"
                                    data-event-label={navItem.label}
                                    data-event-non-interaction="true">{navItem.label}
                                </Link>
                            </li>
                        }
                    }))
                )
            }
        </>
    )
}

Navigation.defaultProps = {
    navClass: `site-nav-item`,
}

Navigation.propTypes = {
    site: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string,
        logo: PropTypes.string,
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
    navClass: PropTypes.string,
    isSecondary: PropTypes.bool,
    mobile: PropTypes.bool,
}

export default Navigation
