type TCartProductsRequest = {
	sku: string;
	quantity: number;
};

interface ICartRequest {
	orderId: string;
	items: TCartProducts[];
	address: string;
	paymentMethod: "cash" | "credit" ;
}
