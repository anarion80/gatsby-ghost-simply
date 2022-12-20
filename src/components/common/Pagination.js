import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useLang, getTranslation } from '../../utils/use-lang'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext
    const t = getTranslation(useLang())

    return (
        <nav className="pagination" role="navigation">
            <div>
                {previousPagePath && (

                    <Link to={previousPagePath} rel="prev" className="button is-primary text-sm font-medium md:flex gh-portal-close">
                            ← {t(`Newer_Posts`)}
                    </Link>

                )}
            </div>
            {numberOfPages > 1 && <span className="page-number">{t(`Page`)} {humanPageNumber} {t(`of`)} {numberOfPages}</span>}
            <div>
                {nextPagePath && (

                    <Link to={nextPagePath} rel="next" className="button is-primary text-sm font-medium md:flex gh-portal-close">
                        {t(`Older_Posts`)} →
                    </Link>
                )}
            </div>
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
