import { MagnifyingGlass } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <MagnifyingGlass
        visible={true}
        height="550"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#00efff"
        color="#007752"
      />
    </div>
  );
}

export default Spinner;
