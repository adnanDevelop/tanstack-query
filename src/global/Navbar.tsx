import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-[900px] h-[50px] mt-[20px] mx-auto rounded-full bg-[#182232] text-white flex items-center justify-center gap-4">
      <Link to="/">Home</Link>
      <Link to="/fetchData">Fetch Data</Link>
      <Link to="/fetchRq "> Fetch RQ</Link>
    </div>
  );
}
