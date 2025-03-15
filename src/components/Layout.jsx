import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <header>
      <div className="bg-white shadow-lg py-4 flex justify-between px-10 text-3xl">
        <div className="content-center bg-white">
          <Link to="/">
            <RxHamburgerMenu size={20} />
          </Link>
        </div>
        <div className="font-bold">
          <Link to="/">English Plus</Link>
          <span className="">+</span>
        </div>
        <div className="flex">
          <div className="content-center">
            <Link to="/shopping-cart">
              <LuShoppingBag size={20} />
            </Link>
          </div>
          <div className="pl-4 content-center">
            <Link to="/">
              <FaRegUser size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 min-h-screen">{children}</div>
      <footer className=" bg-white flex justify-center border-t shadow-neutral-950 py-4 px-10 mt-20">
        Footer
      </footer>
    </header>
  );
}

export default Layout;
