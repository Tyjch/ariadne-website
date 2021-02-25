import { useState, useEffect } from "react";
import LoginComponent from "../components/login-component";
import axios from "axios";


function Profile() {
	const [user, setUser] = useState(axios.get('http://127.0.0.1:8000/users/me').then(r => console.log(r)));
	console.log('user:', user)

	return (
		<div>
			<LoginComponent />
		</div>
	);
}

export default Profile;