import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, SetUser] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
  });
  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center gap-8">
        <h1 className="text-2xl sm:text-3xl  text-gray-500">
          Register yourself
        </h1>
        <span
          className="flex flex-col gap-5 w-xl"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <p className="font-bold  text-gray-500">Username</p>
          <input
            className="border rounded-md p-2 outline-0"
            type="text"
            value={user.username}
            placeholder="create username"
            onChange={(e) => {
              SetUser({ ...user, username: e.target.value });
            }}
          />
          <p className="font-bold  text-gray-500">Email</p>
          <input
            className="border rounded-md p-2 outline-0"
            type="email"
            value={user.email}
            placeholder="Enter your email"
            onChange={(e) => {
              SetUser({ ...user, email: e.target.value });
            }}
          />
          <p className="font-bold  text-gray-500">Mobile number</p>
          <input
            className="border rounded-md p-2 outline-0"
            type="text"
            value={user.number}
            placeholder="Enter your number"
            onChange={(e) => {
              SetUser({ ...user, number: e.target.value });
            }}
          />
          <p className="font-bold  text-gray-500">Password</p>
          <span className="border rounded-md p-2 flex items-center ">
            <input
              className="w-full outline-0"
              type="password"
              value={user.password}
              placeholder="Create new password"
              onChange={(e) => {
                SetUser({ ...user, password: e.target.value });
              }}
            />
          </span>

          <button
            className="p-3 w-full text-white bg-blue-600 rounded-md hover:bg-blue-800 cursor-pointer"
            type="submit"
          >
            Create account
          </button>
          <Link
            className="font-bold cursor-pointer text-gray-500"
            to={"/login"}
          >
            back to login
          </Link>
        </span>
      </div>
    </>
  );
};

export default Register;
