import axios from "axios";
import { useEffect, useState } from "react";
import {
    AiOutlineDelete,
    AiOutlineExport,
    AiOutlinePlus,
} from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import { Link, useLocation, useParams } from "react-router-dom";
import { UseContext } from "../context/ContextProvider";
import Layout from "../Layout";
import ProductInfo from "../productInfo/ProductInfo";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProduct] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(""); // this id for show information
    const [showHideProductInfo, setShowHideProductInfo] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { status } = useParams();
    const location = useLocation();

    const {
        currentUser: { role },
    } = UseContext();

    const productInfoShowHandlear = (id) => {
        setSelectedProductId(id);
        setShowHideProductInfo(true);
    };

    const productInfoHideHandlear = () => {
        setShowHideProductInfo(false);
    };

    const productStatusType = (status) => {
        switch (status) {
            case "active":
                return (
                    <span className="bg-green-400 capitalize text-white font-medium px-2 pb-1 rounded-lg">
                        {status}
                    </span>
                );
            case "pending":
                return (
                    <span className="bg-orange-400 capitalize text-white font-medium px-2 pb-1 rounded-lg">
                        {status}
                    </span>
                );

            case "cancel":
                return (
                    <span className="bg-red-500 capitalize text-white font-medium px-2 pb-1 rounded-lg">
                        {status}
                    </span>
                );
            default:
                break;
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${status}`)
            .then(({ data }) => {
                setProducts(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [status]);

    // product select checkbox handler;
    const productCheckHandler = (productId) => {
        if (selectedProducts.includes(productId)) {
            // create a copy selected product array to splice the product id;
            const copySelectedProducts = [...selectedProducts];
            // fild index;
            const productIdIndex = copySelectedProducts.indexOf(productId);
            // splice the existing element;
            copySelectedProducts.splice(productIdIndex, 1);
            setSelectedProduct(copySelectedProducts);
        } else {
            setSelectedProduct([...selectedProducts, productId]);
        }
    };

    // al select handler;
    const allSelectHandler = () => {
        if (products?.length === selectedProducts?.length) {
            setSelectedProduct([]);
        } else {
            const allProductIds = products.map((product) => product.productId);
            setSelectedProduct(allProductIds);
        }
    };

    // product delete Handler
    const productDeleteHandler = () => {
        setDeleteLoading(true);
        console.log(selectedProducts);
        axios
            .delete(
                `${
                    process.env.REACT_APP_BACKEND_URL
                }/api/products/${JSON.stringify(selectedProducts)}`
            )
            .then(({ data }) => {
                console.log(data);
                const filterProduct = products.filter(
                    (product) => !selectedProducts.includes(product?.productId)
                );
                setProducts(filterProduct);
                setDeleteLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setDeleteLoading(false);
            });
    };

    return (
        <Layout>
            <div className="pt-6">
                <div className="flex justify-between mb-3 ">
                    <h2 className=" text-3xl font-bold ">Products</h2>
                    <div className="flex justify-end items-center gap-2">
                        <button className=" flex items-center rounded px-2 h-7 text-sm shadow-sm hover:shadow font-semibold border-solid border border-gray-300 ">
                            <AiOutlineExport className="mr-1" />
                            Export
                        </button>
                        <button className=" flex items-center rounded px-2 h-7 text-sm shadow-sm hover:shadow font-semibold bg-indigo-500 text-white ">
                            <AiOutlinePlus className="mr-1" />
                            Post Product
                        </button>
                    </div>
                </div>
                <div className=" border-solid border-b border-gray-200 pb-2 flex justify-between ">
                    <ul className="flex gap-6 text-sm text-gray-500 font-medium ">
                        <li className="relative">
                            <Link
                                to="/products/all"
                                className={
                                    location.pathname.split("/")[2] === "all"
                                        ? "before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-[-8px] before:bg-indigo-600 text-indigo-600 "
                                        : ""
                                }
                            >
                                All
                            </Link>
                        </li>
                        <li className="relative">
                            <Link
                                to="/products/active"
                                className={
                                    location.pathname.split("/")[2] === "active"
                                        ? "before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-[-8px] before:bg-indigo-600 text-indigo-600 "
                                        : ""
                                }
                            >
                                Active
                            </Link>
                        </li>
                        <li className="relative">
                            <Link
                                to="/products/pending"
                                className={
                                    location.pathname.split("/")[2] ===
                                    "pending"
                                        ? "before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-[-8px] before:bg-indigo-600 text-indigo-600 "
                                        : ""
                                }
                            >
                                Pending
                            </Link>
                        </li>
                        <li className="relative">
                            <Link
                                to="/products/cancel"
                                className={
                                    location.pathname.split("/")[2] === "cancel"
                                        ? "before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-[-8px] before:bg-indigo-600 text-indigo-600 "
                                        : ""
                                }
                            >
                                Cancel
                            </Link>
                        </li>
                    </ul>
                    <div>
                        {selectedProducts?.length > 0 && (
                            <button
                                disabled={deleteLoading}
                                onClick={productDeleteHandler}
                                className={`flex items-center rounded px-2 h-7 text-sm shadow-sm hover:shadow font-semibold border border-solid border-red-500 text-red-500 gap-1 ${
                                    deleteLoading && "cursor-wait"
                                }`}
                            >
                                <AiOutlineDelete /> Delete
                            </button>
                        )}
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="w-full lg:flex gap-3">
                        <div
                            className={`flex flex-col pt-3 ${
                                showHideProductInfo
                                    ? "w-full lg:w-[68%] mb-3 md:mb-3 lg:mb-0"
                                    : "min-w-full"
                            }`}
                        >
                            <div className="py-2 inline-block min-w-full">
                                <div className=" overflow-x-auto pb-4 tableScrollBar">
                                    <table className="min-w-max lg:mx-auto">
                                        <thead className="bg-white border-b">
                                            <tr>
                                                {role === "admin" && (
                                                    <th
                                                        scope="col"
                                                        className="py-2 text-left w-8"
                                                    >
                                                        <input
                                                            checked={
                                                                products?.length ===
                                                                selectedProducts?.length
                                                            }
                                                            type="checkbox"
                                                            onChange={
                                                                allSelectHandler
                                                            }
                                                        />
                                                    </th>
                                                )}
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 pr-2 py-2 text-left"
                                                >
                                                    #Product Id
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 py-2 text-left px-6"
                                                >
                                                    Product Image
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 pr-6 py-2 text-left"
                                                >
                                                    Catagory
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 pr-6 py-2 text-left"
                                                >
                                                    Price
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                                                >
                                                    Creator mail
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                                                >
                                                    Product Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-2"
                                                >
                                                    View details
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <tr
                                                    key={product.productId}
                                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                                >
                                                    {role === "admin" && (
                                                        <td className=" w-8 py-2 whitespace-nowrap">
                                                            <input
                                                                checked={selectedProducts.includes(
                                                                    product.productId
                                                                )}
                                                                type="checkbox"
                                                                onChange={() =>
                                                                    productCheckHandler(
                                                                        product.productId
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                    )}
                                                    <td className="pr-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {product.productId}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light py-2 px-6 whitespace-nowrap">
                                                        <img
                                                            src={`http://localhost:5000/productImages/${product.avatar}`}
                                                            alt="blank"
                                                            className="w-10 h-6 rounded"
                                                        />
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light pr-6 py-2 whitespace-nowrap">
                                                        {product.category}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light pr-6 py-2 whitespace-nowrap">
                                                        {product.price}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                                        {product.creator.email}
                                                    </td>
                                                    <td className=" relative text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                                                        {productStatusType(
                                                            product.status
                                                        )}
                                                    </td>
                                                    <td className=" relative text-xl text-gray-900 font-light px-6 py-2 whitespace-nowrap flex justify-center">
                                                        <HiOutlineViewGrid
                                                            onClick={() =>
                                                                productInfoShowHandlear(
                                                                    product._id
                                                                )
                                                            }
                                                            className="text-gray-600 hover:text-gray-700 cursor-pointer"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {showHideProductInfo && (
                            <ProductInfo
                                allProducts={products}
                                handlear={productInfoHideHandlear}
                                productId={selectedProductId}
                            />
                        )}
                    </div>
                ) : (
                    <div className="text-center pt-10">
                        <img
                            src="http://localhost:3000/images/emptydata.svg"
                            alt="empty"
                            className="w-28 mx-auto mb-5"
                        />
                        <p className="text-2xl font-semibold text-gray-700">
                            Empty!
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
