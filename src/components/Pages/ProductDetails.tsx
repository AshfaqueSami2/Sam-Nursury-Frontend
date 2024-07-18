import  { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/api/api"; // Adjust the import path as needed
import { useAppDispatch } from "../../redux/hook";
import { addItemToCart } from "../../redux/slice/cart.slice";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, isError, isLoading } = useGetProductQuery(productId);
  const dispatch = useAppDispatch();

  const [rotate, setRotate] = useState(false);
  // const [count, setCount] = useState(0);

  // const addCount = () => {
  //   setCount((prev) => prev + 1);
  // };

  // const minusCount = () => {
  //   if (count > 0) {
  //     setCount((prev) => prev - 1);
  //   }
  // };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const product = data?.data;

  const handleAddToCart = (product: any) => {
    dispatch(addItemToCart(product));
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div
        style={{ marginTop: "130px" }}
        className="flex justify-center items-center lg:flex-row flex-col gap-8"
      >
        {/* Description Div */}
        <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
          <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600">
            Home / Furniture / {product.title}
          </p>
          <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
            {product.title}
          </h2>

          <div className="flex flex-row justify-between mt-5">
            <div className="flex flex-row space-x-3"></div>
            <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">
              22 reviews
            </p>
          </div>

          <p className="font-normal text-base leading-6 text-gray-600 mt-7">
            {product.description}
          </p>
          <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6">
            ${product.price}
          </p>

          <div className="lg:mt-11 mt-10">
            <hr className="bg-gray-200 w-full my-2" />
            <div className="flex flex-row justify-between items-center mt-4">
              <p className="font-medium text-base leading-4 text-gray-600">
                Dimensions
              </p>
              <svg
                onClick={() => setRotate(!rotate)}
                id="rotateSVG"
                className={
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer transform " +
                  (rotate ? "rotate-180" : "rotate-0")
                }
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1L5 5L1 1"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <hr className="bg-gray-200 w-full mt-4" />
          </div>

          <button
            onClick={() => handleAddToCart(product)}
            className="focus:outline-none focus:ring-2 hover:bg-[#629BA2] focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-[#004E64] w-full py-5 lg:mt-12 mt-6"
          >
            Add to Cart
          </button>
        </div>

        {/* Preview Images Div For larger Screen*/}
        <div className="w-full sm:w-96 md:w-8/12 lg:w-6/12 flex lg:flex-row flex-col lg:gap-8 sm:gap-6 gap-4">
          <div className="w-full lg:w-8/12  flex justify-center items-center">
            <img
              src={product.image}
              alt={`${product.title} Preview`}
              className="object-cover"
            />
          </div>
          <div className="w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
            {/* Example images - replace with actual images */}
            <div className=" flex justify-center items-center py-4">
              <img src={product.image} alt={`${product.title} - preview 1`} />
            </div>
            <div className="flex justify-center items-center py-4">
              <img src={product.image} alt={`${product.title} - preview 2`} />
            </div>
            <div className=" flex justify-center items-center py-4">
              <img src={product.image} alt={`${product.title} - preview 3`} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="w-full sm:w-96 md:w-8/12 lg:w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-28 sm:gap-x-6 sm:gap-y-12 gap-y-12 sm:mt-14 mt-10">
          <div>
            <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">
              Great for Nature
            </p>
            <p className="text-normal text-base leading-6 text-gray-600 mt-4">
              Here are all the great cocktail recipes you should know how to
              make, from the margarita to the whiskey sour. Cheers!
            </p>
          </div>
          <div>
            <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">
              Durable hardware
            </p>
            <p className="text-normal text-base leading-6 text-gray-600 mt-4">
              Product durability is a key aspect of achieving a circular
              economy. ... Moreover, enhancing the durability of individual
              hardware components.
            </p>
          </div>
          <div>
            <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">
              Eco-friendly
            </p>
            <p className="text-normal text-base leading-6 text-gray-600 mt-4">
              They re-use, recycle and reduce waste disposal in their lives.
              They conserve energy and natural resources.
            </p>
          </div>
          <div>
            <p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">
              Minimal Design
            </p>
            <p className="text-normal text-base leading-6 text-gray-600 mt-4">
              Minimalist interior design is very similar to modern interior
              design and involves using the bare essentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
