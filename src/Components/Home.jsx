
import google from "../assets/google.svg";
import Search from "./Search";
const Home = () => {
  return (
    <div className="flex items-center justify-center h-[85dvh] md:w-[full] ">
      <div className="flex items-center justify-center flex-col gap-4 ">
        <img src={google} />
        <Search />
      </div>
    </div>
  );
};

export default Home;
