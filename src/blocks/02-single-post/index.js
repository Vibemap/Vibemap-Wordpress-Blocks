/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import json from './block.json';
import Edit from './edit';
import Save from './save';

import './editor.scss';
import './style.css';

// Destructure the json file to get the name and settings for the block
// For more information on how this works, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { name } = json;

// Register the block
// Example from here: https://www.ibenic.com/create-gutenberg-block-displaying-post/
registerBlockType(name, {

	attributes: {
		title: {
			type: 'string',
			selector: 'h2'
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
		content: {
			type: 'string',
			selector: 'p'
		},
		// TODO: How to handle relative links
		// on different environments?
		link: {
			type: 'string',
			selector: 'a'
		},
	},

	edit: Edit,
	Save, // Object shorthand property - same as writing: save: save,
});
