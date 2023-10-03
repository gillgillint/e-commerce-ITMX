import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleSidebar } from "../redux/feature/sideBarSlice";
import { clearCart } from "../redux/feature/cartSlice";

import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";

import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const { items, totalPrice, totalAmount } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  return (
    <aside
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full  bg-white overflow-auto fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <span className="uppercase text-sm font-semibold">
          Shopping Bag ({totalAmount})
        </span>
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="cursor-pointer w-8 h-8 flex"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div>
        {items.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div className=" flex flex-col gap-y-3 py-4 mt-4">
        <div className="flex justify-between items-center">
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {totalPrice.toFixed(2)}
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="py-4 bg-red-500 text-white w-12 h-12 flex items-center justify-center text-xl"
          >
            <FiTrash2 />
          </button>
        </div>
        <Link
          to={`/`}
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
        >
          View cart
        </Link>
        <Link
          className="bg-primary text-white flex p-4 justify-center items-center w-full font-medium"
          to={`/`}
        >
          Checkout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
