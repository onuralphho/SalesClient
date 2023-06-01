interface ICartProduct {
  sku?: string;
  name?: string;
  price?: number;
  quantity?: number;
}

interface ICart {
  items: ICartProduct[];
}
