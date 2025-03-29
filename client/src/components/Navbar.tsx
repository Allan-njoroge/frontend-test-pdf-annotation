import Image from "next/image";
import Logo from "@/../public/ritease_logo.png";

const Navbar = () => {
  return (
    <nav className="bg-primary w-full">
      <div className="max-w-[1440px] flex items-center p-3 justify-start mx-auto">
        <Image
          src={Logo}
          alt="Ritease Logo Image"
          className="w-[100px] md:w-[150px] lg:w-[200px]"
        />
      </div>
    </nav>
  );
};

export default Navbar;
