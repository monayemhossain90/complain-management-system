
const DashboardLoading = () => {
    const loadingArray = [1,2,3,4];

    return (
      <>
        <div className="bg-white p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 rounded-md shadow-md animate-pulse">
          {loadingArray?.map((item, i) => (
            <>
              <div
                key={i}
                className="bg-gray-300 h-[90px]  text-white font-bold py-2 px-4 rounded-md"
              ></div>
            </>
          ))}
        </div>
      </>
    );
};

export default DashboardLoading;