import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import SidebarPostCard from './SidebarPostCard'

const SidebarPost = () => {
    const latestPosts = useStaticQuery(graphql`
        query GhostSidebarLatestPostsQuery {
        allGhostPost(
            limit: 5
            filter: {visibility: {eq: "public"}, tags: {elemMatch: {name: {nin: ["#portfolio","#podcast","#custom-kusi-doc"]}}}},
            sort: {order: DESC, fields: [published_at]}
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
        <aside className="sidebar col s12 l4 flex flex-col justify-start mt-12 lg:mt-0">
            <div className="flex flex-col flex-1">
                <SidebarPostCard widgetTitle="Latest Posts" widgetPosts={latestPosts} />
            </div>
        </aside>
    )
}

export default SidebarPost
