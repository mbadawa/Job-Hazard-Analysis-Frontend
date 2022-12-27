import React from "react";

function Footer() {
	return (
		<div className="bg-gray-600 p-12 mt-10 text-center">
			<div className="md:flex md:justify-between md:container grid grid-rows-3 gap-5 ml-auto mr-auto text-white">
				<ul className="flex flex-col gap-5 mt-auto mb-auto">
					<p className="font-bold text-3xl">Job Hazard Analysis</p>
				</ul>
				<ul className="flex flex-col gap-5">
					<p className="font-bold text-lg">Links Title</p>
					<li>
						<a href="http://localhost:3000">Test Link</a>
					</li>
					<li>
						<a href="http://localhost:3000">Test Link</a>
					</li>
					<li>
						<a href="http://localhost:3000">Test Link</a>
					</li>
				</ul>
				<ul className="flex flex-col gap-5">
					<p className="font-bold text-lg">Links Title</p>

					<li>
						<a href="http://localhost:3000">Test Link</a>
					</li>
					<li>
						<a href="http://localhost:3000">Test Link</a>
					</li>
					<li>
						<a href="http://localhost:3000">Test Link</a>
					</li>
				</ul>
				<ul className="flex flex-col gap-5">
					<p className="font-bold text-lg">Links Title</p>
					<li>
						<a href="http://localhost:3000">Test Link</a>
					</li>
					<li>
						<a href="http://localhost:3000">Test Link</a>
					</li>
					<li>
						<a href="http://localhost:3000">Test Link</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Footer;
