// WP React component for saving the block
import { useBlockProps } from '@wordpress/block-editor';

const Post = (props) => {
    const blockProps = useBlockProps.save({
        className: `gutenberg-examples-align-${props.attributes.alignment}`,
    })

    const { attributes } = props;
    const { title, link, content } = attributes;

    console.log('Post component ', attributes, props);

    return (
        <div className="post">
            <a href={link}>
                <h2>{title}</h2>
            </a>
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </div>
    );
};

export default Post;
