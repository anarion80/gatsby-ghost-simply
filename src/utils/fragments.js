import { graphql } from 'gatsby'

/**
* These so called fragments are the fields we query on each template.
* A fragment make queries a bit more reuseable, so instead of typing and
* remembering every possible field, you can just use
*   ...GhostPostFields
* for example to load all post fields into your GraphQL query.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/graphql-reference/#fragments
*
*/

export const ghostTagCloudFields = graphql`
    fragment GhostTagCloudFields on GhostTag {
        name
        slug
        url
        canonical_url
        accent_color
        id
        postCount
    }
`

// Used for tag archive pages
export const ghostTagFields = graphql`
    fragment GhostTagFields on GhostTag {
        slug
        name
        visibility
        feature_image
        description
        meta_title
        meta_description
        url
    }
`

// Used for author pages
export const ghostAuthorFields = graphql`
    fragment GhostAuthorFields on GhostAuthor {
        slug
        name
        bio
        cover_image
        profile_image
        location
        website
        twitter
        facebook
        url
    }
`

// Used for single posts
export const ghostPostFields = graphql`
    fragment GhostPostFields on GhostPost {
        # Main fields
        id
        title
        slug
        featured
        feature_image
        excerpt
        custom_excerpt
        visibility

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMM, YYYY", locale: "en") # change your locale manually here
        published_at_pretty: published_at(formatString: "DD MMM, YYYY", locale: "en") # change your locale manually here
        published_at_month: published_at(formatString: "MM", locale: "en") # change your locale manually here
        published_at_archive: published_at(formatString: "MMM YYYY", locale: "en") # change your locale manually here
        updated_at_pretty: updated_at(formatString: "DD MMM, YYYY", locale: "en") # change your locale manually here

        # Dates unformatted
        created_at
        published_at
        updated_at

        # SEO
        meta_title
        meta_description
        og_description
        og_image
        og_title
        twitter_description
        twitter_image
        twitter_title

        # Authors
        authors {
            name
            slug
            bio
            # email
            profile_image
            twitter
            facebook
            website
            id
            url
        }
        primary_author {
            name
            slug
            bio
            # email
            profile_image
            twitter
            facebook
            url
            website
        }

        # Tags
        primary_tag {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
            accent_color
            url
            id
        }
        tags {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
            accent_color
            url
            id
        }

        # Content
        plaintext
        html

        # Tags
        internal {
            type
        }

        # Additional fields
        url
        canonical_url
        uuid
        page
        codeinjection_foot
        codeinjection_head
        codeinjection_styles
        comment_id
        reading_time

        childHtmlRehype {
            html
            tableOfContents
        }
    }
`

// Used for single pages
export const ghostPageFields = graphql`
    fragment GhostPageFields on GhostPage {
        # Main fields
        title
        slug
        featured
        feature_image
        excerpt
        custom_excerpt
        visibility

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMM, YYYY", locale: "en") # change your locale manually here
        published_at_pretty: published_at(formatString: "DD MMM, YYYY", locale: "en") # change your locale manually here
        updated_at_pretty: updated_at(formatString: "DD MMM, YYYY", locale: "en") # change your locale manually here

        # Dates unformatted
        created_at
        published_at
        updated_at

        # SEO
        meta_title
        meta_description
        og_description
        og_image
        og_title
        twitter_description
        twitter_image
        twitter_title

        # Authors
        authors {
            name
            slug
            bio
            # email
            profile_image
            twitter
            facebook
            website
        }
        primary_author {
            name
            slug
            bio
            # email
            profile_image
            twitter
            facebook
            website
        }

        # Tags
        primary_tag {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
        }
        tags {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
        }

        # Content
        plaintext
        html

        # Additional fields
        url
        canonical_url
        uuid
        page
        codeinjection_foot
        codeinjection_head
        codeinjection_styles
        comment_id
        reading_time
    }
`

