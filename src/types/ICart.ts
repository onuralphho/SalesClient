type TCartProducts = {
	sku: string;
	quantity: number;
	price: number;
	totalPrice: number;
	name: string;
};

interface ICart {
	items: TCartProducts[];
}

