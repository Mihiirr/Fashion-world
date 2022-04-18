import { Link } from "@remix-run/react";
import React from "react";
import InstagramIcon from "./Icons/InstagramIcon";
import FacebookIcon from "./Icons/FacebookIcon";
import SearchIcon from "./Icons/SearchIcon";
import UserIcon from "./Icons/UserIcon";
import Logo from "./Logo";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {/* Header */}
      <div className="h-20 max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-4/12">
          <SearchIcon className="rounded-md hover:cursor-pointer" />
        </div>
        <div className="w-4/12 flex items-center justify-center">
          <Logo size="large" />
        </div>
        <div className="w-4/12 flex justify-end">
          <Link to="/account/login">
            <UserIcon className="rounded-md hover:cursor-pointer" />
          </Link>
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
              <InstagramIcon className="hover:cursor-pointer" />
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
