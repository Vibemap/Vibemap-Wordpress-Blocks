import React from 'react'
import { FormTokenField, __experimentalInputControl as InputControl } from '@wordpress/components';

// Props set from useFilterState
const Filters = ({
  categories,
  category_slugs,
  city_slugs,
  vibes_slugs,
  citiesSelected,
  categoriesSelected,
  tagsSelected,
  vibesSelected,
  setCitiesSelected,
  setCategoriesSelected,
  setTagsSelected,
  setVibesSelected,
  tags = [],
  zoom = 13,
  radius = 60,
  height = 800,
  setHeight,
  setRadius,
  setZoom,
  ...props
}) => {

  const zoomInput = (
    <InputControl
      type="number"
      value={zoom}
      onChange={(value) => setZoom(value)}
    />
  )

  const radiusInput = (
    <InputControl
      type="number"
      value={radius}
      onChange={(value) => setRadius(value)}
    />
  )

  const heightInput = (
    <InputControl
      type="number"
      value={height}
      onChange={(value) => setHeight(value)}
    />
  )


  const activityPicker = (
    <FormTokenField
      __experimentalAutoSelectFirstMatch
      __experimentalExpandOnFocus
      label="Type a category"
      onChange={(tokens) => setCategoriesSelected(tokens)}
      suggestions={category_slugs}
      value={categoriesSelected}
    />
  )

  const cityPicker = (
    <FormTokenField
      __experimentalAutoSelectFirstMatch
      __experimentalExpandOnFocus
      label="Type a city"
      onChange={(tokens) => setCitiesSelected(tokens)}
      suggestions={city_slugs}
      value={citiesSelected}
    />
  )

  const tagPicker = (
    <FormTokenField
      __experimentalAutoSelectFirstMatch
      __experimentalExpandOnFocus
      label="Type a tag"
      onChange={(tokens) => setTagsSelected(tokens)}
      suggestions={tags}
      value={tagsSelected}
    />
  )

  const vibePicker = (
    <FormTokenField
      __experimentalAutoSelectFirstMatch
      __experimentalExpandOnFocus
      label="Type a vibe"
      onChange={(tokens) => setVibesSelected(tokens)}
      suggestions={vibes_slugs}
      value={vibesSelected}
    />
  )

  return (
    <>
      <h2>Options</h2>
      <label>Zoom</label>
      {zoomInput}
      <label>Radius</label>
      {radiusInput}
      <label>Height</label>
      {heightInput}
      <br />
      <h2>Filters</h2>
      {activityPicker}
      {cityPicker}
      {vibePicker}
      {tagPicker}
    </>
  )
}

export default Filters