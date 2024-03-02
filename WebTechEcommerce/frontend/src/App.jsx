import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import NotFound from "./components/NotFound";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminLayout from "./components/AdminPage/AdminLayout";
import DashboardBody from "./components/AdminPage/DashboardBody";
import Products from "./components/AdminPage/Products/Products";
import Settings from "./components/AdminPage/Settings";
import AddProductForm from "./components/AdminPage/Products/AddProductForm";
import LandingBody from "./components/LandingPage/LandingBody";
import AllProducts from "./components/LandingPage/AllProducts";
import SingleProduct from "./components/LandingPage/SingleProduct";
import Checkout from "./components/LandingPage/Checkout";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProductEdit from "./components/AdminPage/Products/ProductEdit";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />}>
        <Route index element={<LandingBody />} />
        <Route path="allproducts" element={<AllProducts />} />
        <Route path="product/:id" element={<SingleProduct />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardBody />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<AddProductForm />} />
        <Route path="update/:id" element={<ProductEdit />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
