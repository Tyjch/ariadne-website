import React, { useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { useRefCallback } from "../../../hooks/useRefCallback.ts";
import { getCaretCoordinates } from "../../../utilities/editor";
import styles from "../../../styles/textBlock.module.css";
import {BlockSelectionMenu} from "../blockSelectionMenu";


function TextBlock(props) {

	// REFS
	const ref = useRef();

	// STATE
	const [content, setContent]     = useState(props.content);
	const [prevKey, setPrevKey]     = useState('');
	const [menuState, setMenuState] = useState({
		isOpen   : false,
		position : {
			x : null,
			y : null
		}
	});

	// CALLBACKS
	const handleChange = useRefCallback(event => {
		setContent(event.target.value);
	}, [props, content]);
	const onKeyDown    = useRefCallback(event => {
		switch (event.key) {
			case '/': {
				break;
			}
			case 'Enter': {
				if (prevKey !== "Shift") {
					event.preventDefault();
					props.insertBlock({
						id  : props.id,
						ref : ref
					});
				}
				break;
			}
			case 'Backspace': {
				if (!content) {
					event.preventDefault();
					props.removeBlock({
						id  : props.id,
						ref : ref
					});
				}
				break;
			}
			default: {
				// do nothing
			}
		}
		setPrevKey(event.key);
	}, [props, content]);
	const onKeyUp      = useRefCallback(event => {
		if (event.key === '/') {
			openMenu();
		}
	}, []);

	// METHODS
	function openMenu(arg) {
		console.info('openMenu()');
		const { x, y } = getCaretCoordinates();
		setMenuState({
			isOpen   : true,
			position : { x, y }
		});
		document.addEventListener('click', closeMenu);
	}
	function closeMenu(arg) {
		console.info('closeMenu()');
		setMenuState({
			isOpen   : false,
			position : { x: null, y: null }
		});
		document.removeEventListener('click', closeMenu);
	}
	function onBlockSelect(arg) {
		console.info('onBlockSelect()');
	}

	// EFFECTS
	useEffect(() => {
		props.updatePage({
			id   : props.id,
			type : 'text',
			data : {
				content : content
			}
		});
	}, [content]);

	// RENDER
	return (<>
		{menuState.isOpen && (
			<BlockSelectionMenu
				onSelect  = {onBlockSelect}
				onClose   = {closeMenu}
			/>
		)}
		<ContentEditable
			className = {styles.TextBlock}
			id        = {props.id}
			ref       = {ref}
			html      = {content}
			onChange  = {handleChange}
			onKeyDown = {onKeyDown}
			onKeyUp   = {onKeyUp}
		/>
	</>);

}

export { TextBlock };