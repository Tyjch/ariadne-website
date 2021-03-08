import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { useRefCallback } from "../../../hooks/useRefCallback.ts";

// class TextBlock extends React.Component {
//
// 	// CONSTRUCTOR
// 	constructor(props) {
// 		super(props);
// 		this.onChange = this.onChange.bind(this);
// 		this.ref      = React.createRef();
// 		this.state    = {
// 			content : ''
// 		};
// 	}
//
// 	// LIFECYCLE METHODS
// 	componentDidMount() {
// 		this.setState({ content : this.props.content });
// 	}
// 	componentDidUpdate(prevProps, prevState) {
// 		if (prevState.content !== this.state.content) {
// 			this.props.updatePage({
// 				id   : this.props.id,
// 				type : this.props.type,
// 				data : {
// 					content : this.state.content
// 				}
// 			})
// 		}
// 	}
//
// 	// EVENT HANDLERS
// 	onChange(e) {
// 		this.setState({ content : e.target.value });
// 	}
//
// 	// RENDERER
// 	render() {
// 		console.log('TextBlock:', this.props);
// 		return (
// 			<ContentEditable
// 				innerRef = {this.ref}
// 				html     = {this.props.content}
// 				tagName  = {'div'}
// 				onChange = {this.onChange}
// 			/>
// 		)
// 	}
// }

function TextBlock(props) {
	const [content, setContent] = useState(props.content);

	const handleChange = useRefCallback((event) => {
		setContent(event.target.value);
	}, []);
	const handleBlur   = useRefCallback(() => {
		console.log(content);
	}, [content]);

	return (
		<ContentEditable
			html     = {content}
			onBlur   = {handleBlur}
			onChange = {handleChange}
		/>
	);

}

export { TextBlock };