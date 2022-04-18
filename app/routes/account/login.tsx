import type { ActionFunction } from "@remix-run/node";
import { useActionData, Form, Link } from "@remix-run/react";
import React from "react";
import Logo from "~/components/Logo";
import { createUserSession, login } from "../../services/session.server";

type Props = {};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    username: string;
    password: string;
  };
};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length <= 0) {
    return `Please enter Username!!!`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length <= 0) {
    return `Please provide a Password!!!`;
  }
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  if (typeof username !== "string" || typeof password !== "string") {
    return {
      formError: `Form not submitted correctly.`,
    };
  }
  const fields = { username, password };
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };
  if (Object.values(fieldErrors).some(Boolean)) return { fieldErrors, fields };
  const user = await login({ username, password });
  if (!user) {
    return {
      fields,
      formError: `Username/Password is incorrect`,
    };
  }
  return createUserSession(user.id);
};

const Login: React.FC<Props> = (props) => {
  const actionData = useActionData<ActionData>();
  console.log(actionData?.fieldErrors);
  return (
    <div>
      <div className="h-20 w-full mx-auto flex items-center justify-center border-b-2 mb-10">
        <Logo />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="max-w-2xl flex flex-col flex-auto items-center">
          <div className="flex items-center justify-center text-4xl mb-10">
            <p className="text-5xl">LOGIN</p>
          </div>
          <Form
            method="post"
            className="h-auto w-full py-4 flex flex-col items-center"
          >
            <div className="flex flex-col h-auto py-1 w-5/6 justify-between mb-6">
              <label htmlFor="username" className="text-xl">
                Username
              </label>
              <input
                id="username-input"
                name="username"
                type="text"
                defaultValue={actionData?.fields?.username}
                className="h-10 w-full border-2 px-4"
                autoFocus
              />
              {actionData?.fieldErrors?.username ? (
                <p className="text-red-500">
                  {actionData.fieldErrors.username}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col h-auto py-1 w-5/6 justify-between mb-6">
              <label htmlFor="password" className="text-xl">
                password
              </label>
              <input
                id="password-input"
                name="password"
                type="password"
                defaultValue={actionData?.fields?.password}
                className="h-10 w-full border-2 px-4"
              />
              {actionData?.fieldErrors?.password ? (
                <p className="text-red-500">
                  {actionData.fieldErrors.password}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center h-10 w-5/6 mb-5 bg-black text-white text-xl"
            >
              SIGN IN
            </button>
            {actionData?.formError ? (
              <p className="text-red-500">{actionData.formError}</p>
            ) : null}
          </Form>
          <div className="flex items-center justify-center w-5/6">
            <p className="text-xl">
              Don&apos;t have an account?{" "}
              <Link to="/account/register">
                <span className="underline hover:cursor-pointer">
                  Register here
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
