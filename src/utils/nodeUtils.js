const path = require(`path`)
const fs = require(`fs`)

const typeDefault = function typeDefault(type) {
    if (type === `GhostPost`) {
        return path.resolve(`./src/templates/post.js`)
    } else if (type === `GhostPage`) {
        return path.resolve(`./src/templates/page.js`)
    } else {
        return null
    }
}
const getCustomTemplate = function getCustomTemplate(node) {
    if (node.tags.length === 0) {
        return typeDefault(node.internal.type)
    } else {
        const template = node.tags.filter(tag => tag.name.includes(`#custom-`)).length > 0 && node.tags.filter(tag => tag.name.includes(`#custom-`))[0].name.slice(1)
        if (template === null || template === undefined || !fs.existsSync(`./src/templates/custom/${template}.js`)) {
            return typeDefault(node.internal.type)
        } else {
            return path.resolve(`./src/templates/custom/${template}.js`)
        }
    }
}

module.exports = {
    getCustomTemplate,
    typeDefault,
}