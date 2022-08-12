import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UseContext } from "../context/ContextProvider";
import Button from "../Elements/Button";
import InputBox from "../Elements/InputBox";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const notify = (msg) => toast(msg);
  const navigate = useNavigate();
  const { login, isLogin } = UseContext();

  const loginFormHandlear = (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    const loginData = { email, password };

    login(loginData, (response) => {
      console.log(response);
      if (response?.data?.errors) {
        setError(response.data.errors);
        setLoading(false);
      } else {
        setEmail("");
        setPassword("");
        notify(response.data.msg);
        setLoading(false);
        navigate("/dashboard", { replace: true });
      }
    });
  };

  return (
    <>
      {isLogin && <Navigate to="/dashboard" replace={true} />}
      {!isLogin && (
        <div className="w-full h-screen flex items-center">
          <ToastContainer />
          <div className=" w-[90%] md:w-[800px] lg:w-[900px] md:flex md:justify-between lg:flex lg:justify-between mx-auto shadow px-10 py-20">
            <div className="w-full md:w-80 lg:w-96 mb-10 md:mb-0 lg:mb-0">
              <h2 className="text-center text-2xl mb-5">Login Now</h2>
              <form onSubmit={loginFormHandlear} encType="multipart/form-data">
                <div>
                  <div className="form-group mb-6">
                    <InputBox
                      type="email"
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      error={error?.email && error.email}
                    />
                  </div>
                  <div className="form-group mb-6">
                    <InputBox
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      error={error?.password && error.password}
                    />
                    <a href="@" className="text-sm text-indigo-600">
                      Forget password
                    </a>
                  </div>
                </div>

                {/* alert message  */}
                {error?.msg && (
                  <div
                    className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                    role="alert"
                  >
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 inline w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                      <span className="font-medium">{error.msg}</span>
                    </div>
                  </div>
                )}
                {/* alert message  */}

                <Button type="submit" disabled={loading} loading={loading}>
                  Login
                </Button>
              </form>
            </div>
            <div>
              <img
                src="images/login.svg"
                alt="login svg"
                className="w-full md:w-80 md:h-[270px] lg:h-[230px] lg:w-96"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
