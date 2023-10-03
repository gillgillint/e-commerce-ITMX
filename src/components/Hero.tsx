import womanImg from "../assets/img/woman_hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-pink-200 h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24">
      <div className="container mx-auto flex h-full justify-around">
        <div className="flex flex-col justify-center">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] bg-red-400 mr-3"></div>New Trend
          </div>
          <h1 className="text-[70px] leading-[1.1] font-light mb-4">
            AUTUMN SALE STYLISH <br />
            <span className="font-semibold">WOMEN</span>
          </h1>
          <Link className="self-start uppercase font-semibold border-b-2 border-primary" to={'/'}>
            Discover More
          </Link>
        </div>
        <div className="hidden lg:block">
          <img src={womanImg} alt="women" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
