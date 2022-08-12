import axios from "axios";
import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineUpload } from "react-icons/ai";
// import { FcOk } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import Button from "../Elements/Button";
import InputBox from "../Elements/InputBox";
import Select from "../Elements/Select";
import Layout from "../Layout";

export default function AddUser() {
  const [imageFile, setImageFile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userRole, setUserRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});

  const notify = (msg) => toast(msg);

  const addUserHandlear = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("avatar", imageFile);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", emailAddress);
    formData.append("userRole", userRole);
    formData.append("password", password);

    setError({});

    axios({
      url: "http://localhost:5000/api/user/",
      method: "POST",
      data: formData,
    })
      .then((response) => {
        setImageFile("");
        setFirstName("");
        setLastName("");
        setEmailAddress("");
        setUserRole("");
        setPassword("");
        notify(response.data.msg);
        setLoading(false);
      })
      .catch(({ response }) => {
        setLoading(false);
        setError(response.data.errors);
      });
  };

  return (
    <Layout>
      <div className="block p-6 bg-white w-full md:max-w-md lg:max-w-md mt-5 ">
        <ToastContainer />
        <form onSubmit={addUserHandlear} encType="multipart/form-data">
          <div className="form-group mb-6">
            <label
              htmlFor="avatar"
              className="flex w-28 h-28 border-dashed border-2 text-gray-300 border-gray-400 cursor-pointer rounded-full justify-center items-center mx-auto hover:text-gray-400 hover:bg-gray-100 "
            >
              {imageFile ? (
                <div
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(imageFile)})`,
                  }}
                  className="w-full h-full rounded-full bg-cover bg-no-repeat bg-center relative"
                >
                  <div className="opacity-0 transition bg-[#b1b1b167] h-full w-full rounded-full flex justify-center items-center hover:opacity-100 ">
                    <AiOutlineCamera className="text-3xl cursor-pointer text-[white]" />
                  </div>
                </div>
              ) : (
                <AiOutlineCamera className="text-3xl cursor-pointer" />
              )}
            </label>
            <span className="flex items-center text-gray-500">
              <AiOutlineUpload /> Upload Profile Picture
            </span>
            <input
              type="file"
              id="avatar"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <InputBox
                type="text"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                error={errors?.firstName && errors.firstName}
              />
            </div>
            <div className="form-group mb-6">
              <InputBox
                type="text"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                error={errors?.lastName && errors.lastName}
              />
            </div>
          </div>
          <div className="form-group mb-6">
            <InputBox
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
              error={errors?.email && errors.email}
            />
          </div>
          <div className="form-group mb-6">
            <Select
              onChange={(e) => setUserRole(e.target.value)}
              value={userRole}
              error={errors?.userRole && errors.userRole}
            >
              <option disabled value="">
                Select user role
              </option>
              <option value="admin">Admin</option>
              <option value="worker">Worker</option>
              <option value="manager">Manager</option>
            </Select>
          </div>
          <div className="form-group mb-6">
            <InputBox
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              error={errors?.password && errors.password}
            />
          </div>
          <Button type="submit" disabled={loading} loading={loading}>
            Create User
          </Button>
        </form>
      </div>
    </Layout>
  );
}
