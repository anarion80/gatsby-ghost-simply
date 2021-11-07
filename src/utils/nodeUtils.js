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
    if (node.slug === `docs`) {
        return path.resolve(`./src/templates/custom/custom-kusi-home.js`)
    } else if (node.custom_template === null || node.custom_template === undefined || !fs.existsSync(`./src/templates/custom/${node.custom_template}.js`)) {
        return typeDefault(node.internal.type)
    } else {
        return path.resolve(`./src/templates/custom/${node.custom_template}.js`)
    }
}

module.exports = {
    getCustomTemplate,
    typeDefault,
}