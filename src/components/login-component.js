import { useState } from "react";
import styles from "../styles/login-form.module.css";

async function getAuthToken(username='tylerchurchill', password='qwerasdf1234') {
	const response = await fetch('http://127.0.0.1:8000/token', {
		method      : 'POST',
		mode        : 'cors',
		cache       : 'no-cache',
		headers     : {
			'Accept'       : 'application/json',
			'Content-Type' : 'application/x-www-form-urlencoded',
			'Access-Control-Allow-Credentials' : 'true'
		},
		body        : new URLSearchParams({
			grant_type : 'password',
			username   : username,
			password   : password
		})
	});
	return response.json();
}

function LoginComponent() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(event) {
		// We need to prevent default behavior or else the request will be canceled on submission
		event.preventDefault();
		getAuthToken(username, password)
			.then(response => console.log('submit response:', response))
			.catch(error => console.log('submit error:', error))
	}

	return (
		<div className={styles.LoginComponent}>
			<form className={styles.form}>
				<input
					type         = {'text'}
					name         = {'username'}
					placeholder  = {'Username'}
					autoComplete = {'username'}
					onChange     = {e => setUsername(e.target.value)}
				/>
				<input
					type         = {'password'}
					name         = {'password'}
					placeholder  = {'Password'}
					autoComplete = {'current-password'}
					onChange     = {e => setPassword(e.target.value)}
				/>
				<button onClick={handleSubmit}> Login </button>
			</form>
		</div>
	)
}

export default LoginComponent;

