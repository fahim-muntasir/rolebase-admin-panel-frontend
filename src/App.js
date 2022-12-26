import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/common/PrivateRoute";
import NotFound from "./components/pages/404";
import AddProduct from "./components/pages/AddProduct";
import AddUser from "./components/pages/AddUser";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import Messages from "./components/pages/Messages";
import Products from "./components/pages/Products";
import Users from "./components/pages/Users";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/*" element={<PrivateRoute />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products/:status" element={<Products />} />
                    <Route path="users/:role" element={<Users />} />
                    <Route path="add_user" element={<AddUser />} />
                    <Route path="add_product" element={<AddProduct />} />
                    <Route path="messages" element={<Messages />} />
                </Route>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
