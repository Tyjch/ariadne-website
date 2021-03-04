import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
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
	const [loggedIn, setLoggedIn] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(event) {
		// We need to prevent default behavior or else the request will be canceled on submission
		event.preventDefault();
		getAuthToken(username, password)
			.then(response => { Cookies.set('token', response); setLoggedIn(true) })
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
				<Link to={'/profile'} onClick={handleSubmit}>
					<button> Login </button>
				</Link>
			</form>
			{ loggedIn ? <Redirect to={'/profile'} /> : null }
		</div>
	)
}

export default LoginComponent;

