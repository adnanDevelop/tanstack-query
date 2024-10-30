import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-[900px] h-[50px] mx-auto rounded-full bg-black text-white flex items-center justify-center gap-4">
      <Link to="/">Home</Link>
      <Link to="/fetchData">Fetch Data</Link>
    </div>
  );
};

export default Footer;
