import { Link } from "@remix-run/react";
import React, { useState } from "react";
import InstagramIcon from "./Icons/InstagramIcon";
import FacebookIcon from "./Icons/FacebookIcon";
import SearchIcon from "./Icons/SearchIcon";
import UserIcon from "./Icons/UserIcon";
import Logo from "./Logo";
import { useRootContext } from "~/context/RootContext";
import CartIcon from "./Icons/CartIcon";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [UserDropdown, SetUserDropdown] = useState(false);
  const {
    rootState: { user },
  } = useRootContext();

  const userProfileClickHandler = () => {
    SetUserDropdown(!UserDropdown);
  };
  return (
    <div className="bg-stone-50">
      {/* Header */}
      <div className="h-20 w-full border-b-2 border-gray-200 bg-white flex items-center px-8 mb-20">
        <div className="w-4/12">
          <SearchIcon className="rounded-md hover:cursor-pointer" />
        </div>
        <div className="w-4/12 flex items-center justify-center">
          <Logo size="large" />
        </div>
        <div className="w-4/12 flex justify-end">
          {!user ? (
            <Link to="/account/login">
              <UserIcon className="rounded-md hover:cursor-pointer" />
            </Link>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-lg mr-5">Hello {user.username}</p>
              <div>
                <UserIcon
                  className="mr-3 rounded-md hover:cursor-pointer"
                  onClick={userProfileClickHandler}
                />
                {UserDropdown && (
                  <div className="h-auto w-52 bg-white absolute top-30 right-20 rounded-lg p-4 shadow-xl z-10">
                    {user.role === "ADMIN" && (
                      <Link to="/admin/dashboard">
                        <div className="hover:bg-stone-200 hover:cursor-pointer rounded-md flex items-center px-2 h-10 text-xl">
                          Dashboard
                        </div>
                      </Link>
                    )}
                    <Link to="/account/profile">
                      <div className="hover:bg-stone-200 hover:cursor-pointer rounded-md flex items-center px-2 h-10 text-xl">
                        My Account
                      </div>
                    </Link>
                    <form action="/account/logout" method="post">
                      <button
                        type="submit"
                        className="hover:bg-red-300 hover:cursor-pointer rounded-md flex items-center px-2 h-10 w-full text-xl"
                      >
                        Sign Out
                      </button>
                    </form>
                  </div>
                )}
              </div>
              <Link to="/cart">
                <CartIcon className="rounded-md hover:cursor-pointer" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Children */}
      <div>{children}</div>

      {/* Footer */}
      <div className="h-64 w-full bg-stone-200 mt-20">
        <div className="h-full max-w-7xl mx-auto flex">
          <div className="h-full w-4/12 flex items-center justify-center">
            <Logo size="medium" />
          </div>
          <div className="h-full w-4/12 py-8 flex flex-col items-center">
            <p className="text-2xl mb-5">Reach out to us</p>
            <div className="flex justify-between w-16">
              <a href="https://instagram.com/mihiirrrrrr" target="_blank">
                <InstagramIcon className="hover:cursor-pointer" />
              </a>
              <FacebookIcon className="hover:cursor-pointer" />
            </div>
          </div>
          <div className="h-full w-4/12 p-8 flex flex-col items-center">
            <p className="text-2xl mb-5">Contact Us</p>
            <div>
              <p>
                Vaishnavi Signature, No. 78/9, Outer Ring Road, Bellandur,
                Varthur Hobli, Bengaluru-560103, Karnataka, India
              </p>
              <p>Email address:</p>
              <p>help@gmail.com</p>
              <p>© 2022 FashionAndWorld.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
