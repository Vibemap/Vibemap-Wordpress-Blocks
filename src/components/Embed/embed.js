import React from 'react'

const Embed = ({
    height = 500,
    domain = `https://vibemap.com`,
    path = `events`,
    // Emeded map options
    city = `peoria`,
    categories = [],
    vibes = [],
    ...props
}) => {

    const is_dev = true
    domain = is_dev
        ? `http://localhost:8080`
        : domain

    console.log('Embed domain ', domain);

    const searchParams = new URLSearchParams({
        embedded: 1,
        placeLayout: 'both',
        cities: city,
        vibes: vibes,
    });

    const src = `${domain}/${path}/?${searchParams}`

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