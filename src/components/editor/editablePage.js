import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { v4 as uuid } from "uuid";
import { EditableBlock } from "./editableBlock";
import { setCaretToEnd } from "../../utilities/editor";
import styles from "../../styles/editablePage.module.css";


const initialBlocks = [
	{
		id   : uuid(),
		type : "text",
		data : {
			content : "1st"
		}
	},
	{
		id   : uuid(),
		type : "text",
		data : {
			content : "2nd"
		}
	},
	{
		id   : uuid(),
		type : "text",
		data : {
			content : "3rd"
		}
	},
	{
		id   : uuid(),
		type : "text",
		data : {
			content : "4th"
		}
	},
	{
		id   : uuid(),
		type : "text",
		data : {
			content : "5th"
		}
	}
];

function EditablePage() {

	const ref = useRef();
	const [blocks, setBlocks]       = useState(initialBlocks);
	const [focusedId, setFocusedId] = useState(initialBlocks[0].id);

	function updatePage(updatedBlock) {
		const updatedBlocks = [...blocks];
		const index = updatedBlocks.map(block => block.id).indexOf(updatedBlock.id);

		updatedBlocks[index] = updatedBlock;
		setBlocks(updatedBlocks);
	}
	function insertBlock(currentBlock) {
		const newBlock = {
			id   : uuid(),
			type : 'text',
			data : {
				content : ''
			}
		};
		const updatedBlocks = [...blocks];
		const index = updatedBlocks.map(block => block.id).indexOf(currentBlock.id);

		updatedBlocks.splice(index + 1, 0, newBlock);
		setBlocks(updatedBlocks);
		setFocusedId(updatedBlocks[index + 1].id)
	}
	function removeBlock(currentBlock) {
		const updatedBlocks = [...blocks];
		let index = updatedBlocks.map(block => block.id).indexOf(currentBlock.id);
		if (index && index > 0) {
			// TODO: Allow deletion of first block if there is another block after it
			updatedBlocks.splice(index, 1);
			setBlocks(updatedBlocks);
			setFocusedId(updatedBlocks[index - 1].id);
		}
	}

	useEffect(() => {
		const focusedElement = document.getElementById(focusedId);
		try {
			focusedElement.focus();
			setCaretToEnd(focusedElement);
		} catch (e) {
			console.warn(e);
		}
	}, [focusedId])

	return (
		<div className={styles.EditablePage}>
			<h1 className={styles.Title}>
				Editable Page
			</h1>
			<div className={styles.Content} ref={ref}>
				<AnimateSharedLayout>
					<AnimatePresence>
					{
						blocks.map((block, key) => (
							<EditableBlock
								{...block}                     // Spreads `block` properties as props
								container   = {ref}            // Used to constraint dragging to parent div
								updatePage  = {updatePage}     // Called when content of a block is changed
								insertBlock = {insertBlock}    // Called when a new block should be inserted
								removeBlock = {removeBlock}    // Called when a block should be removed
								key         = {block.id}            // Required for mapping to elements in React
							/>
						))
					}
					</AnimatePresence>
				</AnimateSharedLayout>
			</div>
		</div>
	);

}

export { EditablePage };