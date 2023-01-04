import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";

// const userPermission = {
//     product: { create: false, read: false, update: false, delete: false },
// };

export default function UserPermission({ handler, userId }) {
    const [permission, setPermission] = useState({});
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/s/${userId}`)
            .then(({ data }) => {
                setPermission(data?.[0]?.["permission"] || {});
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    }, [userId]);

    const checkBoxHandler = (permissionName, permissionType) => {
        setIsUpdate(true);
        setPermission({
            ...permission,
            [permissionName]: {
                ...permission[permissionName],
                [permissionType]: !permission[permissionName][permissionType],
            },
        });
    };

    // update handler
    const updateHandler = () => {
        setUpdateLoading(true);
        axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`,
            method: "PUT",
            data: { permission },
            withCredentials: true,
        })
            .then((response) => {
                setUpdateLoading(false);
                setIsUpdate(false);
            })
            .catch(({ response }) => {
                setUpdateLoading(false);
                console.log(response);
            });
    };

    return (
        <div className="border border-t-0 w-full lg:w-[32%] lg:h-[75vh] lg:overflow-y-auto tableScrollBar pt-3 relative mb-2 md:mb-2 lg:mb-0 ">
            {!loading && (
                <>
                    <AiOutlineCloseSquare
                        onClick={handler}
                        className=" absolute top-3 left-3 text-gray-500 text-xl hover:text-gray-600 cursor-pointer "
                    />
                    <div className="px-2 pt-2 mb-4">
                        <div className=" mb-5 font-semibold text-sm flex justify-center items-center mt-2">
                            <h2 className="text-xl">User permission</h2>
                        </div>
                        <table className="text-xs">
                            <tbody>
                                <tr>
                                    <td className=" font-semibold ">Product</td>
                                    <td className="px-1"> : </td>
                                    <td className="flex gap-3">
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    permission?.["product"][
                                                        "create"
                                                    ]
                                                }
                                                onChange={() =>
                                                    checkBoxHandler(
                                                        "product",
                                                        "create"
                                                    )
                                                }
                                            />
                                            <span>Create</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    permission?.["product"][
                                                        "read"
                                                    ]
                                                }
                                                onChange={() =>
                                                    checkBoxHandler(
                                                        "product",
                                                        "read"
                                                    )
                                                }
                                            />
                                            <span>Read</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    permission?.["product"][
                                                        "update"
                                                    ]
                                                }
                                                onChange={() =>
                                                    checkBoxHandler(
                                                        "product",
                                                        "update"
                                                    )
                                                }
                                            />
                                            <span>Update</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    permission?.["product"][
                                                        "delete"
                                                    ]
                                                }
                                                onChange={() =>
                                                    checkBoxHandler(
                                                        "product",
                                                        "delete"
                                                    )
                                                }
                                            />
                                            <span>Delete</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className=" absolute bottom-0 p-2 right-0 ">
                        <button
                            onClick={updateHandler}
                            disabled={updateLoading || !isUpdate}
                            className={`flex items-center rounded px-2 h-7 text-sm shadow-sm hover:shadow font-semibold ${
                                updateLoading
                                    ? "bg-indigo-300 cursor-wait"
                                    : "bg-indigo-500"
                            } text-white ${
                                !isUpdate && "bg-indigo-300 cursor-default"
                            }`}
                        >
                            {updateLoading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
