import bannerPicutre from "../../assets/img/image/photo-1503435980610-a51f3ddfee50.avif";
import bannerPicutre1 from "../../assets/img/image/photo-1603976328262-4c1b46d7e6e8.avif";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="sm:mx-auto sm:container px-6 xl:px-0">
      <div
        style={{ marginTop: "62px" }}
        className="flex items-center justify-between md:flex-row flex-col py-12 space-y-6 md:space-y-0 w-full"
      >
        <div className="hidden md:block">
          <img
            style={{ borderRadius: "18px" }}
            className="hidden xl:block w-full"
            src={bannerPicutre}
            alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1"
          />
          <img
            style={{ borderRadius: "18px" }}
            className="xl:hidden w-full"
            src={bannerPicutre}
            alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1-1"
          />
        </div>
        <div className="flex justify-center items-center flex-col xl:w-2/5 md:px-6 sm:w-3/4 md:w-2/4">
          <div className="">
            <h1 className="xl:text-4xl text-3xl font-semibold leading-9 text-gray-800">
              Act before it’s too late!
            </h1>
          </div>
          <div className="mt-4">
            <p className="xl:text-xl text-base leading-7 text-center text-gray-600">
              Trees that are majestic and provide ample shade. Experience their
              beauty with a special 50% offer today.
            </p>
          </div>
          <div className="mt-8 flex justify-center items-center w-full">
            <button className="hover:opacity-75 flex justify-center bg-gray-800 sm:w-32 w-full h-10 py-3">
              <Link to="/tree">
                <p className="text-base font-medium leading-none text-white">
                  Explore
                </p>
              </Link>
            </button>
          </div>
        </div>
        <div className="flex md:w-auto w-full justify-center flex-row space-x-4 md:space-x-0">
          <div className="w-full">
            <img
             style={{ borderRadius: "16px" }}
              className="hidden xl:block w-full"
              src={bannerPicutre1}
              alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1"
            />
            <img   style={{ borderRadius: "16px" }} className="xl:hidden w-full" src={bannerPicutre} />
          </div>
          <div className="md:hidden w-full">
            <img
            style={{ borderRadius: "16px" }}
              className="hidden xl:block w-full"
              src={bannerPicutre1}
              alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1"
            />
            <img
            style={{ borderRadius: "18px" }}
              className="xl:hidden w-full"
              src={bannerPicutre1}
              alt="behzad-ghaffarian-nh-Wg-ZNV85-LQ-unsplash-1-1-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
