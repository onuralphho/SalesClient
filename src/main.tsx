import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Layout from "./layout/Layout.tsx";
import { BrowserRouter as Router} from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <Layout>
      <App />
    </Layout>
  </Router>
);
