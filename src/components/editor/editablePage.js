import React, { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { EditableBlock } from "./editableBlock";
import styles from "../../styles/editablePage.module.css";


const initialBlocks = [
	{
		id   : uuid(),
		type : "text",
		data : {
			content : "First block"
		}
	},
	{
		id   : uuid(),
		type : "text",
		data : {
			content : "Second block"
		}
	},
	{
		id   : uuid(),
		type : "text",
		data : {
			content : "Third block"
		}
	}
];

function EditablePage() {
	const [blocks, setBlocks] = useState(initialBlocks);
	const ref = useRef();

	function updatePage(updatedBlock) {
		console.info('updatePage()');
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
		console.info('insertBlock()');
		// Create the block to be inserted after `currentBlock`
		const newBlock = {
			id   : uuid(),
			type : 'text',
			data : {
				content : 'Default block'
			}
		};
		// Create a copy of blocks state to mutate (since we shouldn't modify state directly)
		const updatedBlocks = [...blocks];
		// Find the index of `currentBlock` in `updatedBlocks`
		const index = updatedBlocks.map(block => block.id).indexOf(currentBlock.id);
		// Splice `newBlock` into `updatedBlocks` right after `currentBlock`
		updatedBlocks.splice(index + 1, 0, newBlock);
		// Set state of blocks to `updatedBlocks` and then focus the element corresponding to `newBlock`
		setBlocks(updatedBlocks, () => {
			currentBlock.ref.nextElementSibling.focus();
		})
	}
	function removeBlock(currentBlock) {
		console.info('removeBlock()');
		// Attempt to get the block before `currentBlock`
		const previousBlock = currentBlock.ref.previousElementSibling;
		// If we find a previousBlock, that means it's okay to remove `currentBlock`
		if (previousBlock) {
			// Create a copy of blocks state to mutate (since we shouldn't modify state directly)
			const updatedBlocks = [...blocks];
			// Find the index of `currentBlock` in `updatedBlocks`
			const index = updatedBlocks.map(block => block.id).indexOf(currentBlock.id);
			// Splice out block at `index` in `updatedBlocks`
			updatedBlocks.splice(index, 1);
			// Set state of blocks to `updatedBlocks` and then focus `previousBlock`
			setBlocks(updatedBlocks, () => {
				previousBlock.focus();
			})
		}
	}

	return (
		<div className={styles.EditablePage}>
			<h1 className={styles.Title}>
				Editable Page
			</h1>
			<div className={styles.Content} ref={ref}>
				{
					blocks.map((block, key) => (
						<EditableBlock
							{...block}                           // Spreads `block` properties as props
							container   = {ref}                  // Used to constraint dragging to parent div
							updatePage  = {() => updatePage}     // Called when content of a block is changed
							insertBlock = {() => insertBlock}    // Called when a new block should be inserted
							removeBlock = {() => removeBlock}    // Called when a block should be removed
							key         = {key}                  // Required for mapping to elements in React
						/>
					))
				}
			</div>
		</div>
	);
}

export { EditablePage };