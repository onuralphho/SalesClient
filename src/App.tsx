import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/Products/ProductsPage";
import AddNewPage from "./pages/Products/AddNewPage";
import Home from "./pages/Home/Home";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import Orders from "./pages/Orders/Orders";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<ProductsPage />} />
			<Route path="/products">
				<Route index element={<ProductsPage />} />
				<Route path=":sku" element={<ProductDetailPage />} />
				<Route path="add" element={<AddNewPage />} />
			</Route>
			<Route path="/orders" element={<Orders />} />
		</Routes>
	);
};

export default App;
