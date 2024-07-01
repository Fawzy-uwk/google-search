import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t-2 border-t-slate-300 flex items-center gap-2 dark:bg-slate-950 dark:border-t-slate-800 py-2  dark:text-white justify-center md:py-0 md:pt-4">
      <FaCopyright className="text-[#002e76] dark:text-white" size={25} />
      <p className="text-xl text-blue-900 dark:text-white">Google INC 2024</p>
    </footer>
  );
};

export default Footer;
