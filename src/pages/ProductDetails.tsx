import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addToCart } from "../redux/feature/cartSlice";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.products);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        product Not Found
      </section>
    );
  }

  const { title, price, description, image } = product;

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[180px] lg:max-w-sm"
              src={image}
              alt={title}
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {title}
            </h1>
            <span className="tet-xl text-red-500 font-medium mb-6">
              $ {price}
            </span>
            <p className="mb-8">{description}</p>
            <button
              onClick={() => dispatch(addToCart({ ...product, amount: 1 }))}
              className="bg-primary py-4 px-8 text-white"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
