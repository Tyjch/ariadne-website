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
		// Create a copy of blocks state to mutate (since we shouldn't modify state directly)
		const updatedBlocks = [...blocks];
		// Find the index of `updatedBlock` in `updatedBlocks`
		const index = updatedBlocks.map(block => block.id).indexOf(updatedBlock.id);
		// Overwrite properties of block at index in `updatedBlocks` with `updatedBlock`
		updatedBlocks[index] = updatedBlock;
		// Set state of blocks to `updatedBlocks`
		setBlocks(updatedBlocks);
	}
	function insertBlock(currentBlock) {
		// Create the block to be inserted after `currentBlock`
		const newBlock = {
			id   : uuid(),
			type : 'text',
			data : {
				content : ''
			}
		};
		// Create a copy of blocks state to mutate (since we shouldn't modify state directly)
		const updatedBlocks = [...blocks];
		// Find the index of `currentBlock` in `updatedBlocks`
		const index = updatedBlocks.map(block => block.id).indexOf(currentBlock.id);
		// Splice `newBlock` into `updatedBlocks` right after `currentBlock`
		updatedBlocks.splice(index + 1, 0, newBlock);
		// Set state of blocks to `updatedBlocks` and then focus the element corresponding to `newBlock`
		setBlocks(updatedBlocks);
		// TODO: Set focus to block just inserted
		setFocusedId(updatedBlocks[index + 1].id)
	}
	function removeBlock(currentBlock) {
		const updatedBlocks = [...blocks];
		let index = updatedBlocks.map(block => block.id).indexOf(currentBlock.id);
		// TODO: Allow deletion of first block if there is another block after it
		if (index && index > 0) {
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