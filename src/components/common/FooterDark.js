import React from 'react'
import PropTypes from 'prop-types'
import { Navigation, TagCloud, SocialMediaWidget } from '.'
import { useLang, getTranslation } from '../../utils/use-lang'
import ghostConfig from '../../../.ghost.json'
/**
* Footer component
*
*
*/

const FooterDark = ({ site }) => {
    const t = getTranslation(useLang())

    const handleSend = (event) => {
        const form = document.querySelector(`#subscribe_form`)
        const submitResponse = document.querySelector(`#response`)
        const formURL = `${ghostConfig.production.apiUrl}/members/api/send-magic-link/`
        const email = Array.from(form).filter(item => item.id)[0].value
        const body = JSON.stringify({ email: email, emailType: `subscribe` })
        event.preventDefault()

        console.log(`Addinng ` + email)
        submitResponse.innerHTML = `Wysyłanie...`
        submitResponse.classList.remove(`hidden`)

        // Create the AJAX request
        const xhr = new XMLHttpRequest()
        xhr.open(form.method, formURL, true)
        xhr.setRequestHeader(`Accept`, `application/json; charset=utf-8`)
        xhr.setRequestHeader(`Content-Type`, `application/json; charset=UTF-8`)

        // Send the collected data as JSON
        xhr.send(body)

        xhr.onloadend = (response) => {
            if (response.target.status === 200 || response.target.status === 201) {
                form.reset()
                submitResponse.innerHTML = `Sent!`
            } else {
                submitResponse.innerHTML = `Error! Try again!`
                console.error((response))
            }
        }
    }

    return (
        <>
            {
                <footer className="footer pt-10">
                    <section className="mx-auto max-w-extreme px-4">
                        <div className="row">
                            {/*{!-- About --} */}
                            <div className="col s12 m8 l4 mb-16 lg:mb-0 flexColumnTop">
                                <div className="footer-items flexColumnTop flex-grow">
                                    <h3 className="footer-items-title mb-6 text-22">{t(`About_Us`)}</h3>
                                    <div className="footer-b flex-grow mb-4">
                                        <p className="mb-4 text-base">{site.description}</p>
                                    </div>

                                    {/*{!-- Social Media - partilas/widget/social-media.hbs --}*/}
                                    <SocialMediaWidget site={site} class="footer-social-media" />
                                </div>
                            </div>

                            {/*{!-- Tag Cloud --}*/}
                            <div className="col s12 m8 l4 mb-16 lg:mb-0 flexColumnTop">
                                <div className="footer-items footer-tags flex-grow px-4">
                                    <h3 className="footer-items-title mb-6 text-22">{t(`Tags`)}</h3>
                                    <TagCloud />
                                </div>
                            </div>

                            {/*{!-- members subscribe --}*/}
                            <div className="col s12 m8 l4 mb-16 lg:mb-0 flexColumnTop">
                                <div className="footer-items flex-grow">
                                    <h3 className="footer-items-title mb-6 text-22">{t(`Subscribe`)}</h3>
                                    <p className="mb-4">{t(`Stay_up_to_date__Get_all_the_latest___greatest_posts_delivered_straight_to_your_inbox`)}</p>

                                    {/*{!-- Form subscribe --}*/}
                                    <form
                                        className="max-w-sm simply-form"
                                        data-members-form="subscribe"
                                        id="subscribe_form"
                                        method="POST"
                                        onSubmit={handleSend}
                                    >
                                        <input
                                            className="footer-form-input"
                                            data-members-email
                                            type="email"
                                            id="email"
                                            placeholder="youremail@example.com"
                                            aria-label="youremail@example.com"
                                            autoComplete="off"
                                            required
                                        />

                                        <button className="button is-primary w-full mt-4" type="submit">
                                            <span className="button-content">{t(`Continue`)}</span>
                                            <span className="button-loader hidden">
                                                <svg className="icon icon--loader u-hide" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M32 16c-0.040-2.089-0.493-4.172-1.331-6.077-0.834-1.906-2.046-3.633-3.533-5.060-1.486-1.428-3.248-2.557-5.156-3.302-1.906-0.748-3.956-1.105-5.981-1.061-2.025 0.040-4.042 0.48-5.885 1.292-1.845 0.809-3.517 1.983-4.898 3.424s-2.474 3.147-3.193 4.994c-0.722 1.846-1.067 3.829-1.023 5.79 0.040 1.961 0.468 3.911 1.254 5.694 0.784 1.784 1.921 3.401 3.316 4.736 1.394 1.336 3.046 2.391 4.832 3.085 1.785 0.697 3.701 1.028 5.598 0.985 1.897-0.040 3.78-0.455 5.502-1.216 1.723-0.759 3.285-1.859 4.574-3.208 1.29-1.348 2.308-2.945 2.977-4.67 0.407-1.046 0.684-2.137 0.829-3.244 0.039 0.002 0.078 0.004 0.118 0.004 1.105 0 2-0.895 2-2 0-0.056-0.003-0.112-0.007-0.167h0.007zM28.822 21.311c-0.733 1.663-1.796 3.169-3.099 4.412s-2.844 2.225-4.508 2.868c-1.663 0.646-3.447 0.952-5.215 0.909-1.769-0.041-3.519-0.429-5.119-1.14-1.602-0.708-3.053-1.734-4.25-2.991s-2.141-2.743-2.76-4.346c-0.621-1.603-0.913-3.319-0.871-5.024 0.041-1.705 0.417-3.388 1.102-4.928 0.683-1.541 1.672-2.937 2.883-4.088s2.642-2.058 4.184-2.652c1.542-0.596 3.192-0.875 4.832-0.833 1.641 0.041 3.257 0.404 4.736 1.064 1.48 0.658 2.82 1.609 3.926 2.774s1.975 2.54 2.543 4.021c0.57 1.481 0.837 3.064 0.794 4.641h0.007c-0.005 0.055-0.007 0.11-0.007 0.167 0 1.032 0.781 1.88 1.784 1.988-0.195 1.088-0.517 2.151-0.962 3.156z"></path></svg></span>
                                        </button>

                                        {/*{!-- success --}*/}
                                        <div className="message-success mx-auto max-w-xl w-full bg-success text-white p-2 rounded-md mt-4 hidden text-sm" id="response"
                                            dangerouslySetInnerHTML={{ __html: t(`_strong_Great___strong__Check_your_inbox_and_click_the_link_to_confirm_your_subscription`) }} >
                                        </div>

                                        {/*{!-- error --}*/}
                                        <div className="message-error mx-auto max-w-xl w-full bg-danger text-white p-2 rounded-md mt-4 hidden text-sm">
                                            {t(`Please_enter_a_valid_email_address_`)}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        { site.secondary_navigation ?
                            <div className="footer-bottom flex flex-col text-center py-8 mt-8 lg:items-baseline lg:flex-row lg:text-left">
                                {/*{!-- Copy --}*/}
                                <div className="text-sm flex-none lg:max-w-xs order-1 lg:order-none">
                                        &copy; {new Date().getFullYear()} {site.title}. All rights reserved.<br />
                                    <a href="https://github.com/anarion80/gatsby-ghost-simply" title="Gatsby-Ghost-Simply">Created</a> with <a href="https://www.gatsbyjs.com/" title="Gatsby"><svg className="icon icon-gatsby"><use xlinkHref="#icon-gatsby"></use></svg></a><a href="https://reactjs.org/" title="ReactJS"><svg className="icon icon-react"><use xlinkHref="#icon-react"></use></svg></a>and <a href="https://godofredo.ninja" title="Developer FullStack.">@GodoFredoNinja</a> styling.
                                </div>

                                {/*{!-- Footer Menu --}*/}
                                <div className="flex-1 text-sm py-4 lg:text-right lg:py-0 lg:ml-6"><Navigation site={site} navClass="menu-secondary" isSecondary={true}/></div>
                            </div>
                            :
                            <div className="footer-bottom text-center py-8 mt-8 text-sm">
                                    &copy; {new Date().getFullYear()} {site.title}. All rights reserved.<br />
                                <a href="https://github.com/anarion80/gatsby-ghost-simply" title="Gatsby-Ghost-Simply">Created</a> with <a href="https://www.gatsbyjs.com/" title="Gatsby"><svg className="icon icon-gatsby"><use xlinkHref="#icon-gatsby"></use></svg></a><a href="https://reactjs.org/" title="ReactJS"><svg className="icon icon-react"><use xlinkHref="#icon-react"></use></svg></a>and <a href="https://godofredo.ninja" title="Developer FullStack.">@GodoFredoNinja</a> styling.
                            </div>
                        }

                    </section>
                </footer>
            }
        </>
    )
}

//Footer.defaultProps = {
//    navClass: `site-nav-item`,
//}

FooterDark.propTypes = {
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
}

export default FooterDark