const relativeUrl = url => url.replace(/https?:\/{2}[^/]+/, ``)

const _ = require(`lodash`)

// higher order function
const withPrefixPath = prefixPath => path => normalizePath(`/${prefixPath}/${path}/`)

const normalizePath = (path) => {
    const normalize = `/${_.trim(path,`/`)}/`
    return normalize.replace(`////`,`/`).replace(`///`,`/`).replace(`//`,`/`)
}

const splitUrl = (url) => {
    // Regexp to extract the absolute part of the CMS url
    const regexp = /^(([\w-]+:\/\/?|www[.])[^\s()<>^/]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/)))/

    const [absolute] = url.match(regexp) || []
    const relative = url.split(absolute, 2).join(`/`)
    return ({
        absolute: absolute,
        relative: relative,
    })
}

const resolveUrl = (collectionPath = `/`, url) => {
    // resolveBase and resolvePath are a functions!
    const resolvePath = withPrefixPath(collectionPath)

    if (!(url !== null && url !== undefined && url.length > 0)) {
        return normalizePath(resolvePath(`/`))
    }

    const { absolute: cmsUrl, relative: dirUrl } = splitUrl(url)

    // Early exit if absolute part cannot be found
    if (!(cmsUrl !== null && cmsUrl !== undefined && cmsUrl.length > 0)) {
        return normalizePath(url)
    }
    return resolvePath(dirUrl)
}

module.exports = { relativeUrl, resolveUrl }

