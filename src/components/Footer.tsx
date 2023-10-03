const Footer = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className="bg-primary mt-60 sm:mt-20 py-12">
      <div className="container mx-auto">
        <p className="text-white text-center">
          Copyright &copy; e-commerce shop {year}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
