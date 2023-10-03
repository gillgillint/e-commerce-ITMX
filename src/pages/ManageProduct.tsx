import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Product from "../components/Product";
import ModalProduct from "../components/ModalProduct";

const ManageProduct = () => {
  const { products } = useSelector((state: RootState) => state.products);
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <section className="sm:px-4  mt-36">
      <div className="container p-4 mx-auto">
        <div className="flex justify-between">
          <span className="font-bold text-2xl">Products</span>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white p-3 rounded-md flex justify-center items-center"
          >
            <BsPlusLg className="mr-3" /> Create new
          </button>
        </div>
        <div className="grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
          {products.map((product) => {
            return <Product isAdmin={true} item={product} key={product.id} />;
          })}
        </div>
      </div>
      {showModal ? (
        <ModalProduct
          item={undefined}
          setModal={setShowModal}
        />
      ) : null}
    </section>
  );
};

export default ManageProduct;
