import React from "react";
import { FiCommand } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import styles from "../styles/navbar.module.css";


function NavBar() {
	const links   = (<>
		<div className={styles.links}>
			<NavLink
				className       = {styles.NavBarLink}
				activeClassName = {styles.NavBarLinkActive}
				to              = {'/'}
			>
				<FiCommand color={'white'} size={24} />
			</NavLink>

			<NavLink
				className       = {styles.NavBarLink}
				activeClassName = {styles.NavBarLinkActive}
				to              = {'/explore'}
			>
				Explore
			</NavLink>

			<NavLink
				className       = {styles.NavBarLink}
				activeClassName = {styles.NavBarLinkActive}
				to              = {'/learn'}
			>
				Learn
			</NavLink>

			<NavLink
				className       = {styles.NavBarLink}
				activeClassName = {styles.NavBarLinkActive}
				to              = {'/create'}
			>
				Create
			</NavLink>
		</div>
	</>);
	const profile = (<>
		<div className={styles.profile}>
			<Link
				className = {styles.NavBarLink}
				to        = {'/profile'}
			>
				<CgProfile color={'white'} size={24} />
			</Link>
		</div>
	</>);

	return (
		<nav className={styles.NavBar}>
			{links}
			{profile}
		</nav>
	)
}

export default NavBar;