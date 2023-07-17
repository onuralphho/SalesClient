import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getItemsLength } from "../reducer/cartSlice";
import { MdShoppingCart } from "react-icons/md";
import { IoTriangle } from "react-icons/io5";
import { MenuItems } from "../constants/MenuConst";

import CartDetailsNav from "./Cart/CartDetailsNav";

const NavBar = () => {
	const cartLength = useSelector(getItemsLength);
	const [cartDetailStatus, setCartDetailStatus] = useState<boolean>(false);
	const dropDownRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		let clickOutSideHandler = (e: MouseEvent) => {
			//! CART click outside to close
			if (!dropDownRef.current?.contains(e.target as Node)) {
				setCartDetailStatus(false);
			}
			//! Menu click outside to close
			if (!mobileMenuRef.current?.contains(e.target as Node)) {
				var x = document.getElementById("mobile_menu") as HTMLInputElement;
				if (x) {
					x.checked = false;
				}
			}
		};

		document.addEventListener("mousedown", clickOutSideHandler);
		return () => {
			document.removeEventListener("mousedown", clickOutSideHandler);
		};
	}, []);

	return (
		<nav className="bg-[#ffffff10] relative z-10  gap-2 flex items-end justify-between backdrop-blur-sm p-2 rounded-md border-[1px] border-[#dbdbdb49]">
			<div className="flex items-end">
				<Link to={"/"}>
					<h1 className="text-3xl md:text-5xl border-r pr-4">Colin's</h1>
				</Link>
				<ul
					ref={mobileMenuRef}
					className="flex relative lg:gap-1 lg:text-xl  h-full items-end px-2">
					<input id="mobile_menu" type="checkbox" className="peer hidden" />
					<label
						htmlFor="mobile_menu"
						className="sm:hidden border flex flex-col gap-1 p-1 rounded cursor-pointer">
						<div className="h-[2px] w-4 bg-white rounded-full"></div>
						<div className="h-[2px] w-4 bg-white rounded-full"></div>
						<div className="h-[2px] w-4 bg-white rounded-full"></div>
					</label>

					{MenuItems.map((menuItem,index) => (
						<li key={index} className="relative group max-sm:absolute max-sm:top-16 max-sm:p-1 max-sm:bg-white max-sm:text-[#303030] rounded font-semibold max-sm:hidden  peer-checked:block">
							<Link
								to={menuItem.url}
								className="hover:bg-[#ffffff13] px-2 transition-all rounded-md whitespace-nowrap">
								{menuItem.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div ref={dropDownRef} className=" relative   cursor-pointer ">
				<div
					onClick={() => {
						setCartDetailStatus((prev) => !prev);
					}}
					className="flex gap-2  items-center border p-2 px-4 border-[#dbdbdb49] hover:bg-[#dbdbdb49] rounded-lg ">
					<MdShoppingCart className="w-6 h-6" />
					<span className="text-xl"> {cartLength}</span>
				</div>
				{cartDetailStatus && (
					<div className="absolute border bg-white  backdrop-blur-sm  top-14  right-0 rounded-lg">
						<IoTriangle className="-top-4 right-5 w-8  h-8 absolute" />
						<CartDetailsNav />
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
