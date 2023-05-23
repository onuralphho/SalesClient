import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-[#ffffff10] gap-2 flex items-end  backdrop-blur-sm  p-2 rounded-md border-[1px] border-[#dbdbdb49]">
      <Link to={"/"}>
        <h1 className="text-3xl md:text-5xl border-r pr-4">Colin's</h1>
      </Link>
      <ul className="flex lg:gap-1  lg:text-xl  h-full items-end">
        <li >
          <Link
            to={"/products"}
            className="hover:bg-[#ffffff13] px-2 transition-all rounded-md "
          >
            Products
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
