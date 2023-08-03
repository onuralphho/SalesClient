import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import ProductLoading from "../../components/ProductLoading";

const ProductsPage = () => {
	const [products, setProducts] = useState<IProducts[] | undefined>();

	useEffect(() => {
		const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;

		const getProducts = async () => {
			const res = await fetch(endPointUrl + "/api/product");
			const data = await res.json();
			setProducts(data);
		};
		getProducts();
	}, []);

	if (products?.length === 0) {
		return <div>No product found!</div>;
	} else {
		return (
			<div className="flex flex-wrap container mx-auto py-2 ">
				{products ? (
					products?.map((product: IProducts) => (
						<ProductCard key={product.sku} product={product} />
					))
				) : (
					<ProductLoading />
				)}
			</div>
		);
	}
};

export default ProductsPage;
