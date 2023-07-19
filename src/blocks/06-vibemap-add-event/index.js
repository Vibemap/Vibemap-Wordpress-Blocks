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

const previewHeight = 420;
const outputHeight = 1600;

// Editable UI and block attributes
const Edit = (props) => {
	const blockProps = useBlockProps()
	const { attributes } = props;
	const { cities, categories, vibes } = attributes;

	// Filters state, set by block attributes
	const filterState = useFilterState({ cities });
	const {
		selectedCities,
	} = filterState;
	console.log('DEBUG: filterState in embed ', filterState, selectedCities);

	// Sync block attributes with filter state
	const cityDep = JSON.stringify(selectedCities);
	useEffect(() => {
		props.setAttributes({ cities: selectedCities });
	}, [cityDep]);


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
				<p>Users will see the Add Event form below.</p>
				<Embed {...props}
					path='add-event'
					height={previewHeight}
					cities={selectedCities}
				/>
			</div>
		</>
	);
};

// Preview in Gutenberg editor
const Save = (props) => {
	//const blockProps = useBlockProps.save({ style: blockStyle });
	const { attributes } = props;
	const { cities } = attributes;

	return (
		<Embed {...props}
			path='add-event'
			height={outputHeight}
			cities={cities}
		/>
	)
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
		"cities": {
			"type": "array",
			"default": example?.attributes?.cities
		}
	},
	edit: Edit,
	save: Save, // Object shorthand property - same as writing: save: save,
});
