import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { Navigation, SearchWidget, SideNav, NavigationDropDown } from '.'
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { StaticImage } from "gatsby-plugin-image"
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { relativeUrl } from "../../utils/relativeUrl"

/**
* Footer component
*
*
*/

const Header = ({ site, hasDropDown }) => {
    useEffect(() => {
        document.querySelector(`.js-menu-toggle`).addEventListener(`click`, function (e) {
            e.preventDefault()
            document.body.classList.toggle(`has-menu`)
        })
    }, [])

    return (
        <>
            <header className="header bg-header w-full text-sm flex items-center sticky top-0 z-20">
                <div className="header-wrap mx-auto flex items-center flex-auto px-4 w-full max-w-extreme">
                    <div className="header-left mr-5 flex flex-none items-center">
                        <Link
                            to={relativeUrl(site.url)} //TODO: To be removed
                            className="header-logo inline-block leading-none godo-tracking"
                            data-event-category="Header"
                            data-event-action="Logo"
                            data-event-label="Click"
                            data-event-non-interaction="true">

                            {site.logo ?
                                <GatsbyImage image={getImage(site.localLogo)} className="header-logo-img max-h-8 logo-default" alt={site.title} />
                                : <StaticImage src="../../images/ghost-icon.png" className="header-logo-img max-h-8 logo-default" alt={site.title} width="115" height="30"/>
                            }
                        </Link>
                    </div>

                    {site.navigation ?
                        <nav className="header-center mainMenu relative flex items-center pr-5 flex-grow overflow-auto lg:overflow-visible">
                            <ul itemScope="" itemType="http://www.schema.org/SiteNavigationElement" className="nav whitespace-no-wrap hidden lg:flex">
                                <Navigation site={site} navClass="mainMenu-link godo-tracking hover:text-primary font-medium" navigationDropDown={hasDropDown} />
                                <NavigationDropDown site={site} hasDropDown={hasDropDown} />
                            </ul>
                        </nav>
                        :
                        null}

                    <div className="header-right flex-none flex justify-end items-center u-menu-color">
                        <ThemeToggler>
                            {({ toggleTheme }) => (
                                <a role="button" className="js-dark-mode button is-white items-center hidden mr-2 md:flex" aria-label="Dark and Light Mode" onClick={() => toggleTheme(
                                    (localStorage.theme === `dark` || (!(`theme` in localStorage) && window.matchMedia(`(prefers-color-scheme: dark)`).matches)) ? `light` : `dark`)}>
                                    <svg className="icon icon--moon m-0" style={{ marginRight: `calc(-0.5em - 1px)` }}><use xlinkHref="#icon-moon"></use></svg>
                                    <svg className="icon icon--sunny m-0 hidden" style={{ marginLeft: `calc(-0.5em - 1px)` }}><use xlinkHref="#icon-sunny"></use></svg>
                                </a>
                            )}
                        </ThemeToggler>

                        <SearchWidget />
                        <div className="js-menu-toggle menu-burger button is-white relative ml-2 lg:hidden"><span></span><span></span><span></span></div>
                    </div>
                </div>
            </header>
            <SideNav site={site} />
        </>
    )
}

//Footer.defaultProps = {
//    navClass: `site-nav-item`,
//}

Header.propTypes = {
    site: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        url: PropTypes.string,
        logo: PropTypes.string,
        localLogo: PropTypes.object,
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
    logo: PropTypes.object,
    hasDropDown: PropTypes.bool,
}

export default Header