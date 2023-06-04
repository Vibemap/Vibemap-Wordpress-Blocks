import React from 'react'
import { useState } from '@wordpress/element';

import allActivities from 'vibemap-constants/dist/activityCategories.json'
import cities from 'vibemap-constants/dist/cities.json'
import { getVibes, getCategoriesByLevel } from 'vibemap-constants/dist/vibes.js'

const categories1 = getCategoriesByLevel(1)
const categories2 = getCategoriesByLevel(2)
const categories = categories1.concat(categories2)
const category_slugs = allActivities.activityCategories.map(cat => cat.slug)
const city_slugs = cities.map(city => city.slug)
const vibes_slugs = getVibes()

const useFilterState = () => {
    
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedVibes, setSelectedVibes] = useState([]);

    return { 
        // Data
        categories,
        category_slugs,
        city_slugs,
        vibes_slugs,
        // Getters
        selectedCities,
        selectedCategories,
        selectedVibes,
        // Seters   
        setSelectedCities,
        setSelectedCategories,
        setSelectedVibes,
    }
}

export default useFilterState