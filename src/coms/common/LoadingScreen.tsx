import Spinner from "@/coms/common/Spinner";

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen flex gap-3 items-center justify-center">
      <Spinner size={18} />
      loading...
    </div>
  );
};

export default LoadingScreen;
