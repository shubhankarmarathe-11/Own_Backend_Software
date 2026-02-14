import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../../functions/axios.login";

const Login = () => {
  const [user, SetUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function OnSubmit() {
    let { result, error } = await LoginUser({
      email: user.email,
      password: user.password,
    });
    if (error != null) {
      // logic for wrong login
      console.log(error);
    } else {
      console.log(result);

      navigate("/dashboard");
    }
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center gap-8">
        <h1 className="text-2xl sm:text-3xl  text-gray-500">
          Login To Account
        </h1>
        <form
          className="flex flex-col gap-5 w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            OnSubmit();
          }}
        >
          <p className="font-bold  text-gray-500">Email</p>
          <input
            className="border rounded-md p-2 outline-0"
            type="email"
            value={user.email}
            placeholder="Enter your email"
            onChange={(e) => {
              SetUser({ ...user, email: e.target.value });
            }}
            required={true}
          />
          <p className="font-bold  text-gray-500">Password</p>
          <span className="border rounded-md p-2 flex items-center ">
            <input
              className="w-full outline-0"
              type="password"
              value={user.password}
              placeholder="Enter your password"
              onChange={(e) => {
                SetUser({ ...user, password: e.target.value });
              }}
              required={true}
            />
          </span>

          <button
            className="p-3 w-full text-white bg-blue-600 rounded-md hover:bg-blue-800 cursor-pointer"
            type="submit"
            // onClick={OnSubmit}
          >
            Login Now
          </button>
          <Link
            className="font-bold cursor-pointer text-gray-500"
            to={"/register"}
          >
            Register New User
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
