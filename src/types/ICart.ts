interface ICartProduct {
  sku?: string;
  name?: string;
  price?: number;
  quantity?: number;
}

interface CartState {
	items: ICartProduct[];
}