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
    vibes = [], 
    ...props 
}) => {
    console.log('DEBUG useFilterState: ', cities, categories, tags, vibes);
    const [selectedCities, setSelectedCities] = useState(cities);
    const [selectedCategories, setSelectedCategories] = useState(categories);
    const [selectedTags, setSelectedTags] = useState(tags);
    const [selectedVibes, setSelectedVibes] = useState(vibes);

    return { 
        // Data
        categories_all,
        category_slugs,
        city_slugs,
        tags,
        vibes_slugs,
        // Getters
        selectedCities,
        selectedCategories,
        selectedVibes,
        // Seters   
        setSelectedCities,
        setSelectedCategories,
        setSelectedTags,
        setSelectedVibes,        
    }
}

export default useFilterState