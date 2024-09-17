import React from 'react'
import { useState } from '@wordpress/element';

import allActivities from 'vibemap-constants/dist/activityCategories.json'
import cities from 'vibemap-constants/dist/cities.json'
import { getVibes, getCategoriesByLevel } from 'vibemap-constants/dist/vibes.js'

const categories1 = getCategoriesByLevel(1)
const categories2 = getCategoriesByLevel(2)
const categories_all = categories1.concat(categories2)
const category_slugs = allActivities.activityCategories.map(cat => cat.slug)
const city_slugs = cities.map(city => city.slug)
const vibes_slugs = getVibes()

// Initial state is set in the block.json file
// Or the current state of the block attributes
const useFilterState = ({
    cities = [],
    categories = [],
    tags = [],
    tagsAll = [],
    vibes = [],
    heightDef = 800,
    radiusDef = 60,
    zoomDef = 14,
    ...props
}) => {
    console.log('DEBUG useFilterState: ', cities, categories, tagsAll, vibes);
    const [citiesSelected, setCitiesSelected] = useState(cities);
    const [categoriesSelected, setCategoriesSelected] = useState(categories);
    const [tagsSelected, setTagsSelected] = useState(tags);
    const [vibesSelected, setVibesSelected] = useState(vibes);
    const [height, setHeight] = useState(heightDef);
    const [radius, setRadius] = useState(radiusDef);
    const [zoom, setZoom] = useState(zoomDef);

    return {
        // Data
        categories_all,
        category_slugs,
        city_slugs,
        tagsAll,
        vibes_slugs,
        // Getters
        citiesSelected,
        categoriesSelected,
        tagsSelected,
        vibesSelected,
        height,
        radius,
        zoom,
        // Setters
        setCitiesSelected,
        setCategoriesSelected,
        setTagsSelected,
        setVibesSelected,
        setHeight,
        setRadius,
        setZoom
    }
}

export default useFilterState