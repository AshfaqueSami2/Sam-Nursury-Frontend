


import { Link, useParams } from "react-router-dom";
import { useGetProductsByCategoryQuery } from "../../redux/api/api"; // Adjust the import path as needed
import { useAppDispatch } from "../../redux/hook";
import { addItemToCart } from "../../redux/slice/cart.slice";
import { FaShoppingCart } from "react-icons/fa"; // Make sure to install react-icons
import { useState } from "react";

const HomeCategoryProducts = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [page, setPage] = useState(1);
  const limit = 10; // Number of products per page

  const { data, isError, isLoading } = useGetProductsByCategoryQuery({
    categoryName,
    page,
    limit,
  });
  const dispatch = useAppDispatch();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const products = data?.data;

  const handleAddToCart = (product: any) => {
    dispatch(addItemToCart(product));
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (data?.total > page * limit) setPage(page + 1);
  };

  return (
    <div
      style={{ marginTop: "140px" }}
      className="container mx-auto px-4 lg:px-12 py-4"
    >
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-50">
        Products in {categoryName}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {products &&
          products.map((product: any) => (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              key={product.id}
            >
              <div>
                <img
                  className="object-cover h-48 w-full"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="flex flex-col gap-2 mt-4 px-4 pb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  {product.title}
                </h2>
                <p className="text-gray-700 text-sm dark:text-gray-300">
                  {product.description}
                </p>
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-50">
                  ${product.price}
                </span>
                <div className="mt-2 flex justify-between items-center">
                  <Link to={`/product/${product._id}`}>
                    <button className="product-btn-design shadow-md hover:bg-[#e0e0e0] text-white font-bold py-1 px-3 rounded-full transition duration-300">
                      Details
                    </button>
                  </Link>
                  <button
                    className="text-gray-800 dark:text-gray-50 hover:text-green-500 dark:hover:text-green-400 transition duration-300 ml-4"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart style={{ color: "darkgray" }} className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="mx-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="mx-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={data?.total <= page * limit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomeCategoryProducts;
