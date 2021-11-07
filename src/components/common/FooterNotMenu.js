import React from 'react'
import PropTypes from 'prop-types'
import { SocialMediaWidget } from '.'
import { siteUrl } from '../../utils/siteConfig'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
/**
* Footer component
*
*
*/

const FooterNotMenu = ({ site, isPost }) => {
    const image = site.logo ? getImage(site.localLogo) : null

    return (
        <>
            {
                <footer className={`ooter-light py-10 lg:pt-16 text-center lg:text-left` + (isPost && ` bg-gray-150`)} >
                    <section className="mx-auto max-w-extreme px-4">
                        <div className="flex flex-col lg:flex-row justify-between">
                            <div className="flex flex-col lg:flex-row lg:items-center">
                                <div className="footer-logo leading-none">
                                    <a href={siteUrl} className="inline-block">
                                        {site.logo ?
                                            <GatsbyImage image={image} className="max-h-8" alt={site.title} />
                                            :
                                            <span className="font-bold text-title text-3xl">{site.title}</span>
                                        }
                                    </a>
                                </div>

                                {/* {{!-- Social Media --}} */}
                                <SocialMediaWidget site={site} class="footer-social-media social-media is-inline my-5 lg:my-0 lg:ml-10" />
                            </div>

                            <div className="footer-copy lg:text-right text-sm">
                                         &copy; {new Date().getFullYear()} {site.title}. All rights reserved.<br />
                                <a href="https://github.com/anarion80/gatsby-ghost-simply" title="Gatsby-Ghost-Simply">Created</a> with <a href="https://www.gatsbyjs.com/" title="Gatsby"><svg className="icon icon-gatsby"><use xlinkHref="#icon-gatsby"></use></svg></a><a href="https://reactjs.org/" title="ReactJS"><svg className="icon icon-react"><use xlinkHref="#icon-react"></use></svg></a>and <a href="https://godofredo.ninja" title="Developer FullStack.">@GodoFredoNinja</a> styling.
                            </div>

                        </div>

                    </section>
                </footer>
            }
        </>
    )
}

//Footer.defaultProps = {
//    navClass: `site-nav-item`,
//}

FooterNotMenu.propTypes = {
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
        logo: PropTypes.string,
        localLogo: PropTypes.object,
        url: PropTypes.string,
    }).isRequired,
    isPost: PropTypes.bool,
}

export default FooterNotMenu