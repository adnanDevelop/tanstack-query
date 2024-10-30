import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="w-[900px] h-[50px] mx-auto rounded-full bg-[#182232] text-white flex items-center justify-center gap-4 fixed top-4 left-1/2 -translate-x-1/2 border-b-2 border-b-green-500">
      <Link to="/">Home</Link>
      <Link to="/fetchData">FetchOldMethod</Link>
      <Link to="/fetchRq ">FetchRQ</Link>
    </div>
  );
}
