import { Link } from "react-router-dom";

export const DashHeader = () => {
	return (
		<header className='dash-header'>
			<div className='dash-header__container'>
				<Link to='/dash'>
					<h1 className='dash-header__title'>TechNotes</h1>
				</Link>
				<nav className='dash-header__nav'>{/* add nav button later */}</nav>
			</div>
		</header>
	);
};