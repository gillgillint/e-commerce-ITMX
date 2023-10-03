import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/feature/cartSlice";
import { deleteProduct } from "../redux/feature/ProductsSlice";
import ModalProduct from "./ModalProduct";

interface ProductProps {
  item: {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };
  isAdmin: boolean;
}

const Product: React.FC<ProductProps> = ({ item, isAdmin }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { id, title, price, category, image } = item;

  return (
    <div className="relative h-[488px]">
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt={title}
            />
          </div>
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 flex flex-col items-center justify-center gap-y-2 p-2 opacity-0 group-hover:opacity-100 transition-all">
          <button onClick={() => dispatch(addToCart({ ...item, amount: 1 }))}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            to={`/product/${id}`}
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>
        <div className="font-semibold">$ {price}</div>
      </div>
      {isAdmin ? (
        <div className="-bottom-2 absolute flex justify-between w-full">
          <button
            className="flex border  py-2 pr-5 justify-center items-center text-primary "
            onClick={() => setShowModal(true)}
          >
            <MdEdit className="text-2xl mr-3" />
            <span className="font-semibold">Edit</span>
          </button>
          <button
            className="flex border text-red-500  pr-5 justify-center items-center"
            onClick={() => {
              dispatch(deleteProduct(item.id));
              dispatch(removeFromCart(item.id));
            }}
          >
            <MdDelete className="text-2xl mr-3" />
            <span className="font-semibol">Delete</span>
          </button> 
        </div>
      ) : null}

      {showModal ? (
        <ModalProduct item={item} setModal={setShowModal} />
      ) : null}
    </div>
  );
};

export default Product;
