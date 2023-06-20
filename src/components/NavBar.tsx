import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";


const NavBar = () => {

  
	const cartItems = useSelector((state) => state);

  
	useEffect(() => {
		console.log(cartItems)
	}, [cartItems]);

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
			<div className="">Sepet: {cartItems.cart.items.length}</div>
		</nav>
	);
};

export default NavBar;
