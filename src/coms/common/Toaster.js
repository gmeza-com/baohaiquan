import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const tailwindcss = {
  success: "bg-white dark:bg-black",
  error: "bg-rose-50 dark:bg-boxdark",
  info: "dark:bg-gray-900 bg-white",
  warning: "bg-orange-400",
  default: "dark:bg-gray-900 bg-white",
  dark: "bg-white-600 font-gray-300",
};

const Toaster = () => (
  <ToastContainer
    toastClassName={(context) =>
      tailwindcss[context?.type || "default"] +
      " relative flex p-1 leading-5 min-h-10 rounded-md mt-4 border border-stroke dark:border-strokedark justify-between overflow-hidden cursor-pointer shadow-default"
    }
    bodyClassName={() => "text-md text-black dark:text-white flex p-3"}
    position="bottom-center"
  />
);

export default Toaster;
