import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineCloseSquare,
  AiOutlineEdit,
  AiOutlineUpload,
} from "react-icons/ai";
import { FcCheckmark } from "react-icons/fc";
import { GrUserManager, GrUserWorker } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { UseContext } from "../context/ContextProvider";
import InputBox from "../Elements/InputBox";
import Select from "../Elements/Select";

export default function ProductInfo({ data, allProducts, handlear }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [productImg, setProductImg] = useState("");

  const [isTitleEdit, setTitleEdit] = useState(false);
  const [isDescriptionEdit, setDescriptionEdit] = useState(false);
  const [isPriceEdit, setPriceEdit] = useState(false);
  const [isCategoryEdit, setCategoryEdit] = useState(false);
  const [isStatusEdit, setStatusEdit] = useState(false);

  const [titleLoading, setTitleLoading] = useState(false);
  const [titleSuccess, setTitleSuccess] = useState(false);
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const [descriptionSuccess, setDescriptionSuccess] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceSuccess, setPriceSuccess] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categorySuccess, setCategorySuccess] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusSuccess, setStatusSuccess] = useState(false);
  const [productImgLoading, setProductImgLoading] = useState(false);

  const titleReference = useRef();
  const descriptionReference = useRef();
  const priceReference = useRef();
  const categoryReference = useRef();
  const statusReference = useRef();

  const { currentUser } = UseContext();

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

  const selectRoleBatched = (role) => {
    switch (role) {
      case "admin":
        return <MdOutlineAdminPanelSettings className=" text-indigo-600 " />;
      case "manager":
        return <GrUserManager className=" text-indigo-600 " />;
      case "worker":
        return <GrUserWorker className=" text-indigo-600 " />;

      default:
        break;
    }
  };

  useEffect(() => {
    setTitle(data.title);
    setDescription(data.description);
    setPrice(data.price);
    setCategory(data.category);
    setStatus(data.status);
    setProductImg(data.avatar);
  }, [data]);

  const titleUpdateHandlear = () => {
    setTitleLoading(true);
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/product/${data._id}`,
      method: "PUT",
      data: { title },
      withCredentials: true,
    })
      .then((response) => {
        setTitleLoading(false);
        setTitleSuccess(true);
        setTitleEdit(false);

        if (response.data.success) {
          allProducts.forEach((p) => {
            if (p._id === data._id) {
              p.title = title;
              setTimeout(() => {
                setTitleSuccess(false);
              }, 2000);
            }
          });
        }
      })
      .catch(({ response }) => {
        setTitleLoading(false);
        console.log(response);
      });
  };

  const descriptionUpdateHandlear = () => {
    setDescriptionLoading(true);
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/product/${data._id}`,
      method: "PUT",
      data: { description },
      withCredentials: true,
    })
      .then((response) => {
        setDescriptionLoading(false);
        setDescriptionSuccess(true);
        setDescriptionEdit(false);

        if (response.data.success) {
          allProducts.forEach((p) => {
            if (p._id === data._id) {
              p.description = description;
              setTimeout(() => {
                setDescriptionSuccess(false);
              }, 2000);
            }
          });
        }
      })
      .catch(({ response }) => {
        setDescriptionLoading(false);
        console.log(response);
      });
  };

  const priceUpdateHandlear = () => {
    setPriceLoading(true);
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/product/${data._id}`,
      method: "PUT",
      data: { price },
      withCredentials: true,
    })
      .then((response) => {
        setPriceLoading(false);
        setPriceSuccess(true);
        setPriceEdit(false);

        if (response.data.success) {
          allProducts.forEach((p) => {
            if (p._id === data._id) {
              p.price = price;
              setTimeout(() => {
                setPriceSuccess(false);
              }, 2000);
            }
          });
        }
      })
      .catch(({ response }) => {
        setPriceLoading(false);
      });
  };

  const categoryUpdateHandlear = () => {
    setCategoryLoading(true);
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/product/${data._id}`,
      method: "PUT",
      data: { category },
      withCredentials: true,
    })
      .then((response) => {
        setCategoryLoading(false);
        setCategorySuccess(true);
        setCategoryEdit(false);

        if (response.data.success) {
          allProducts.forEach((p) => {
            if (p._id === data._id) {
              p.category = category;
              setTimeout(() => {
                setCategorySuccess(false);
              }, 2000);
            }
          });
        }
      })
      .catch(({ response }) => {
        setCategoryLoading(false);
        console.log(response);
      });
  };

  const statusUpdateHandlear = () => {
    setStatusLoading(true);
    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/product/${data._id}`,
      method: "PUT",
      data: { status },
      withCredentials: true,
    })
      .then((response) => {
        setStatusLoading(false);
        setStatusSuccess(true);
        setStatusEdit(false);

        if (response.data.success) {
          allProducts.forEach((p) => {
            if (p._id === data._id) {
              p.status = status;
              setTimeout(() => {
                setStatusSuccess(false);
              }, 2000);
            }
          });
        }
      })
      .catch(({ response }) => {
        setStatusLoading(false);
        console.log(response);
      });
  };

  const productPhotoUpdateHandlear = (file) => {
    setProductImgLoading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("old_avatar", data.avatar);

    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/api/product/image/${data._id}`,
      method: "PUT",
      data: formData,
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.success) {
          allProducts.forEach((p) => {
            if (p._id === data._id) {
              p.avatar = response.data.updated_avatar;
              setProductImg(response.data.updated_avatar);
            }
          });
        }
        setProductImgLoading(false);
      })
      .catch(({ response }) => {
        console.log(response);
        setProductImgLoading(false);
      });
  };

  return (
    <div className="border border-t-0 w-full lg:h-[75vh] lg:overflow-y-auto tableScrollBar pt-3 relative mb-2 md:mb-2 lg:mb-0 ">
      <AiOutlineCloseSquare
        onClick={handlear}
        className=" absolute top-3 left-3 text-gray-500 text-xl hover:text-gray-600 cursor-pointer "
      />
      <div className="px-2 pt-2 mb-4">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/images/${data.creator.avatar}`}
          alt="user"
          className=" w-24 h-20 rounded-sm mx-auto "
        />
        <div className=" mb-2 font-semibold text-sm flex justify-center items-center ">
          Publisher {selectRoleBatched(data.creator.role)}
        </div>
        <table className="text-sm font-semibold">
          <tbody>
            <tr>
              <td>Name</td>
              <td className="px-1"> : </td>
              <td>{`${data.creator.firstName} ${data.creator.lastName}`}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td className="px-1"> : </td>
              <td>{data.creator.email}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td className="px-1"> : </td>
              <td>15/07/2022</td>
            </tr>
            <tr>
              <td>P_ID</td>
              <td className="px-1"> : </td>
              <td>{data.productId}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td className="px-1"> : </td>
              <td>{productStatusType(data.status)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" h-auto px-2 ">
        <div>
          <div
            style={{
              backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/productImages/${productImg})`,
            }}
            className="w-full h-40 bg-center bg-cover bg-no-repeat relative"
          >
            {productImgLoading && (
              <div className="transition flex justify-center items-center bg-[#b1b1b167] h-full w-full">
                <img
                  src={`${process.env.REACT_APP_APPLICATION_URL}/images/img_loading.svg`}
                  alt="loading"
                  className="animate-spin w-16 h-16 "
                />
              </div>
            )}
          </div>

          {currentUser.role !== "manager" && (
            <div>
              <label
                htmlFor="changeProductPhoto"
                className="flex gap-1 items-center text-indigo-500 cursor-pointer hover:text-indigo-600 text-sm"
              >
                <AiOutlineUpload />
                Change product photo
              </label>
              <input
                onChange={(e) => productPhotoUpdateHandlear(e.target.files[0])}
                type="file"
                id="changeProductPhoto"
                hidden
                accept="image/*"
              />
            </div>
          )}
        </div>

        <div className="mt-3 pb-2">
          <div className="mb-4">
            <div className="flex justify-between mb-1 ">
              <label htmlFor="title">Title:</label>
              {currentUser.role !== "manager" && (
                <>
                  {!isTitleEdit && !titleSuccess && (
                    <button
                      type="button"
                      className="text-indigo-500 px-1 py-0 rounded-sm "
                      onClick={() => {
                        titleReference.current.disabled = false;
                        titleReference.current.focus();
                      }}
                    >
                      <AiOutlineEdit />
                    </button>
                  )}

                  {isTitleEdit && (
                    <button
                      disabled={titleLoading}
                      onClick={titleUpdateHandlear}
                      type="button"
                      className={` ${
                        titleLoading ? "bg-indigo-400" : "bg-indigo-600"
                      } text-white px-1 py-0 rounded-sm text-xs `}
                    >
                      Save
                    </button>
                  )}

                  {titleSuccess && <FcCheckmark />}
                </>
              )}
            </div>
            <InputBox
              disabled
              innerRef={titleReference}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleEdit(true);
              }}
              onBlur={() => (titleReference.current.disabled = true)}
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label htmlFor="description">Description:</label>

              {currentUser.role !== "manager" && (
                <>
                  {!isDescriptionEdit && !descriptionSuccess && (
                    <button
                      type="button"
                      className="text-indigo-500 px-1 py-0 rounded-sm "
                      onClick={() => {
                        descriptionReference.current.disabled = false;
                        descriptionReference.current.focus();
                      }}
                    >
                      <AiOutlineEdit />
                    </button>
                  )}

                  {isDescriptionEdit && (
                    <button
                      disabled={descriptionLoading}
                      onClick={descriptionUpdateHandlear}
                      type="button"
                      className={` ${
                        descriptionLoading ? "bg-indigo-400" : "bg-indigo-600"
                      } text-white px-1 py-0 rounded-sm text-xs `}
                    >
                      Save
                    </button>
                  )}

                  {descriptionSuccess && <FcCheckmark />}
                </>
              )}
            </div>

            <textarea
              ref={descriptionReference}
              disabled
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionEdit(true);
              }}
              onBlur={() => (descriptionReference.current.disabled = true)}
              rows="5"
              id="editor"
              className="tableScrollBar form-control block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none  resize-none"
              placeholder="Product description..."
            ></textarea>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label htmlFor="price">Price:</label>

              {currentUser.role !== "manager" && (
                <>
                  {!isPriceEdit && !priceSuccess && (
                    <button
                      type="button"
                      className="text-indigo-500 px-1 py-0 rounded-sm "
                      onClick={() => {
                        priceReference.current.disabled = false;
                        priceReference.current.focus();
                      }}
                    >
                      <AiOutlineEdit />
                    </button>
                  )}

                  {isPriceEdit && (
                    <button
                      disabled={priceLoading}
                      onClick={priceUpdateHandlear}
                      type="button"
                      className={` ${
                        priceLoading ? "bg-indigo-400" : "bg-indigo-600"
                      } text-white px-1 py-0 rounded-sm text-xs `}
                    >
                      Save
                    </button>
                  )}
                  {priceSuccess && <FcCheckmark />}
                </>
              )}
            </div>
            <InputBox
              innerRef={priceReference}
              disabled
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setPriceEdit(true);
              }}
              onBlur={() => (priceReference.current.disabled = true)}
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label htmlFor="category">Category:</label>

              {currentUser.role !== "manager" && (
                <>
                  {!isCategoryEdit && !categorySuccess && (
                    <button
                      type="button"
                      className="text-indigo-500 px-1 py-0 rounded-sm "
                      onClick={() => {
                        categoryReference.current.disabled = false;
                        categoryReference.current.focus();
                      }}
                    >
                      <AiOutlineEdit />
                    </button>
                  )}

                  {isCategoryEdit && (
                    <button
                      disabled={categoryLoading}
                      onClick={categoryUpdateHandlear}
                      type="button"
                      className=" bg-indigo-600 text-white px-1 py-0 rounded-sm text-xs "
                    >
                      Save
                    </button>
                  )}
                  {categorySuccess && <FcCheckmark />}
                </>
              )}
            </div>

            <Select
              innerRef={categoryReference}
              disabled
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCategoryEdit(true);
              }}
              onBlur={() => (categoryReference.current.disabled = true)}
            >
              <option value="shart">Shart</option>
              <option value="pant">Pant</option>
              <option value="t-shart">T-Shart</option>
            </Select>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="category">Status:</label>

              {currentUser.role === "admin" && (
                <>
                  {!isStatusEdit && !statusSuccess && (
                    <button
                      type="button"
                      className="text-indigo-500 px-1 py-0 rounded-sm "
                      onClick={() => {
                        statusReference.current.disabled = false;
                        statusReference.current.focus();
                      }}
                    >
                      <AiOutlineEdit />
                    </button>
                  )}

                  {isStatusEdit && (
                    <button
                      disabled={statusLoading}
                      onClick={statusUpdateHandlear}
                      type="button"
                      className=" bg-indigo-600 text-white px-1 py-0 rounded-sm text-xs "
                    >
                      Save
                    </button>
                  )}
                  {statusSuccess && <FcCheckmark />}
                </>
              )}
            </div>

            <Select
              innerRef={statusReference}
              disabled
              name="status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setStatusEdit(true);
              }}
              onBlur={() => (statusReference.current.disabled = true)}
            >
              <option
                value="active"
                className="bg-green-400 text-white font-medium px-2 py-1"
              >
                Active
              </option>
              <option
                value="pending"
                className="bg-orange-400 text-white font-medium px-2 py-1 rounded-lg"
              >
                Pending
              </option>
              <option
                value="cancel"
                className="bg-red-500 capitalize text-white font-medium px-2 pb-1 rounded-lg"
              >
                Cancel
              </option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