// Used for settings
export const ghostSettingsFields = graphql`
    fragment GhostSettingsFields on GhostSettings {
        accent_color
        title
        description
        logo
        icon
        url
        cover_image
        facebook
        twitter
        lang
        timezone
        codeinjection_head
        codeinjection_foot
        codeinjection_styles
        navigation {
            label
            url
        }
        secondary_navigation {
            label
            url
        }
    }
`

// Used for language translations
export const ghostLanguageFields = graphql`
    fragment GhostLanguageFields on LocaleJson {
        # Content
        content {
            Back
            Newer_Posts
            of
            Older_Posts
            Page
            Subscribe
            Subscribe_to
            Subscribed_
            with_the_email_address
            Your_email_address
            You_ve_successfully_subscribed
            A_collection_of_posts
            A_collection_of_1_post
            A_collection_of___posts
            Get_the_latest_posts_delivered_right_to_your_inbox
            Latest_Posts
            No_posts
            Read_More
            Read__a_href___url___more_posts__a__by_this_author
            See_all___posts
            Share_this
            Stay_up_to_date__Get_all_the_latest___greatest_posts_delivered_straight_to_your_inbox
            youremail_example_com
            _1_post
            _xposts
            Search
            _x1xminxread
            _1_min_read
            _xminxread
            shares
            Comments
            Next_article
            Prev_article
            in
            Latest_Articles
            Tag_Cloud
            Follow
            Sign_up_for_my_newsletter_
            Related_Articles
            Unfortunately__this_page_doesn_t_exist
            Want_more_stuff_like_this_
            Get_the_best_viral_stories_straight_into_your_inbox_
            Listen
            Home
            More
            By
            Updated
            Posts_Tagged
            Total_number_of_posts
            The_full_archive
            Get_Started
            Log_in
            Upgrade
            Account
            Log_out
            Sign_in
            Sign_up
            Subscribe_now
            Signed_in_as
            This_post_is_for_paying_subscribers_only
            Read_the_rest_of_this_story_with_a_free_account_
            Hey_there_
            You_don_t_have_access_to_this_post_on__strong__siteTitle___strong__at_the_moment__but_if_you_upgrade_your_account_you_ll_be_able_to_see_the_whole_thing__as_well_as_all_the_other_posts_in_the_archive__Subscribing_only_takes_a_few_seconds_and_will_give_you_immediate_access_
            Already_have_an_account_
            You_ve_successfully_subscribed_to
            Great__Next__complete_checkout_for_full_access_to
            Welcome_back__You_ve_successfully_signed_in_
            Unable_to_sign_you_in__Please_try_again_
            Success__Your_account_is_fully_activated__you_now_have_access_to_all_content_
            Success__Your_billing_info_is_updated_
            Billing_info_update_failed_
            Read_more
            Previous_article
            Featured_Articles
            Go_to_the_profile_of
            Hi_I_m
            Go_to
            Stories
            Navigate_up_down
            Go_to_article
            Search_new_term
            Close_search
            No_results_found
            featured_story
            Read_post
            About_Us
            Share
            Share_on
            Send
            Related__span_class__text_primary__Articles__span_
            Please_enter_a_valid_email_address_
            _strong_Great___strong__Check_your_inbox_and_click_the_link_to_confirm_your_subscription
            GO_TOP
            Share_this_article
            Related__span_class__text_success__Articles__span_
            W_tej_chwili_nie_masz_dost_pu_do_tego_wpisu_na__strong__siteTitle___strong___ale_je_li_podniesiesz_wersj__swojego_konta_to_b_dziesz_m_g__zobaczy__jego_ca_o____jak_r_wnie__wszystkie_inne_posty_w_tym_archiwum__Subskrypcja_zajmuje_tylko_kilka_sekund_i_od_razu_masz_dost_p_
            _2_posts
            _1_Story
            _xStories
            No_Stories
            Tags
            Related_Posts
            Continue
            Name
            Email_Address
            Message
            PHONE
            ADDRESS
            EMAIL
            All
            View_Project
            Discover_more_of_what_matters_to_you
        }
    }
`
