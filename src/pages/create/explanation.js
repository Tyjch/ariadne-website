import { useState } from "react";

function ExplanationCreator() {

	// STATES
	const [title, setTitle] = useState('Title');
	const [body, setBody]   = useState('Default Body');

	// HANDLERS
	function handleSubmit() {
		console.log(title)
		console.log(body)
	}

	// ELEMENTS
	const title_input = (<>
		<h1
			contentEditable = {true}
			onChange        = {e => setTitle(e.target.value)}
			style           = {{ padding : '5px' }}
		>
			{title}
		</h1>
	</>);
	const body_input  = (<>
		<p
			contentEditable = {true}
			onChange        = {e => setBody(e.target.value)}
			style           = {{ padding : '5px' }}
		>
			{body}
		</p>
	</>);
	const save_button = (<>
		<button onClick={handleSubmit}>
			Save
		</button>
	</>);

	return (
		<div style={{ margin : '20px' }}>
			{title_input}
			{body_input}
			{save_button}
		</div>
	);
}

export default ExplanationCreator;