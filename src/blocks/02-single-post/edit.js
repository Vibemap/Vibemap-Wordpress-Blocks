const { InspectorControls } = wp.blockEditor;
const { SelectControl, SearchControl } = wp.components;
const { Component } = wp.element;

import Post from './post';


class SelectPost extends Component {
	// Method for setting the initial state.
	static getInitialState(selectedPost) {
		return {
			posts: [],
			search: '',
			selectedPost: selectedPost,
			post: {},
		};
	}

	// Constructing our component. With super() we are setting everything to 'this'.
	// Now we can access the attributes with this.props.attributes
	constructor() {
		super(...arguments);
		// Maybe we have a previously selected post. Try to load it.
		const selectedPost = this?.props?.attributes?.selectedPost;
		this.state = this.constructor.getInitialState(selectedPost);

		// Bind so we can use 'this' inside the method.
		this.getOptions = this.getOptions.bind(this);
		// Load posts.
		this.getOptions();
		this.onChangeSelectPost = this.onChangeSelectPost.bind(this);
	}

	/**
	 * Loading Posts
	 */
	getOptions() {
		const posts = new wp.api.collections.Posts()
		// TODO: add search and fitler
		return (posts).fetch().then((posts) => {
			if (posts && 0 !== this.state.selectedPost) {
				// If we have a selected Post, find that post and add it.
				const post = posts.find((item) => { return item.id == this.state.selectedPost });
				// This is the same as { post: post, posts: posts }
				this.setState({ post, posts });
			} else {
				this.setState({ posts });
			}
		});
	}

	onChangeSelectPost(value) {
		// Find the post
		const post = this.state.posts.find((item) => { return item.id == parseInt(value) });
		// Set the state
		this.setState({ selectedPost: parseInt(value), post });
		// Set the attributes
		this.props.setAttributes({
			selectedPost: parseInt(value),
			title: post.title.rendered,
			link: post.link,
			content: post.excerpt.rendered,
		});
	}

	onChangeSearch(value) {
		console.log('Search: ' + value);
	}

	render() {

		const { state: { posts } = {} } = this;
		const { props: {
			focus,
			attributes: {
				isSelected,
				selectedPost
			}
		} = {} } = this;

		let options = [{ value: 0, label: 'Select a Post' }];

		// Make posts list for select control
		if (posts.length > 0) {
			posts.forEach((post) => {
				options.push({ value: post.id, label: post.title.rendered });
			})
		}

		const hasPost = this.state.post.hasOwnProperty('title')

		const postCard = hasPost
			? <Post {...this.props} />
			: null

		return (
			<>
				<InspectorControls key='inspector'>
					<SearchControl value={this.state.search} onChange={this.onChangeSearch} />
					<SelectControl
						label={'Select a Post'}
						options={options}
						onChange={this.onChangeSelectPost}
						value={selectedPost} />
				</InspectorControls>
				<div>
					{posts.length > 0
						? <p>Select a post from the block panel on the right.</p>
						: <p>No posts found. Please create some first.</p>
					}
					{postCard}
				</div>
			</>
		)
	}
}

/**
 * WordPress dependencies
 */
import {
	RichText,
	AlignmentToolbar,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';

const Edit = (props) => {
	const blockProps = useBlockProps();

	const { attributes, className, } = props;
	const { alignment } = attributes;

	const onChangeAlignment = (newAlignment) => {
		props.setAttributes({
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		});
	};

	return (
		<div {...blockProps}>
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={onChangeAlignment}
				/>
			</BlockControls>

			<SelectPost {...props} />

		</div>
	);
};

export default Edit;
