import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Tree from "../components/Pages/Tree";
import Home from "../components/Pages/Home";
import HomeCategoryProducts from "../components/Pages/HomeCategoryProdcuts";
import ProductDetails from "../components/Pages/ProductDetails";
import Cart from "../components/Pages/Cart";
import ProductManagement from "../components/Pages/ProductManagement";
import CheckOut from "../components/Pages/CheckOut";
import AboutUs from "../components/Pages/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/", // Adjust the path as needed
        element: <Home />, // Use TreeLayout for the trees route
      },
      {
        path: "tree", // Adjust the path as needed
        element: <Tree />, // Use TreeLayout for the trees route
      },
      {
        path: "category/:categoryName", // Adjust the path as needed
        element: <HomeCategoryProducts />, // Use TreeLayout for the trees route
      },
      {
        path: "product/:productId", // Adjust the path as needed
        element: <ProductDetails />, // Use TreeLayout for the trees route
      },
      {
        path: "/cart", // Adjust the path as needed
        element: <Cart />, // Use TreeLayout for the trees route
      },
      {
        path: "/dashboard", // Adjust the path as needed
        element: <ProductManagement />, // Use TreeLayout for the trees route
      },
      {
        path: "/checkout", // Adjust the path as needed
        element: <CheckOut></CheckOut>, // Use TreeLayout for the trees route
      },
      {
        path: "/about-us", // Adjust the path as needed
        element: <AboutUs></AboutUs>, // Use TreeLayout for the trees route
      },
    ],
  },
]);

export default router;
