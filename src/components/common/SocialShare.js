import React from 'react'
import PropTypes from 'prop-types'
import siteConfig from '../../utils/siteConfig'
import { useLang, getTranslation } from '../../utils/use-lang'

const SocialShare = ({ post, divClass, trackingName }) => {
    const url = `${siteConfig.siteUrl}/${post.slug}/`
    const t = getTranslation(useLang())

    return (
        <aside className={`post-share flex items-center flex-none ` + (divClass ? divClass : `md:justify-end`)}>
            <span className="share-label text-gray-500 text-sm mr-2">{t(`Share`)}:</span>
            {/*{!-- Share on Twitter --}*/}
            {/*<a href="https://twitter.com/share?text={{encode title}}&amp;url={{url absolute="true"}}"*/}
            {/* <a href={`https://twitter.com/share?text=` + post.title + `&url=` + url} */}
            <a href={`https://twitter.com/share?url=` + url}
                target="_blank"
                rel="noopener noreferrer"
                className="godo-tracking text-gray-900 mr-2"
                aria-label={`${t(`Share_on`)} Twitter`}
                data-event-category="Article"
                data-event-action="Share"
                data-event-label={trackingName + `- Twitter`}
                data-event-non-interaction="true">
                <svg className="icon"><use xlinkHref="#icon-twitter"></use></svg>
            </a>
            {/*{!-- Share on Linkedin --}*/}
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=` + url + `&title=` + post.title}
                target="_blank"
                rel="noopener noreferrer"
                className="godo-tracking text-gray-900 mr-2"
                aria-label={`${t(`Share_on`)} Linkedin`}
                data-event-category="Article"
                data-event-action="Linkedin"
                data-event-label={trackingName + `- Linkedin`}
                data-event-non-interaction="true">
                <svg className="icon"><use xlinkHref="#icon-linkedin"></use></svg>
            </a>
            {/*{!-- Share on Facebook --}*/}
            <a href={`https://www.facebook.com/sharer/sharer.php?u=` + url}
                target="_blank"
                rel="noopener noreferrer"
                className="godo-tracking text-gray-900"
                aria-label={`${t(`Share_on`)} Facebook`}
                data-event-category="Article"
                data-event-action="Share"
                data-event-label={trackingName + `- Facebook`}
                data-event-non-interaction="true">
                <svg className="icon"><use xlinkHref="#icon-facebook"></use></svg>
            </a>
            {/*{!-- Share on WhatsApp --}*/}
            <a href={`whatsapp://send?text=` + url}
                target="_blank"
                rel="noopener noreferrer"
                className="godo-tracking text-gray-900 ml-2 md:hidden"
                aria-label={`${t(`Share_on`)} WhatsApp`}
                data-event-category="Article"
                data-event-action="Share"
                data-event-label={trackingName + `- WhatsApp`}
                data-event-non-interaction="true">
                <svg className="icon"><use xlinkHref="#icon-whatsapp"></use></svg>
            </a>
        </aside>
    )
}

SocialShare.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    divClass: PropTypes.string,
    trackingName: PropTypes.string.isRequired,
}

export default SocialShare
