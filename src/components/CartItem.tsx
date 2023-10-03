import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import {
  removeFromCart,
  addToCart,
  decreaseAmount,
} from "../redux/feature/cartSlice";
import { useDispatch } from "react-redux";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    amount: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { id, image, price, amount, title } = item;
  const dispatch = useDispatch();

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4 ">
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt={title} />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
              to={`/product/${id}`}
            >
              {title}
            </Link>
            <button
              onClick={() => dispatch(removeFromCart(id))}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </button>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border font-medium text-primary ">
              <button
                onClick={() => dispatch(decreaseAmount(id))}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdRemove />
              </button>
              <span className="h-full flex justify-center items-center px-2">
                {amount}
              </span>
              <button
                onClick={() => dispatch(addToCart({ ...item, amount: 1 }))}
                className="flex-1 h-full flex justify-center items-center cursor-pointer"
              >
                <IoMdAdd />
              </button>
            </div>

            <span className="flex flex-1 items-center justify-around">
              $ {price}
            </span>
            <div className="flex-1 flex justify-end items-center text-primary font-medium">{`$ ${(
              price * amount
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
