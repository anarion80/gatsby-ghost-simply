import React from 'react'
import PropTypes from 'prop-types'
import { Authors, DateTimeComponent } from '.'
import { Link } from 'gatsby'
import { relativeUrl } from "../../utils/relativeUrl"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { StaticImage } from 'gatsby-plugin-image'
import { useLang, getTranslation } from '../../utils/use-lang'

/**
* DateTimeComponent component
*/

const Author = ({ post, hideAvatar }) => {
    const authors = post.authors
    const t = getTranslation(useLang())

    return (
        <>
            <div className="hh flex items-center relative z-4 flex-auto leading-snug overflow-hidden">
                { !hideAvatar &&
                    <ul className="hh-author flex flex-wrap flex-none mr-3">
                        {authors.map(author => (
                            <li className="hh-author-item realtive" key={author.id}>
                                <Link
                                    className="relative block avatar is-45x45"
                                    to={relativeUrl(author.url)} //TODO to be removed
                                    title={`${t(`Go_to_the_profile_of`)} ` + author.name}>
                                    {author.profile_image ?
                                        <GatsbyImage image={getImage(author.localProfileImage)} className="object-cover rounded-full" alt={`${t(`Go_to_the_profile_of`)}` + author.name}/>
                                        :
                                        <StaticImage src="../../images/avatar.png" className="object-cover rounded-full" alt={`${t(`Go_to_the_profile_of`)} ` + author.name} width={36} height={36}/>
                                    }
                                </Link>
                            </li>
                        ))}
                    </ul>
                }

                <div className="hh-right flex-auto overflow-hidden">
                    <div className="hh-author-name text-sm noWrapWithEllipsis">
                        {/* {authors.length === 1 ? authors[0].name : authors.length === 2 ? authors[0].name + `, ` + authors[1].name : `Multiple authors`} */}
                        {authors.length > 2 ? `${t(`Multiple_authors`)}` : <Authors authors={authors} />}
                    </div>

                    <DateTimeComponent post={post} />
                </div>
            </div>
        </>
    )
}

Author.propTypes = {
    post: PropTypes.shape({
        authors: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                url: PropTypes.string,
                name: PropTypes.string,
                profile_image: PropTypes.string,
            }).isRequired,
        ).isRequired,
    }).isRequired,
    hideAvatar: PropTypes.bool,
}

export default Author