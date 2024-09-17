import React from 'react'

const Embed = ({
    height = 800,
    radius = 60,
    zoom = 14,
    domain = `https://vibemap.com`,
    path = `map`,
    // Emeded map options
    city = `peoria`,
    theme = 'peoria',
    categories = [],
    tags = [],
    vibes = [],
    ...props
}) => {

    const is_dev = false
    domain = is_dev
        ? `http://localhost:8080`
        : domain

    console.log('Embed domain ', domain);

    const searchParams = new URLSearchParams({
        embedded: 1,
        placeLayout: 'both',
        activities: categories, // TODO: rename to categories
        cities: city,
        tags: tags,
        vibes: vibes,
        radius: radius,
        showCats: 0,
        showTags: 1,
        showVibes: 0,
        theme: theme,
        zoom: zoom
    });

    const src = `${domain}/${path}/?${searchParams}`

    console.log('DEBUG: Embed src ', src, ' in Embed', zoom);

    const iframe = (
        `<iframe
            allowtransparency="true"
            allowfullscreen="true"
            frameborder="no"
            height=${height}
            onload="resizeIframe(this)"
            style="width: 100%;"
            scrolling="no"
            title="Vibemap Widget"
            src="${src}">
        </iframe>`
    )

    return (
        <div className={`vibemap-embed ${path}`}
            style={{ 'height': height }}
            dangerouslySetInnerHTML={{
                __html: iframe ? iframe : ""
            }}
        />
    )
}

export default Embed