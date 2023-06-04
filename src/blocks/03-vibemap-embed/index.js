/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

const { InspectorControls } = wp.blockEditor;

/**
 * Internal dependencies
 */
import json from './block.json';
//import Edit from './edit';
//import save from './save';

// UI Components and Hook for Filters
import Filters from '../../components/Filters/filters.js'
import useFilterState from '../../components/Filters/useFilterState.js';

import './editor.scss';
import './style.css';

// TODO: Make this a component
const Embed = ({
	height = 500,
	domain = `https://vibemap.com`,
	path = `map`,
	// Emeded map options
	city = `peoria`,
	categories = [],
	vibes = [],
	...props
}) => {
	
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
		<div className="vibemap-embed"
			style={{ 'height': height }}
			dangerouslySetInnerHTML={{
				__html: iframe ? iframe : ""
			}}
		/>
	)
}

const Edit = (props) => {
	//const blockProps = useBlockProps({ style: blockStyle })
	const { attributes } = props;

	const filterState = useFilterState();
	const {
		categories,
		category_slugs,
		city_slugs,
		vibes_slugs,
		selectedCities,
		selectedCategories,
		selectedVibes,
		setSelectedCities,
		setSelectedCategories,
		setSelectedVibes
	} = filterState;
	console.log('DEBUG: filterState in embed ', filterState, selectedCities);

	return (
		<>
			<InspectorControls key='inspector'>
				<Filters {...filterState} />				
			</InspectorControls>

			<div style={{ padding: '20px', transform: 'scale(0.8)'}}>
				<Filters {...filterState} />
				<p>Select the list and map options in the block panel on the right.</p>
				<Embed
					vibes={selectedVibes}
					{...props} 
					/>
			</div>
		</>
	);
};


const Save = (props) => {
	//const blockProps = useBlockProps.save({ style: blockStyle });
	const { attributes } = props;

	return (
		<>
			<Embed {...props} />
		</>
	);
}

// Destructure the json file to get the name and settings for the block
const { name, example } = json

// Register the block
registerBlockType(name, {
	attributes: {
		"alignment": {
			"type": "string",
			"default": "none"
		},
		"class": {
			"type": "string",
			"default": example?.attributes?.class
		},
		"content": {
			"type": "string",
			"source": "html",
			"selector": "p"
		}
	},
	edit: Edit,
	save: Save, // Object shorthand property - same as writing: save: save,
});
