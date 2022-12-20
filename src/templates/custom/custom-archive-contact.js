import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Layout } from '../../components/common'
import { MetaData } from '../../components/common/meta'
import { useLang, getTranslation } from '../../utils/use-lang'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const ArchiveContact = ({ data, location }) => {
    const page = data.ghostPage
    const t = getTranslation(useLang())

    const handleSend = (event) => {
        const form = document.querySelector(`#contact_form`)
        const submitResponse = document.querySelector(`#response`)
        const formURL = `https://your.service`

        event.preventDefault()

        // Capture the form data
        let data2 = {}
        Array.from(form).map(input => (data2[input.id] = input.value))
        console.log(`Sending: `, JSON.stringify(data2))
        submitResponse.innerHTML = `Sending...`

        // Create the AJAX request
        const xhr = new XMLHttpRequest()
        xhr.open(form.method, formURL, true)
        xhr.setRequestHeader(`Accept`, `application/json; charset=utf-8`)
        xhr.setRequestHeader(`Content-Type`, `application/json; charset=UTF-8`)

        // Send the collected data as JSON
        xhr.send(JSON.stringify(data2))

        xhr.onloadend = (response) => {
            if (response.target.status === 200) {
                form.reset()
                submitResponse.innerHTML = `Form sent!`
            } else {
                submitResponse.innerHTML = `Error! Try again but make sure to configure your service first!`
                console.error(JSON.parse(response))
            }
        }
    }

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${page.codeinjection_styles}`}</style>
            </Helmet>
            <Layout footer={true} isPost={false} bodyClass="archive-contact">
                <article className="container mx-auto py-12 relative">
                    <header className="mx-auto max-w-740 mb-10 text-center">
                        <h1 className=" font-normal mb-8 text-xl text-gray-600">{page.title}</h1>
                        {page.custom_excerpt && <p className="text-3xl text-title font-semibold">{page.custom_excerpt}</p>}
                    </header>
                    <form
                        className="max-w-740 mx-auto mb-16"
                        id="contact_form"
                        method="POST"
                        onSubmit={handleSend}
                        //action="https://getform.io/{your-unique-getform-endpoint}" //Add your Getform endpoint
                        //action="https://formspree.io/email@domain.tld" //Add your Formspree email
                    >
                        {/* <form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact">
                        <input type="hidden" name="bot-field" />
                        <input type="hidden" name="form-name" value="contact" /> use this for Netlify*/}

                        <div className="row">
                            <div className="col s12 m6 mb-8">
                                <input name="name" type="name" id="name" placeholder={t(`Name`,`Name`)} required />
                            </div>
                            <div className="col s12 m6 mb-8">
                                <input name="email" type="email" id="email" placeholder={t(`Email_Address`,`Email Address`)} required />
                                {/* <input name="_replyto" type="email" id="email" placeholder={t(`Email_Address`,`Email Address`)} required />
                                <input type="text" name="_gotcha" style="display:none" />  use this for Formspree */}
                            </div>

                            <div className="col s12 mb-8"><textarea id="message" name="message" placeholder={t(`Message`,`Message`)} required></textarea></div>
                            <div className="col s12 mb-8" id="response"></div>
                            <div className="col s12 text-center mb-10"><button type="submit" className="button is-primary">{t(`Send`)}</button></div>
                        </div>
                    </form>

                    <div className="pae row text-center mb-16">
                        <div className="col s12 m6 l4 mb-8">
                            <div className="pae-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line></svg>
                            </div>
                            <h4 className="pae-title">{t(`PHONE`,`PHONE`)}</h4>
                            <div className="pae-des">
                                <p>123 456 789</p>
                            </div>
                        </div>

                        <div className="col s12 m6 l4 mb-8">
                            <div className="pae-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </div>
                            <h4 className="pae-title">{t(`ADDRESS`,`ADDRESS`)}</h4>
                            <div className="pae-des">
                                <p>Beverly Hills 90210</p>
                            </div>
                        </div>

                        <div className="col s12 m6 l4 mb-8">
                            <div className="pae-icon">
                                <svg viewBox="0 0 24 24" width="64" height="64" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <h4 className="pae-title">{t(`EMAIL`,`EMAIL`)}</h4>
                            <div className="pae-des">
                                <p>example@email.com</p>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto" style={{ background: `#ccc`, height: `50px`, width: `2px`, marginBottom: `90px` }}></div>

                    <div className="archive-contact-maps text-center mb-16">
                        <div className="video-responsive">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26430.3824522563!2d-118.43205504986142!3d34.10031984447635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc35fbd217ef%3A0xcf1ef9352700d95c!2sBeverly%20Hills%2C%20Kalifornia%2090210%2C%20Stany%20Zjednoczone!5e0!3m2!1spl!2spl!4v1634830278900!5m2!1spl!2spl" width="600" height="450" style={{ border: `0` }} allowFullScreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                </article>
            </Layout>
        </>
    )
}

ArchiveContact.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default ArchiveContact

export const archiveContactQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            localFeatureImage {
                childImageSharp {
                gatsbyImageData(
                    transformOptions: {
                        fit: COVER, cropFocus: ATTENTION
                    }
                    width: 2000
                    placeholder: BLURRED
                    formats: [AUTO, WEBP]
                    )
                }
            }
            ...GhostPageFields
        }
    }
`
