import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="flex text-3xl">
        <ClipLoader
          color={"#00C951"}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loading;
