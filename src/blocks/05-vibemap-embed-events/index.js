// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

const { InspectorControls } = wp.blockEditor;

// Internal dependencies
import json from './block.json';

// Components
import Embed from '../../components/Embed';
import Filters from '../../components/Filters'
// Hook for Filters state
import useFilterState from '../../components/Filters/useFilterState.js';

import './editor.scss';
import './style.css';

// Editable UI and block attributes
const Edit = (props) => {
	const blockProps = useBlockProps()
	const { attributes } = props;

	const { cities, categories, vibes } = attributes;

	// Filters state, set by block attributes
	const filterState = useFilterState({ cities, categories, vibes});
	const {
		selectedCities,
		selectedCategories,
		selectedVibes,		
	} = filterState;
	console.log('DEBUG: filterState in embed ', filterState, selectedCities);

	// Sync block attributes with filter state
	const cityDep = JSON.stringify(selectedCities);
	useEffect(() => {
		props.setAttributes({ cities: selectedCities });
	}, [cityDep]);

	const catDep = JSON.stringify(selectedCategories);
	useEffect(() => {
		props.setAttributes({ categories: selectedCategories });
	}, [catDep]);

	const vibeDep = JSON.stringify(selectedVibes);
	useEffect(() => {
		props.setAttributes({ vibes: selectedVibes });
	}, [vibeDep]);

	// TODO: add date range filter

	const blockStyle = { 
		padding: '20px', 
		transform: 'scale(0.8)' 
	}

	return (
		<>
			<InspectorControls key='inspector'>
				<Filters {...filterState} />				
			</InspectorControls>

			<div {...blockProps} style={blockStyle}>
				<Filters {...filterState} />
				<p>Select the list and map options in the block panel on the right.</p>
				<Embed {...props}
					path='events'
					cities={selectedCities}
					categories={selectedCategories}
					vibes={selectedVibes}					 
					/>
			</div>
		</>
	);
};

// Preview in Gutenberg editor
const Save = (props) => {
	//const blockProps = useBlockProps.save({ style: blockStyle });
	const { attributes } = props;
	const {
		cities,
		categories, 
		vibes 
	} = attributes;
	console.log('DEBUG: got attributes ', attributes, ' in save');

	return <Embed {...props} 
		cities={cities}
		categories={categories}
		vibes={vibes} 
		/>	
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
		"categories": {
			"type": "array",
			"default": example?.attributes?.categories
		},
		"cities": {
			"type": "array",
			"default": example?.attributes?.cities
		},
		"vibes": {
			"type": "array",
			"default": example?.attributes?.vibes
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
