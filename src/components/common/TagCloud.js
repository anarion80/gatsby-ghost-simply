import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
/**
* TagCloud component
* Used in Footer
*
*
*/

const TagCloud = () => {
    const tags = useStaticQuery(graphql`
        query GhostTagsQuery {
        allGhostTag(
            limit: 5
            filter: {visibility: {eq: "public"}}
            sort: {postCount: DESC}
        ) {
            edges {
                node {
                    name
                    slug
                    url
                    canonical_url
                    accent_color
                    id
                    postCount
                }
            }
        }
        }
    `)

    return (tags.allGhostTag.edges.map(tagItem => (
        <div className="mb-3 flex items-center justify-between leading-tight" key={tagItem.node.id}>
            <Link to={`/tag` + `/${tagItem.node.slug}/`}
                title={tagItem.node.name}
                className="capitalize pl-3 border-l-4 border-primary"
                style= { tagItem.node.accent_color && { borderColor: tagItem.node.accent_color } }>{tagItem.node.name}
            </Link>
            <div className="footer-arrow"></div>
        </div>
    )))
}

export default TagCloud