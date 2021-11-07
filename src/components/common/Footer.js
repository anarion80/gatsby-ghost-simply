import React from 'react'
import PropTypes from 'prop-types'
import { Navigation, SocialMediaWidget } from '.'

/**
* Footer component
*
*
*/

const Footer = ({ site, isPost }) => (

    <>
        {
            <footer className={`footer-light py-10 lg:pt-16 text-center lg:text-left` + (isPost === true ? ` bg-gray-150` : ``)} >
                <div className="mx-auto max-w-extreme px-4">
                    <div className="flex flex-col lg:flex-row justify-between">
                        {/* {{!-- Copy Right --}} */}
                        <div className="footer-copy text-sm order-3 mt-8 flex-none lg:text-left lg:order-none lg:mt-0">
                            &copy; {new Date().getFullYear()} {site.title}. All rights reserved.<br />
                            <a href="https://github.com/anarion80/gatsby-ghost-simply" title="Gatsby-Ghost-Simply">Created</a> with <a href="https://www.gatsbyjs.com/" title="Gatsby"><svg className="icon icon-gatsby"><use xlinkHref="#icon-gatsby"></use></svg></a><a href="https://reactjs.org/" title="ReactJS"><svg className="icon icon-react"><use xlinkHref="#icon-react"></use></svg></a>and <a href="https://godofredo.ninja" title="Developer FullStack.">@GodoFredoNinja</a> styling.
                        </div>

                        {/* {{!-- Footer Menu --}} */}
                        {site.secondary_navigation &&
                            <div className="mx-8">
                                <Navigation site={site} navClass="menu-secondary" isSecondary={true}/>
                            </div>
                        }

                        {/* {{!-- Social Media --}} */}
                        <SocialMediaWidget site={site} class="footer-social-media mt-8 flex-none lg:mt-0 is-inline" />
                    </div>
                </div>
            </footer>
        }
    </>

)

//Footer.defaultProps = {
//    navClass: `site-nav-item`,
//}

Footer.propTypes = {
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
    isPost: PropTypes.bool,
}

export default Footer