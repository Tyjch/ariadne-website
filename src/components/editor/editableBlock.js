import React from "react";
import { motion, useDragControls } from "framer-motion";
import { FcMenu } from "react-icons/fc";
import { TextBlock } from "./blocks/textBlock";
import { ImageBlock } from "./blocks/imageBlock";
import styles from "../../styles/editableBlock.module.css";


function EditableBlock(props) {

	// PROPS
	const {id, type, data, container, ...callbacks} = props;

	// CONSTANTS
	const dragControls = useDragControls();
	const variants     = {
		block: {
			default: {},
			hovered: {}
		},
		handle: {
			default: {
				opacity: 0
			},
			hovered: {
				opacity: 1
			}
		}
	};

	// METHODS
	function startDrag(event) {
		dragControls.start(event, { snapToCursor: true });
	}
	function wrapChild() {
		switch (props.type) {
			case "image" : {
				return (
					<ImageBlock
						id = {id}
						{...data}
						{...callbacks}
					/>
				);
			}
			case "text"  : {
				return (
					<TextBlock
						id = {id}
						{...data}
						{...callbacks}
					/>
				);
			}
			default      : {
				return <p>Defaulted Block</p>;
			}
		}
	}

	// ELEMENTS
	const dragHandle   = (<>
		<motion.div
			className     = {styles.DragHandle}
			variants      = {variants.handle}
			initial       = {"default"}
			onPointerDown = {startDrag}
		>
			<FcMenu />
		</motion.div>
	</>);
	const blockContent = (<>
		<motion.div> { wrapChild() } </motion.div>
	</>);

	// RENDERER
	return (
		<motion.div
			className       = {styles.EditableBlock}
			variants        = {variants.block}
			whileHover      = {"hovered"}
			drag            = {"y"}
			dragControls    = {dragControls}
			dragListener    = {false}
			dragConstraints = {{ top: 0, right: 0, bottom: 0, left: 0 }}
		>
			{dragHandle}
			{blockContent}
		</motion.div>
	);
}

export { EditableBlock };