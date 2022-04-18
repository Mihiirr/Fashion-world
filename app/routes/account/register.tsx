import { Form, Link } from "@remix-run/react";
import React from "react";
import Logo from "../../Components/Logo";

type Props = {};

const Register = (props: Props) => {
  return (
    <div>
      <div className="h-20 w-full mx-auto flex items-center justify-center border-b-2 mb-10">
        <Logo />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="max-w-2xl flex flex-col flex-auto items-center">
          <div className="flex items-center justify-center text-4xl mb-10">
            <p className="text-5xl">REGISTER</p>
          </div>
          <Form className="w-full flex flex-col items-center">
            <div className="flex flex-col h-20 py-1 w-5/6 justify-between mb-6">
              <label htmlFor="username" className="text-xl">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="username"
                className="h-10 w-full border-2 px-4"
                autoFocus
              />
            </div>
            <div className="flex flex-col h-20 py-1 w-5/6 justify-between mb-6">
              <label htmlFor="email" className="text-xl">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                className="h-10 w-full border-2 px-4"
              />
            </div>

            <div className="flex flex-col h-20 py-1 w-5/6 justify-between mb-6">
              <label htmlFor="password" className="text-xl">
                password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="h-10 w-full border-2 px-4"
              />
            </div>

            <div className="flex items-center justify-center h-10 w-5/6 mb-5 bg-black text-white">
              <div className="text-xl">SIGN IN</div>
            </div>
          </Form>
          <div className="flex items-center justify-center w-5/6">
            <p className="text-xl">
              Already have an account?{" "}
              <Link to="/account/login">
                <span className="underline hover:cursor-pointer">
                  Login here
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
