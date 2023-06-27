import { useSelector } from "react-redux";
import { getTotalPrice } from "../../reducer/cartSlice";

const CartDetailsNav = () => {
	const cartItems = useSelector((state: { cart: ICart }) => state.cart.items);
	const totalPrice = useSelector(getTotalPrice);
	return (
		<div className="text-[#252525] cursor-default ">
			<div className="font-bold text-xl p-2 shadow-lg">Products:</div>
			<ul className=" h-40 overflow-y-auto">
				{cartItems.map((e) => (
					<li
						className="flex justify-between w-96 text-lg border-b p-2 hover:bg-stone-200"
						key={e.sku}>
						<span>{e.name}</span>
						<span>{e.discountedPrice ?? e.price}$</span>
					</li>
				))}
			</ul>
			<div className="text-lg border-t-2  p-2 flex justify-end gap-2 font-bold">
				<span>Total:</span>
				<span>{totalPrice}$</span>
			</div>
		</div>
	);
};

export default CartDetailsNav;
