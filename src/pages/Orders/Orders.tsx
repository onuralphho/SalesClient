import React, { useEffect, useState } from "react";

interface IOrders {
	orderId: string;
	address: string;
	paymentMethod: string;
	items: {
		sku: string;
		quantity: 0;
		price: 0;
		totalPrice: 0;
		name: string;
	}[];
}

const Orders = () => {
	const [orders, setOrders] = useState<IOrders[]>([] as IOrders[]);
	const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;

	useEffect(() => {
		const getOrders = async () => {
			const res = await fetch(endPointUrl + "/api/orders/getorders");
			const data = await res.json();

			setOrders(data);
		};

		getOrders();
	}, []);

	return (
		<div className="flex flex-wrap  py-2">
			{orders.map((order) => (
				<div className="p-2 w-3/12">
					<div
						key={order.orderId}
						className="flex flex-col gap-2 p-2 border border-[#dbdbdb49] bg-[#ffffff0a] rounded-md backdrop-blur-sm ">
						{order.items.length > 0 ? (
							order.items.map((item) => (
								<div
									key={item.sku}
									className="flex justify-between border-[#dbdbdb49] bg-[#00000096] rounded-md backdrop-blur-sm  p-1 px-2">
									<div className="flex gap-2">
										<span>{item.quantity}x</span>
										<span>{item.name}</span>
									</div>
									<span>{item.price}$</span>
								</div>
							))
						) : (
							<div className="bg-black p-1 rounded-md px-2 text-center">
								No items in cart!  
							</div>
						)}
						<div>Adress: {order.address}</div>
						<div>Payment Method: {order.paymentMethod}</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Orders;