import {Link} from "react-router-dom";


const NotFoundPage = () => {
    return (
        <>
            <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
                <h1 className="text-red-500 text-3xl md:text-4xl lg:text-5xl">404 Page Not Found!</h1>
                <Link to="/" className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-700 duration-300 ">Go To Home</Link>
            </div>
        </>
    );
};

export default NotFoundPage;