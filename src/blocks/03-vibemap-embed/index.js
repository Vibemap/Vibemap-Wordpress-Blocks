/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { FormTokenField } from '@wordpress/components';
const { InspectorControls } = wp.blockEditor;

import allActivities from 'vibemap-constants/dist/activityCategories.json'
import cities from 'vibemap-constants/dist/cities.json'
import { getVibes, getCategoriesByLevel } from 'vibemap-constants/dist/vibes.js'

const categories1 = getCategoriesByLevel(1)
const categories2 = getCategoriesByLevel(2)
const categories = categories1.concat(categories2)
const category_slugs = allActivities.activityCategories.map(cat => cat.slug)
const vibes_slugs = getVibes()
console.log('DEBUG cities, categories', cities, categories, category_slugs);

/**
 * Internal dependencies
 */
import { useState } from '@wordpress/element';
import json from './block.json';
//import Edit from './edit';
//import save from './save';

import './editor.scss';
import './style.css';


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

	const iframe = `<iframe
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
	
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedVibes, setSelectedVibes] = useState([]);
	console.log('DEBUG selectedVibes', selectedVibes);

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
			<InspectorControls key='inspector'>
				{activityPicker}
				{vibePicker}
			</InspectorControls>

			<div style={{ padding: '20px', transform: 'scale(0.8)'}}>
				{activityPicker}
				{vibePicker}
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
