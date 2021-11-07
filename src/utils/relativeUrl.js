export default function relativeUrl(url) {
    return url.replace(/https?:\/{2}[^/]+/, ``)
}
