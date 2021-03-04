import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

// async function getCurrentUser() {
// 	const auth_cookie = Cookies.getJSON('token')
// 	if (auth_cookie) {
// 		const response = await fetch('http://127.0.0.1:8000/users/me', {
// 			method      : 'GET',
// 			mode        : 'cors',
// 			cache       : 'no-cache',
// 			credentials : 'same-origin',
// 			headers     : {
// 				'Accept'        : 'application/json',
// 				'Authorization' : `Bearer ${auth_cookie.access_token}`
// 			}
// 		});
// 		return response.json();
// 	} else {
// 		console.warn('No authorization cookie found');
// 	}
// }

function Profile() {
	function handleLogout() {
		Cookies.remove('token');
	}

	const profile = (<>
		<p> My Page </p>
		<Link to={'/'}>
			<button onClick={handleLogout}> Log out </button>
		</Link>
	</>);

	return (
		<div>
			{ Cookies.get('token') ? profile : <Redirect to={'/login'} /> }
		</div>
	);
}

export default Profile;