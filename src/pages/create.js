import { Link, useRouteMatch } from "react-router-dom";
import styles from "../styles/create.module.css";

function CreationLink({to, title}) {
	return (
		<Link to={to} className={styles.CreationLink}>
			<span>
					{title}
			</span>
		</Link>
	)
}

function Create() {
	let { url } = useRouteMatch();

	const route_changer  = (<>
		<div>
			<h1> Content </h1>
			<div style={{ display : 'flex', flexDirection : 'column' }}>
				<CreationLink
					title = {'Assignment'}
					to    = {`${url}/assignment`}
				/>
				<CreationLink
					title = {'Explanation'}
					to    = {`${url}/explanation`}
				/>
			</div>
		</div>
	</>);

	return (
		<div style={{ margin : '50px' }}>
			{route_changer}
		</div>
	);
}

export default Create;