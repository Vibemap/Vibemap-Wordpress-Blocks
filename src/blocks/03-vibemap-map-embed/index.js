// WordPress dependencies
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

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
	const { cities, categories, height, tags, vibes } = attributes;

	// TODO: get all tags
	// List taxonomies: core.getTaxonomies()
	// Get site info: core.getSite()
	// core.getPlugin('vibemap')
	const tag_options = useSelect((select) => {
		const core = select('core')
		const tags_data = core.getEntityRecords('taxonomy', 'post_tag', { per_page: -1, page: 1 })
		const tag_options = tags_data
			? tags_data.map((tag) => {
				return tag.name
			})
			: []
		return tag_options
	});

	// Filters state, set by block attributes
	const filterState = useFilterState({
		cities,
		categories,
		tags,
		tagsAll: tag_options,
		vibes
	});

	const {
		citiesSelected,
		categoriesSelected,
		tagsSelected,
		vibesSelected,
		radius,
		zoom,
	} = filterState;
	console.log('DEBUG: filterState in embed ', filterState, citiesSelected);

	// Sync block attributes with filter state
	const cityDep = JSON.stringify(citiesSelected);
	useEffect(() => {
		props.setAttributes({ cities: citiesSelected });
	}, [cityDep]);

	const catDep = JSON.stringify(categoriesSelected);
	useEffect(() => {
		props.setAttributes({ categories: categoriesSelected });
	}, [catDep]);

	const tagDep = JSON.stringify(tagsSelected);
	useEffect(() => {
		props.setAttributes({ tags: tagsSelected });
	}, [tagDep]);

	const vibeDep = JSON.stringify(vibesSelected);
	useEffect(() => {
		props.setAttributes({ vibes: vibesSelected });
	}, [vibeDep]);

	const blockStyle = {
		padding: '20px',
		transform: 'scale(0.8)'
	}

	const firstCity = citiesSelected[0]

	return (
		<>
			<InspectorControls key='inspector'>
				<Filters {...filterState} />
			</InspectorControls>

			<div {...blockProps} style={blockStyle}>
				<Filters {...filterState} />
				<p>Select the list and map options in the block panel on the right.</p>
				<Embed {...props}
					city={firstCity}
					cities={citiesSelected}
					categories={categoriesSelected}
					height={height}
					tags={tagsSelected}
					vibes={vibesSelected}
					radius={radius}
					zoom={zoom}
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
		tags,
		vibes,
		height,
		radius,
		zoom
	} = attributes;

	const firstCity = cities[0]
	console.log('TEST DEBUG: got attributes ', attributes, firstCity);

	return (
		<Embed {...props}
			city={firstCity}
			cities={cities}
			categories={categories}
			tags={tags}
			vibes={vibes}
			height={height}
			radius={radius}
			zoom={zoom}
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
		"categories": {
			"type": "array",
			"default": example?.attributes?.categories
		},
		"cities": {
			"type": "array",
			"default": example?.attributes?.cities
		},
		"height": {
			"type": "number",
			"default": 800
		},
		"radius": {
			"type": "number",
			"default": 60
		},
		"zoom": {
			"type": "number",
			"default": 14
		},
		"tags": {
			"type": "array",
			"default": example?.attributes?.tags
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
