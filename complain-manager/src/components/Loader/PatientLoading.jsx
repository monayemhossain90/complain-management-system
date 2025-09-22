

const PatientLoading = () => {
    return (
        <>
            <div className="px-5 py-2">
                <div className="shadow-md p-4 rounded-lg space-y-3 animate-pulse">
                    <div className="bg-gray-300 h-[40px] rounded-md">

                    </div>
                    <div className="bg-gray-300 h-[40px] rounded-md">

                    </div>
                    <div className="bg-gray-300 h-[40px] rounded-md">

                    </div>
                    <div className="bg-gray-300 h-[40px] rounded-md">

                    </div>
                    <div className="bg-gray-300 h-[40px] rounded-md">

                    </div>
                    <div className="bg-gray-300 h-[40px] rounded-md">

                    </div>

                </div>
            </div>

            <div className="px-5 md:px-6 pb-6">
                <form className="p-4 shadow-md rounded-md">
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-300 h-[40px] rounded-md">

                        </div>
                        <div className="bg-gray-300 h-[40px] rounded-md">

                        </div>
                        <div className="bg-gray-300 h-[40px] rounded-md">

                        </div>
                        <div className="bg-gray-300 h-[40px] rounded-md">

                        </div>
                        <div className="bg-gray-300 h-[40px] rounded-md">

                        </div>
                        <div className="bg-gray-300 h-[40px] rounded-md">

                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            className="w-1/2 bg-gray-300 h-[40px] rounded-md">
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PatientLoading;