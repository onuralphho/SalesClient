type TCartProducts = {
	sku: string;
	quantity: number;
	price: number;
	totalPrice: number;
	name: string;
};

interface ICart {
	orderId: string;
	items: TCartProducts[];
	address: string;
	paymentMethod: "cash" | "credit" ;
}
