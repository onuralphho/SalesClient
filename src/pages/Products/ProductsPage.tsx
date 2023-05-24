import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

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
      <div className="flex flex-wrap py-2 -z-20 ">
        {products?.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    );
  }
};

export default ProductsPage;
