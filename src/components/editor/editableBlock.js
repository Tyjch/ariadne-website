import React from "react";
import { motion, useDragControls } from "framer-motion";
import { FcMenu } from "react-icons/fc";
import { TextBlock } from "./blocks/textBlock";
import { ImageBlock } from "./blocks/imageBlock";
import styles from "../../styles/editableBlock.module.css";


function EditableBlock(props) {

	// PROPS
	const { id, type, data, container, ...callbacks } = props;

	// CONSTANTS
	const dragControls = useDragControls();
	const variants     = {
		block  : {
			default : {
				backgroundColor : '#fff',
				zIndex          : -1
			},
			hovered : {

			},
			dragged : {
				backgroundColor : '#fff',
				boxShadow       : '0px 1px 5px rgba(50, 50, 50, 0.2)',
				zIndex          : 1
			}
		},
		handle : {
			default : {
				opacity : 0
			},
			hovered : {
				opacity : 1,
				zIndex  : 1,
			},
			dragged : {
				opacity         : 1,
				zIndex          : 5
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
			// CSS Props
			className       = {styles.EditableBlock}
			key             = {id}
			// Framer Motion
			variants        = {variants.block}
			initial         = {{ opacity : 0 }}
			animate         = {{ opacity : 1 }}
			// Layout Animation
			layout          = {true}
			layoutId        = {id}
			// Event Animation
			whileHover      = {"hovered"}
			whileDrag       = {"dragged"}
			// Animate Presence
			exit            = {{ opacity : 0 }}
			exitBeforeEnter = {false}
			// Dragging
			drag            = {"y"}
			dragControls    = {dragControls}
			dragListener    = {false}
			dragConstraints = {{ top: 0, right: 0, bottom: 0, left: 0 }}
			dragMomentum    = {true}
			dragElastic     = {1}
		>
			{dragHandle}
			{blockContent}
		</motion.div>
	);
}

export { EditableBlock };