/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
const { InspectorControls } = wp.blockEditor;

/**
 * Internal dependencies
 */
import json from './block.json';

import './editor.scss';
import './style.css';

// Edit and Save are included in the same file here

const MapEmbed = ({
	height = 600,
	slug = `peoria-riverfront-museum`,
	domain = `https://vibemap.com`,
	options = `embedded=1&placeLayout=map`,
	path = `places/details`,
	...props 
}) => {

	const src = `${domain}/${path}/${slug}?${options}`	

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
	const blockProps = useBlockProps()
	const { attributes, setAttributes } = props;
	console.log('DEBUG attributes and props ', attributes, blockProps);

	const slugInput = <TextControl
		label={'Place ID'}
		value={attributes?.slug}
		onChange={(val) => setAttributes({ message: val })}
	/>
	
	return (
		<>
			<InspectorControls key='inspector'>
				{slugInput}
			</InspectorControls>
			<div {...blockProps} style={{ padding: '20px', transform: 'scale(0.9)'}}>
				
				{slugInput}
				<MapEmbed {...props} />
			</div>
		</>
	);
};


const Save = (props) => {
	//const blockProps = useBlockProps.save({ style: blockStyle });
	const { attributes } = props;

	return (
		<>
			<MapEmbed {...props} />
		</>
	);
}

// Destructure the json file to get the name and settings for the block
const { name, example } = json
const attributes = {
	"alignment": {
		"type": "string",
		"default": "none"
	},
	"class": {
		"type": "string",
		"default": example?.attributes?.class
	},
	"slug": {
		"type": "string",
		"default": example?.attributes?.slug
	},
	"content": {
		"type": "string",
		"source": "html",
		"selector": "p"
	}
}

// Register the block
registerBlockType(name, {
	attributes: attributes,
	edit: Edit,
	save: Save,
});
