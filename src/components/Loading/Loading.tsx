import HashLoader from "react-spinners/HashLoader";

type LoadingProps = {
  loading?:boolean
};

const Loading = ({loading}:LoadingProps) => {
  return (
    <div className="absolute bg-background/80 z-[100] h-full w-full flex justify-center items-center">
      <HashLoader
        color={"#E11D48"}
        loading={loading || true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;