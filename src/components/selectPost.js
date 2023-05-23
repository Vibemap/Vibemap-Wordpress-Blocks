const { SelectControl } = wp.components;
const { InspectorControls } = wp.blocks;

class SelectPost extends Component {
    render() {
        let options = [{ value: 0, label: __('Select a Post') }];
        let output = __('Loading Posts');
        this.props.className += ' loading';
        if (this.state.posts.length > 0) {
            // ...
        } else {
            output = __('No posts found. Please create some first.');
        }
        // Checking if we have anything in the object
        console.log('DEBUG: this.state.post', this.state.post);
        if (this.state.post.hasOwnProperty('title')) {
            output = <div className="post">
                <a href={this.state.post.link}><h2 dangerouslySetInnerHTML={{ __html: this.state.post.title.rendered }}></h2></a>
                <p dangerouslySetInnerHTML={{ __html: this.state.post.excerpt.rendered }}></p>
            </div>;
            this.props.className += ' has-post';
        } else {
            this.props.className += ' no-post';
        }
        return [
            !!this.props.isSelected && (
                <InspectorControls key='inspector'>
                    <SelectControl onChange={this.onChangeSelectPost} value={this.props.attributes.selectedPost} label={__('Select a Post')} options={options} />
                </InspectorControls>
            ),
            <div className={this.props.className}>{output}</div>
        ]
    }
}

export default SelectPost;