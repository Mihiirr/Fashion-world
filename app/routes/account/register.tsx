import type { ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import React from "react";
import Logo from "~/components/Logo";
import { db } from "~/services/client.server";
import { createUserSession, register } from "~/services/session.server";

type Props = {};

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

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
  const userExists = await db.user.findFirst({
    where: { username },
  });
  if (userExists) {
    return {
      fields,
      formError: `User with Username: ${username} already exists`,
    };
  }
  const user = await register(username, password);
  return createUserSession(user.id);
};

const Register: React.FC<Props> = (props) => {
  const actionData = useActionData<ActionData>();
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
          <Form
            method="post"
            className="py-4 w-full h-auto flex flex-col items-center"
          >
            <div className="flex flex-col h-auto w-5/6 py-1 justify-between mb-6">
              <label htmlFor="username" className="text-xl">
                Username
              </label>
              <input
                id="username-input"
                name="username"
                type="text"
                className="h-10 w-full border-2 px-4"
                autoFocus
              />
              {actionData?.fieldErrors?.username ? (
                <p className="text-red-500">
                  {actionData.fieldErrors.username}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col h-auto w-5/6 py-1 justify-between mb-6">
              <label htmlFor="password" className="text-xl">
                password
              </label>
              <input
                id="password-input"
                name="password"
                type="password"
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
              SIGN UP
            </button>
            {actionData?.formError ? (
              <p className="text-red-500">
                {actionData.formError}, try different username!!!
              </p>
            ) : null}
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
