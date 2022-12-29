import React from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";

export default function UserPermission({ handler }) {
    return (
        <div className="border border-t-0 w-full lg:w-[32%] lg:h-[75vh] lg:overflow-y-auto tableScrollBar pt-3 relative mb-2 md:mb-2 lg:mb-0 ">
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
                                    <input type="checkbox" />
                                    <span>Create</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input type="checkbox" />
                                    <span>Read</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input type="checkbox" />
                                    <span>Update</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <input type="checkbox" />
                                    <span>Delete</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
