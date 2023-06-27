import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getItemsLength } from "../reducer/cartSlice";

const NavBar = () => {

	const cartLength = useSelector(getItemsLength)

	return (
		<nav className="bg-[#ffffff10] gap-2 flex items-end justify-between backdrop-blur-sm p-2 rounded-md border-[1px] border-[#dbdbdb49]">
			<div className="flex items-end">
				<Link to={"/"}>
					<h1 className="text-3xl md:text-5xl border-r pr-4">Colin's</h1>
				</Link>
				<ul className="flex lg:gap-1  lg:text-xl  h-full items-end">
					<li className="relative group">
						<Link
							to={"/products"}
							className="hover:bg-[#ffffff13] px-2 transition-all rounded-md ">
							Products
						</Link>
					</li>
					<li className="relative group">
						<Link
							to={"products/add"}
							className="hover:bg-[#ffffff13] px-2 transition-all rounded-md ">
							Add New
						</Link>
					</li>
				</ul>
			</div>
			<div className="">Sepet: {cartLength } </div>
		</nav>
	);
};

export default NavBar;
