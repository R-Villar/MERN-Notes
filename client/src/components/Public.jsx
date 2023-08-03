import { Link } from "react-router-dom";

export const Public = () => {
	return (
		<section className='public'>
			<header>
				<h1>
					Welcome to <span className='nowrap'>Daniel&apos;s Repair Shop!</span>
				</h1>
			</header>
            <footer>
				<Link to='/login'>Employee Login</Link>
			</footer>
			<main className='public__main'>
				<p>
					Located in New York City, Daniel Repair Shop provides a trained staff ready to meet your
					tech repair needs.
				</p>
				<address className='public__addr'>
					Daniel Repair
					<br />
					225 Foo Drive
					<br />
					New York, NY 12345
					<br />
					<a href='tel:+15555555555'>(555) 555-5555</a>
				</address>
				<br />
				<p>Owner: Daniel</p>
			</main>
			{/* <div className='public__img'>
				<img className='img' src='https://source.unsplash.com/random/800x600/?computer,repair' />
			</div> */}
		</section>
	);
};
