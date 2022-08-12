import axios from "axios";
import React, { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import Button from "../Elements/Button";
import InputBox from "../Elements/InputBox";
import Select from "../Elements/Select";
import Layout from "../Layout";

export default function AddProduct() {
  const [productImg, setProductImg] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});

  const notify = (msg) => toast(msg);

  const createProductHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    if (productImg === "")
      return setError({ avatar: { msg: "Product Image is required!" } });

    const formData = new FormData();
    formData.append("avatar", productImg);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    axios({
      url: "http://localhost:5000/api/product/",
      method: "POST",
      data: formData,
      withCredentials: true,
    })
      .then((response) => {
        setProductImg("");
        setTitle("");
        setDescription("");
        setPrice("");
        setCategory("");
        notify(response.data.msg);
        setLoading(false);
      })
      .catch(({ response }) => {
        console.log(response);
        setLoading(false);
        setError(response.data.errors);
      });
  };

  return (
    <Layout>
      <div className="block p-6 bg-white w-full md:max-w-md lg:max-w-md mt-5">
        <ToastContainer />
        <form onSubmit={createProductHandler} encType="multipart/form-data">
          <div className="form-group mb-6">
            <label
              htmlFor="avatar"
              className={`flex w-full h-28 border-dashed border-2 text-gray-300 ${
                errors?.avatar ? "border-red-500" : "border-gray-400"
              } cursor-pointer rounded justify-center items-center mx-auto hover:text-gray-400 hover:bg-gray-100 `}
            >
              {productImg ? (
                <div
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(productImg)})`,
                  }}
                  className="w-full h-full bg-cover bg-no-repeat bg-center relative"
                >
                  <div className="opacity-0 transition bg-[#b1b1b167] h-full w-full flex justify-center items-center hover:opacity-100 ">
                    <RiImageAddFill className="text-3xl cursor-pointer text-[white]" />
                  </div>
                </div>
              ) : (
                <>
                  <RiImageAddFill className="text-3xl cursor-pointer" />
                  <span>Browse Image</span>
                </>
              )}
            </label>
            <span className="flex items-center text-gray-500">
              <AiOutlineUpload /> Upload Product Image
            </span>
            <input
              onChange={(e) => setProductImg(e.target.files[0])}
              type="file"
              id="avatar"
              className=" hidden "
            />
          </div>

          <div className="form-group mb-6">
            <InputBox
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Product title"
              error={errors?.title && errors.title}
            />
          </div>

          <div className="form-group mb-6">
            <div
              className={`mb-4 w-full rounded-lg border ${
                errors?.description ? "border-red-500" : "border-gray-200"
              }`}
            >
              <div class="py-2 px-4 rounded-b-lg">
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  id="editor"
                  rows="5"
                  className="block px-0 w-full text-base resize-none outline-none border-0 focus:ring-0 "
                  placeholder="Product description..."
                ></textarea>
                {errors?.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.msg}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <InputBox
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                min="0"
                placeholder="Price Tk"
                error={errors?.price && errors.price}
              />
            </div>
            <div className="form-group mb-6">
              <Select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                error={errors?.category && errors.category}
              >
                <option disabled value="">
                  Product Category
                </option>
                <option value="shart">Shart</option>
                <option value="pant">Pant</option>
                <option value="t-shart">T-Shart</option>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={loading} loading={loading}>
            Create Product
          </Button>
        </form>
      </div>
    </Layout>
  );
}
