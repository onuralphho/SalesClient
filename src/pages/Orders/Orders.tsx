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
		<div className="flex flex-wrap gap-2 py-2">
			{orders.map((order) => (
				<div key={order.orderId} className="flex flex-col gap-2 border rounded backdrop-blur-sm p-2">
					{order.items.map(item=>(<div key={item.sku} className="bg-black p-1">
                        <span>{item.quantity}</span>
                        <span>{item.name}</span>
                        <span>{item.price}$</span>
                        <span>{item.totalPrice}</span>
                    </div>))}
                    <div>{order.address}</div>
                    <div>{order.paymentMethod}</div>
				</div>
			))}
		</div>
	);
};

export default Orders;
