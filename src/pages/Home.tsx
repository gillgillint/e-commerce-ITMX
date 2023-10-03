import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Product from "../components/Product";
import Hero from "../components/Hero";

const Home = () => {
  const { products } = useSelector((state: RootState) => state.products);

  return (
    <div>
      <Hero />
      <section className="sm:px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => {
              return <Product isAdmin={false} item={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
