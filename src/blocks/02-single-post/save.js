/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

import Post from './post';


const Save = (props) => {
	const blockProps = useBlockProps.save({
		className: `gutenberg-examples-align-${props.attributes.alignment}`,
	})

	const { attributes } = props;
	const { title, link, content } = attributes;

	const hasPost = title != null && link != null;

	console.log('Block saved ', attributes);

	const postCard = hasPost
		? <Post {...props} />
		: null

	return (
		<>
			<div {...blockProps}>
				{postCard}
			</div>
		</>
	)
};

export default Save;
