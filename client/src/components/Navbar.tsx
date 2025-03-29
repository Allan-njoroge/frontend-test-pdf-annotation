import Image from "next/image";
import Logo from "@/../public/ritease_logo.png";

const Navbar = () => {
  return (
    <nav className="bg-primary w-full">
      <div className="max-w-[1440px] flex items-center p-3 justify-start mx-auto">
        <h1 className="text-4xl font-semibold text-background">PDF Editor</h1>
      </div>
    </nav>
  );
};

export default Navbar;
