import React from "react";
import { FaUserAlt } from "react-icons/fa";
function navbar() {
	return (
		<div className="bg-gray-100 shadow p-5">
			<div className="container flex items-center justify-between ml-auto mr-auto">
				<ul className="flex gap-5">
					<li>
						<a className="flex items-center gap-2" href="/dashboard">
							Dashboard
						</a>
					</li>
					<li>
						<a className="flex items-center gap-2" href="/create_JHA">
							Create New JHA
						</a>
					</li>
				</ul>
				{/* Avatar */}
				<div className="bg-white p-3 rounded-full cursor-pointer">
					<FaUserAlt />
				</div>
			</div>
		</div>
	);
}

export default navbar;
