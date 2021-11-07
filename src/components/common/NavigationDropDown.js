import React from "react"
import { SocialMediaWidget } from "."
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import siteConfig from "../../utils/siteConfig"
import { useLang, getTranslation } from '../../utils/use-lang'

//import dropDownToggle from "../../utils/dropDownToggle"

const NavigationDropDown = ({ site, hasDropDown }) => {
    const menuDropdown = siteConfig.menuDropdown
    const t = getTranslation(useLang())

    /*useEffect(() => {
        dropDownToggle(`.dropdown:not(.is-hoverable)`)
    }, []) */

    return (
        hasDropDown &&
        <li className={`dropdown is-hoverable ml-5 ` + (!(site.facebook || site.twitter) && `hidden`)}>
            <a href="#" className="mainMenu-link dropdown-trigger hover:text-primary font-medium">
                <span>{t(`More`)}</span>
                <svg className="icon is-small transform rotate-90"><use xlinkHref="#icon-arrow-forward"></use></svg>
            </a>
            <div className="dropdown-menu whitespace-normal">
                <div className="dropdown-content">
                    <div className="js-dropdown-menu">
                        {menuDropdown.map((menuItem, i) => (
                            <Link
                                key={i}
                                className="dropdown-item hover:text-primary"
                                to={menuItem.url}
                                partiallyActive={true}
                                data-event-category="Header"
                                data-event-action="Menu - DropDown"
                                data-event-label={menuItem.label}
                                data-event-non-interaction="true">{menuItem.label}
                            </Link>
                        ))}
                    </div>
                    <hr className="dropdown-divider" />
                    <SocialMediaWidget site={site} divClass="social-media" />
                </div>
            </div>
        </li>
        /* Or use secondary navigation in the drop down */
        /* <li className={`dropdown is-hoverable ml-5 ` + (!(site.facebook || site.twitter) && `hidden`)}>
            <a href="#" className="mainMenu-link dropdown-trigger hover:text-primary font-medium">
                <span>More</span>
                <svg className="icon is-small transform rotate-90"><use xlinkHref="#icon-arrow-forward"></use></svg>
            </a>
            <div className="dropdown-menu whitespace-normal">
                <div className="dropdown-content">
                    <div className="js-dropdown-menu">
                        {site.secondary_navigation.map((menuItem, i) => (
                            <Link
                                key={i}
                                className="dropdown-item hover:text-primary"
                                to={menuItem.url}
                                partiallyActive={true}
                                data-event-category="Header"
                                data-event-action="Menu - DropDown"
                                data-event-label={menuItem.label}
                                data-event-non-interaction="true">{menuItem.label}
                            </Link>
                        ))}
                    </div>
                    <hr className="dropdown-divider" />
                    <SocialMediaWidget site={site} divClass="social-media" />
                </div>
            </div>
        </li> */
    )
}

NavigationDropDown.propTypes = {
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
    hasDropDown: PropTypes.bool,
}

export default NavigationDropDown
