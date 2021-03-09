import React, { useEffect, useState, useCallback } from "react";
import { FaParagraph } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { HiCode } from "react-icons/hi";
import { matchSorter } from "match-sorter";
import styles from "../../styles/blockSelectionMenu.module.css";


const allowedBlocks = [
	{
		id          : 'text',
		label       : 'Text',
		icon        : <FaParagraph />,
		initialData : {
			content : 'Paragraph'
		}
	},
	{
		id          : 'image',
		label       : 'Image',
		icon        : <AiFillPicture />,
		initialData : {
			content : 'Image'
		}
	},
	{
		id          : 'code',
		label       : 'Code',
		icon        : <HiCode />,
		initialData : {
			content : 'Code'
		}
	},
];


function BlockSelectionMenu({onSelect, onClose}) {

	const [items, setItems]       = useState(allowedBlocks);
	const [command, setCommand]   = useState('');
	const [selected, setSelected] = useState(0);

	const onKeyDown = useCallback(e => {
		switch (e.key) {
			case 'Enter'     : {
				// Calls `props.onSelect` with the allowed block at `items[selected]`
				e.preventDefault();
				onSelect(items[selected]);
				break;
			}
			case 'Backspace' : {
				if (!command) {
					// If `command` is empty, close the menu with callback `closeMenu()`
					onClose();
				} else {
					// Otherwise, remove the last character from `command`
					setCommand(command.substring(0, command.length - 1));
				}
				break;
			}
			case 'ArrowUp'   : {
				e.preventDefault();
				const prevSelected = selected === 0 ? items.length - 1 : selected - 1;
				setSelected(prevSelected);
				break;
			}
			case 'ArrowDown' : {
				e.preventDefault();
				const nextSelected = selected === items.length - 1 ? 0 : selected + 1;
				setSelected(nextSelected);
				break;
			}
			default          : {
				// Set `command` to `command + e.key`
				console.info('Setting command to:', (command + e.key));
				setCommand(command + e.key);
			}
		}
	}, [items, command, selected, onClose, onSelect]);

	useEffect(() => {
		// Adds a key down listener on mount
		document.addEventListener('keydown', onKeyDown);
		return () => {
			// Returns a callback to remove listener on unmount
			document.removeEventListener('keydown', onKeyDown);
		}
	}, [onKeyDown]);
	useEffect(() => {
		// Whenever `command` is changed, recalculate `items`
		const items = matchSorter(allowedBlocks, command, { keys : ['id'] });
		setItems(items);
	}, [command, selected]);

	return (
		<div className={styles.BlockSelectionMenu}>
			<div className={styles.Items}>
				{
					items.map((item, key) => (
						<div
							className = {items.indexOf(item) === selected ? styles.SelectedItem : styles.Item}
							onClick   = {() => onSelect(item.id)}
							role      = {'button'}
							tabIndex  = {'0'}
							key       = {key}
						>
							<span className={styles.Icon}>
								{item.icon}
							</span>
							<span className={styles.Label}>
							 {item.label}
							</span>
						</div>
					))
				}
			</div>
		</div>
	);
}


export { BlockSelectionMenu };