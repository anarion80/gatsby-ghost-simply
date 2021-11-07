import React from 'react'
import PropTypes from 'prop-types'
import { SocialMediaWidget } from '.'
import { Navigation } from '.'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { useLang, getTranslation } from '../../utils/use-lang'

const SideNav = ({ site }) => {
    const t = getTranslation(useLang())

    return (
        <div className="nav-mob fixed inset-0 pt-16 bg-header h-screen z-10 w-full text-center overflow-y-auto lg:hidden">
            <div className="nav-mob-wrap absolute inset-0 top-16 pt-5 flex flex-col">

                {/*                 {{#unless @member}}
                <div class="py-4 flex justify-center md:hidden">
                    <a data-portal="signin" class="button mr-2 is-black text-sm font-medium" href="#">{t(`Log_in`)}</a>
                    <a data-portal="account/plans" class="button is-primary text-sm font-medium" href="#">{t(`Subscribe`)}</a>
                </div>
                {{/unless}} */}

                {/* {!-- Light and Dark Mode --} */}
                <ThemeToggler>
                    {({ toggleTheme }) => (
                        <div className="py-4 justify-center md:hidden">
                            <a role="button" className="js-dark-mode button is-white" aria-label="Dark and Light Mode" onClick={() => toggleTheme(
                                (localStorage.theme === `dark` || (!(`theme` in localStorage) && window.matchMedia(`(prefers-color-scheme: dark)`).matches)) ? `light` : `dark`)}>
                                <svg className="icon icon--moon m-0" style={{ marginRight: `calc(-0.5em - 1px)` }}><use xlinkHref="#icon-moon"></use></svg>
                                <svg className="icon icon--sunny m-0 hidden" style={{ marginLeft: `calc(-0.5em - 1px)` }}><use xlinkHref="#icon-sunny"></use></svg>
                            </a>
                        </div>
                    )}
                </ThemeToggler>

                {/* {!-- Navigation for Mobile --} */}
                {site.navigation && <div className="py-4 flex-auto"><Navigation site={site} navClass="mainMenu-link godo-tracking hover:text-primary font-medium" mobile={true}/></div>}

                {/* {!-- Social Media - partilas/widget/social-media.hbs --} */}
                <SocialMediaWidget site={site} divClass="nav-mob-social-media social-media is-inline py-4" />
            </div>
        </div>
    )
}

SideNav.propTypes = {
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
}

export default SideNav
