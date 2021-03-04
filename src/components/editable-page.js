import React from "react";
import { v4 as uuidv4 } from "uuid";
import EditableBlock from "./editable-block";
import { setCaretToEnd } from "../utilities/editor";
import styles from "../styles/editable-page.module.css";


const initial_block = {
	id   : uuidv4(),
	html : "",
	tag  : "p"
};

class EditablePage extends React.Component {
	// Constructor
	constructor(props) {
		super(props);
		this.updatePageHandler  = this.updatePageHandler.bind(this);
		this.addBlockHandler    = this.addBlockHandler.bind(this);
		this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
		this.state = { blocks: [initial_block] };
	}

	// Handlers
	updatePageHandler(updatedBlock) {
		const blocks        = this.state.blocks;
		const index         = blocks.map((b) => b.id).indexOf(updatedBlock.id);
		const updatedBlocks = [...blocks];

		updatedBlocks[index] = {
			...updatedBlocks[index],
			tag  : updatedBlock.tag,
			html : updatedBlock.html
		};
		this.setState({ blocks: updatedBlocks });
	};
	addBlockHandler(currentBlock) {
		const newBlock      = { id: uuidv4(), html: "", tag: "p" };
		const blocks        = this.state.blocks;
		const index         = blocks.map((b) => b.id).indexOf(currentBlock.id);
		const updatedBlocks = [...blocks];
		updatedBlocks.splice(index + 1, 0, newBlock);
		this.setState({ blocks: updatedBlocks }, () => {
			currentBlock.ref.nextElementSibling.focus();
		});
	};
	deleteBlockHandler(currentBlock) {
		const previousBlock = currentBlock.ref.previousElementSibling;
		if (previousBlock) {
			const blocks        = this.state.blocks;
			const index         = blocks.map((b) => b.id).indexOf(currentBlock.id);
			const updatedBlocks = [...blocks];

			updatedBlocks.splice(index, 1);
			this.setState({ blocks: updatedBlocks }, () => {
				setCaretToEnd(previousBlock);
				previousBlock.focus();
			})
		}
	}

	// Renderer
	render() {
		return (
			<div className={styles.Page}>
				{
					this.state.blocks.map((block, key) => (
							<EditableBlock
								key         = {key}
								id          = {block.id}
								tag         = {block.tag}
								html        = {block.html}
								updatePage  = {this.updatePageHandler}
								addBlock    = {this.addBlockHandler}
								deleteBlock = {this.deleteBlockHandler}
							/>
						)
					)
				}
			</div>
		)
	}
}


export default EditablePage;