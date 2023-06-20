import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Layout from "./layout/Layout.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import CartStore from "./store/CartStore.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Router>
		<Provider store={CartStore}>
			<Layout>
				<App />
			</Layout>
		</Provider>
	</Router>
);
