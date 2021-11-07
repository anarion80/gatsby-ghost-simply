import { graphql, useStaticQuery } from "gatsby"

const useLang = () => {
    const data = useStaticQuery(graphql`
    {
        ghostSettings {
            lang
        }
        allLocaleJson {
            edges {
                node {
                    language
                    ...GhostLanguageFields
                }
            }
        }
    }`)

    return data.allLocaleJson.edges.filter(item => item.node.language === (data.ghostSettings.lang || `en`))[0].node
}

const getTranslation = text => (name, fallback) => {
    if (text.content[name] === undefined && fallback === null) {
        console.log(`Cannot find ${name} in lang file.`)
    }

    if (text.content[name] === undefined || text.content[name] === null) {
        return fallback
    }

    return text.content[name]
}

export { useLang, getTranslation }