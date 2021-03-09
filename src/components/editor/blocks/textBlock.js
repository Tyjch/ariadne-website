import React, { useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useRefCallback } from "../../../hooks/useRefCallback.ts";
import styles from "../../../styles/textBlock.module.css";

function TextBlock(props) {

	const ref = useRef();

	const [content, setContent] = useState(props.content);
	const [prevKey, setPrevKey] = useState('');

	const handleChange = useRefCallback(event => {
		setContent(event.target.value);
	}, [props, content]);
	const onKeyDown    = useRefCallback(event => {
		switch (event.key) {
			case '/'         : {
				break;
			}
			case 'Enter'     : {
				if (prevKey !== "Shift") {
					event.preventDefault();
					props.insertBlock({
						id  : props.id,
						ref : ref
					});
				}
				break;
			}
			case 'Backspace' : {
				console.log('content:', content);
				if (!content) {
					event.preventDefault();
					props.removeBlock({
						id  : props.id,
						ref : ref
					});
				}
				break;
			}
			default          : {
				// do nothing
			}
		}
		setPrevKey(event.key);
	}, [props, content]);

	useEffect(() => {
		props.updatePage({
			id   : props.id,
			type : 'text',
			data : {
				content : content
			}
		});
	}, [content]);

	return (
		<ContentEditable
			className = {styles.TextBlock}
			id        = {props.id}
			ref       = {ref}
			html      = {content}
			onChange  = {handleChange}
			onKeyDown = {onKeyDown}
		/>
	);

}

export { TextBlock };