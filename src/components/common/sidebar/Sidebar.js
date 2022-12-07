import React from 'react'
import SidebarPostCard from './SidebarPostCard'
import { useStaticQuery, graphql } from 'gatsby'

const Sidebar = () => {
    const featuredPosts = useStaticQuery(graphql`
        query GhostFeaturedPostsQuery {
        allGhostPost(
            limit: 5
            filter: {visibility: {eq: "public"}, featured: {eq: true}, tags: {elemMatch: {name: {nin: ["#portfolio", "#podcast"]}}}}
            sort: {published_at: DESC}
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
        }
    `).allGhostPost.edges

    return (
    //const featuredPosts = posts.filter(item => item.node.featured)
        <aside className="sidebar col s12 l4 flex flex-col justify-start mt-12 lg:mt-0">
            <div className="flex flex-col flex-1">
                <SidebarPostCard widgetTitle="Featured Articles" widgetPosts={featuredPosts} />
            </div>
        </aside>
    )
}

export default Sidebar
