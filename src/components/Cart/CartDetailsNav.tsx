import { useDispatch, useSelector } from "react-redux";
import { getTotalPrice } from "../../reducer/cartSlice";
import { Link } from "react-router-dom";
import { completeOrder } from "../../reducer/cartSlice";

const CartDetailsNav = () => {
	const cart = useSelector((state: { cart: ICart }) => state.cart);
	const cartItems = useSelector((state: { cart: ICart }) => state.cart.items);
	const totalPrice = useSelector(getTotalPrice);
	const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;

	const dispatch = useDispatch();
	return (
		<div className="text-[#252525] w-[calc(100vw - 20px)] cursor-default ">
			<div className="font-bold text-xl p-2 shadow-lg">Products:</div>
			<ul className=" h-40 overflow-y-auto">
				{cartItems.map((e) => (
					<li
						className="flex gap-20 justify-between  text-lg border-b p-2 hover:bg-stone-200"
						key={e.sku}>
						<div className="flex  gap-3 ">
							<span className="italic">x{e.quantity}</span>
							<span className="whitespace-nowrap">{e.name}</span>
						</div>
						<span>{e.totalPrice}$</span>
					</li>
				))}
			</ul>
			<div className="text-lg border-t-2  p-2 flex justify-end items-center gap-2 font-bold">
				<span>Total:</span>
				<span>{totalPrice}$</span>
				<button
					onClick={async () => {
						const res = await fetch(endPointUrl + "/api/orders/addorder", {
							method: "POST",
							body: JSON.stringify(cart),
							headers: { "Content-Type": "application/json" },
						});
						const data = await res.json();
						console.log(data);
						dispatch(completeOrder(cart));
					}}
					className="rounded text-sm bg-green-400 text-white px-2 p-1">
					Complete
				</button>
			</div>
		</div>
	);
};

export default CartDetailsNav;
