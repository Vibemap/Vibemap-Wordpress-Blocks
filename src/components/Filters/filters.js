import React from 'react'
import { FormTokenField } from '@wordpress/components';

import useFilterState from './useFilterState.js';

// Props set from useFilterState
const Filters = ({
  categories,
  category_slugs,
  city_slugs,
  vibes_slugs,
  selectedCities,
  selectedCategories,
  selectedVibes,
  setSelectedCities,
  setSelectedCategories,
  setSelectedVibes,
  ...props
}) => {

  const activityPicker = (
    <FormTokenField
      __experimentalAutoSelectFirstMatch
      __experimentalExpandOnFocus
      label="Type a category"
      onChange={(tokens) => setSelectedCategories(tokens)}
      suggestions={category_slugs}
      value={selectedCategories}
    />
  )

  const cityPicker = (
    <FormTokenField
      __experimentalAutoSelectFirstMatch
      __experimentalExpandOnFocus
      label="Type a city"
      onChange={(tokens) => setSelectedCities(tokens)}
      suggestions={city_slugs}
      value={selectedCities}
    />
  )

  const vibePicker = (
    <FormTokenField
      __experimentalAutoSelectFirstMatch
      __experimentalExpandOnFocus
      label="Type a vibe"
      onChange={(tokens) => setSelectedVibes(tokens)}
      suggestions={vibes_slugs}
      value={selectedVibes}
    />
  )

  return (
    <>
      {activityPicker}
      {cityPicker}
      {vibePicker}
    </>    
  )
}

export default Filters