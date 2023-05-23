import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProducts[] | undefined>();

  useEffect(() => {
    const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;

    const getProducts = async () => {
      const res = await fetch(endPointUrl + "/api/product");
      const data = await res.json();
      setProducts(data)
    };

    getProducts();
  }, []);

  return <div className="flex flex-wrap py-2 justify-around">{products?.map(product=>(
    <ProductCard key={product.sku} product={product} />
  ))}</div>;
};

export default ProductsPage;
