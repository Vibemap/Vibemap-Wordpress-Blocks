import React from 'react'
import { FormTokenField } from '@wordpress/components';

// Props set from useFilterState
const Filters = ({
  categories,
  category_slugs,
  city_slugs,
  vibes_slugs,
  selectedCities,
  selectedCategories,
  selectedTags,
  selectedVibes,
  setSelectedCities,
  setSelectedCategories,
  setSelectedTags,
  setSelectedVibes,
  tags = [],
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

  console.log('DEBUG tags: ', tags);

  const tagPicker = (
    <FormTokenField
      __experimentalAutoSelectFirstMatch
      __experimentalExpandOnFocus
      label="Type a tag"
      onChange={(tokens) => setSelectedTags(tokens)}
      suggestions={tags}
      value={selectedTags}
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
      {tagPicker}
    </>
  )
}

export default Filters