import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../redux/feature/sideBarSlice";
import { BsBag, BsArchive } from "react-icons/bs";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import Logo from "../assets/img/logo.svg";
import { useEffect, useState } from "react";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const { totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 px-4 md:px-6 transition-all`}
    >
      <div className="flex container mx-auto items-center justify-between h-full">
        <Link className="mr-auto" to={`/`}>
          <div>
            <img className="w-[40px]" src={Logo} alt="logo" />
          </div>
        </Link>
        <Link to='/manage'>
          <BsArchive className="text-2xl mr-6" />
        </Link>
        <div
          className="cursor-pointer flex relative"
          onClick={() => dispatch(toggleSidebar())}
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {totalAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
