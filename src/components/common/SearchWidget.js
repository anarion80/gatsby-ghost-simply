import React, { useState, useEffect, useRef } from "react"
import { useLang, getTranslation } from '../../utils/use-lang'
import GhostSearch from '../../utils/ghostSearch'
import siteConfig from "../../utils/siteConfig"

/**
* SearchWidget component
*/

const SearchWidget = () => {
    useEffect(() => {
        function handleEsc(event) {
            if (event.keyCode === 27) {
                document.querySelector(`#search-field`).value = ``
                toggleSearchBar() // close the search bar
            }
        }
        window.addEventListener(`keydown`, handleEsc)
        return () => {
            window.removeEventListener(`keydown`, handleEsc)
        }
    }, [])

    useEffect(() => {
        const $body = document.body
        const $input = document.querySelector(`#search-field`)
        const $results = document.querySelector(`#search-results`)
        const $searchMessage = document.querySelector(`.js-search-message`)
        const searchSettings = siteConfig.searchSettings
        const classIsActive = `is-active`

        let allSearchLinksLength = 0

        let searchResultsHeight = {
            outer: 0,
            scroll: 0,
        }

        // Variable for search
        // -----------------------------------------------------------------------------

        const afterDisplaySearch = (results) => {
            // Active class to link search
            if (!$results) {
                return
            }
            searchResultActive()

            allSearchLinksLength = results.length

            searchResultsHeight = {
                outer: $results.offsetHeight,
                scroll: $results.scrollHeight,
            }

            if (results.total === 0 && $input.value !== ``) {
                $searchMessage.classList.remove(`hidden`)
                $body.removeEventListener(`keydown`, mySearchKey)
            } else {
                $searchMessage.classList.add(`hidden`)
                $body.addEventListener(`keydown`, mySearchKey)
            }
        }

        const mySearchSettings = { on: { afterDisplay: results => afterDisplaySearch(results) } }

        // join user settings
        Object.assign(mySearchSettings, searchSettings)

        // when the Enter key is pressed
        // -----------------------------------------------------------------------------
        function enterKey() {
            const link = $results.querySelector(`a.${classIsActive}`)
            link && link.click()
        }

        // Attending the active class to the search link
        // -----------------------------------------------------------------------------
        function searchResultActive(index, upDown) {
            index = index || 0
            upDown = upDown || `up`

            const allSearchLinks = $results.querySelectorAll(`a`)
            // Return if there are no results
            if (!allSearchLinks.length) {
                return
            }

            // Remove All class Active
            allSearchLinks.forEach(element => element.classList.remove(classIsActive))

            // Add class active
            allSearchLinks[index].classList.add(classIsActive)

            // Scroll for results box
            const linkOffSetTop = allSearchLinks[index].offsetTop
            let scrollPosition = 0

            upDown === `down` && linkOffSetTop > searchResultsHeight.outer / 2 ? scrollPosition = linkOffSetTop - searchResultsHeight.outer / 2 : upDown === `up` && (scrollPosition = linkOffSetTop < searchResultsHeight.scroll - searchResultsHeight.outer / 2 ? linkOffSetTop - searchResultsHeight.outer / 2 : searchResultsHeight.scroll)

            $results.scrollTo(0, scrollPosition)
        }

        // Reacted to the up or down keys
        // -----------------------------------------------------------------------------
        function arrowKeyUpDown(keyNumber) {
            let upDown
            let indexTheLink = 0

            const resultActive = $results.querySelector(`.is-active`)

            if (resultActive) {
                indexTheLink = [].slice.call(resultActive.parentNode.children).indexOf(resultActive)
            }

            $input.blur()

            // 38 === UP
            if (keyNumber === 38) {
                upDown = `up`

                if (indexTheLink <= 0) {
                    $input.focus()
                    indexTheLink = 0
                } else {
                    indexTheLink -= 1
                }
            } else {
                upDown = `down`

                if (indexTheLink >= allSearchLinksLength - 1) {
                    indexTheLink = 0
                } else {
                    indexTheLink += 1
                }
            }

            searchResultActive(indexTheLink, upDown)
        }

        // Adding functions to the keys
        // -----------------------------------------------------------------------------
        function mySearchKey(e) {
            const keyNumber = e.keyCode

            /**
             * 38 => Up
             * 40 => down
             * 13 => enter
             **/

            if (keyNumber === 13) {
                $input.blur()
                enterKey()
            } else if (keyNumber === 38 || keyNumber === 40) {
                arrowKeyUpDown(keyNumber)
                e.preventDefault()
            }
        }
        // Search
        // -----------------------------------------------------------------------------
        /* eslint-disable no-new */
        new GhostSearch(mySearchSettings)
    }, [])

    const [clicked, setClicked] = useState(false)
    const inputRef = useRef()

    useEffect(() => {
        if (clicked) {
            inputRef.current.focus()
        }
    }, [clicked])

    const toggleSearchBar = () => {
        setClicked(prevState => !prevState)
    }
    const searchClassName = clicked ? `js-modal modal search flex flex-col flex-wrap items-center fixed inset-0 z-50 is-active` : `js-modal modal search flex flex-col flex-wrap items-center fixed inset-0 z-50`

    const t = getTranslation(useLang())
    //clicked ? setClicked(``) : setClicked(`js-modal modal search flex flex-col flex-wrap items-center fixed inset-0 z-50 is-active`)

    /*     const searchHandler = () => {
        useEffect(() => {
            console.log(`Search handler clicked!`)
        }, [])
    } */
    return (
        <>
            <a href="#"
                aria-label="Toggle Search"
                className="js-modal-button godo-tracking button is-white mr-2"
                data-target="modal-search"
                aria-haspopup="true"
                data-event-category="Header"
                data-event-action="Search"
                data-event-label="Click"
                data-event-non-interaction="true"
                onClick={toggleSearchBar}>
                <svg className="icon icon--search"><use xlinkHref="#icon-search"></use></svg>
            </a>
            <div id="modal-search" className={ searchClassName }>
                {/* {!-- Bg --}} */}
                <div className="absolute inset-0 bg-modal bg-opacity-60 js-modal-close"></div>

                {/* {!-- Close --} */}
                <div className="button is-dark is-circle absolute js-modal-close z-3 lg:hidden" style={{ top: `5px`, right: `5px` }} onClick={toggleSearchBar}>
                    <svg className="icon"><use xlinkHref="#icon-close"></use></svg>
                </div>

                <div className="modal-content relative z-2 max-w-2xl w-full pt-vw6 px-5 pb-5">
                    <div className="search-wrap bg-blank rounded-md shadow-sm">
                        {/* {!-- search form --} */}
                        <form className="search-form flex w-full items-center text-base px-3">
                            <svg className="icon icon--search"><use xlinkHref="#icon-search"></use></svg>
                            <input id="search-field" className="w-full is-medium" type="text" placeholder={`${t(`Search`)}...`} aria-label="Search box" ref={inputRef}/>
                        </form>
                        {/* {!-- show a message to the user if there is no post --} */}
                        <span className="js-search-message search-message text-sm p-2 text-gray-500 leading-none hidden">{t(`No_results_found`)}</span>
                        {/* {!-- Search results --} */}
                        <div id="search-results" className="search-results mx-auto w-full leading-none"></div>
                    </div>
                    {/* {!-- showing the function keys --} */}
                    <div className="justify-end text-xs leading-none text-white mt-2 hidden md:flex opacity-80">
                        <div className=""><span className="p-1 rounded bg-orange inline-block">↑</span> <span className="p-1 rounded bg-orange inline-block">↓</span>{t(`Navigate_up_down`)}</div>
                        <div className="ml-3"><span className="p-1 rounded bg-orange inline-block">Enter</span> {t(`Go_to_article`)}</div>
                        <div className="ml-3"><span className="p-1 rounded bg-orange inline-block">Esc</span> {t(`Close_search`)}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchWidget