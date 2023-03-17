/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import json from './block.json';
//import Edit from './edit';
//import save from './save';

import './editor.scss';
import './style.css';


const Embed = ({
	height = 500,
	src = `https://vibemap.com/map?embedded=1`,
	...props }) => {

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

	return (
		<>
			<p>Select list and map options in the block panel on the right.</p>
			<Embed {...props} />
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
