// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addItemToCart } from "../../redux/slice/cart.slice"; // Adjust the import path as needed
// import { Link } from "react-router-dom";
// import { useSetPaginationQuery } from "../../redux/api/api"; // Adjust the import path as needed
// import { FaShoppingCart, FaStar } from "react-icons/fa"; // Importing icons from react-icons
// import Treeicon from "../../assets/img/image/tree_4933711.png";

// interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   image: string;
// }

// const Tree = () => {
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const dispatch = useDispatch();
//   const limit = 10;

//   // Fetch all data with a high limit
//   const { data, isError, isLoading } = useSetPaginationQuery({
//     page: 1,
//     limit: 1000, // Large number to fetch all data
//   });

//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     if (data?.data) {
//       setAllProducts(data.data);
//     }
//   }, [data]);

//   useEffect(() => {
//     const filtered = allProducts.filter(
//       (product: Product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         product.price <= maxPrice
//     );
//     setFilteredProducts(filtered);
//   }, [allProducts, searchTerm, maxPrice]);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading data</div>;

//   const totalProducts = filteredProducts.length;
//   const totalPages = Math.ceil(totalProducts / limit);

//   const handleAddToCart = (product: Product) => {
//     dispatch(addItemToCart(product));
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setMaxPrice(Number(e.target.value));
//   };

//   // Get products for the current page
//   const paginatedProducts = filteredProducts.slice(
//     (page - 1) * limit,
//     page * limit
//   );

//   return (
//     <div style={{ marginTop: "120px" }} className="container mx-auto p-4">
//       <div className="flex">
//         <img style={{ height: "53px" }} src={Treeicon} alt="" />
//         <h1
//           style={{ marginTop: "15px" }}
//           className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-50"
//         >
//           Our Trees
//         </h1>
//       </div>

//       <div className="flex justify-center mb-6">
//         <div
//           style={{ height: "300px", backgroundColor: 'whitesmoke' }}
//           className="w-1/4 p-6 bg-white rounded-lg shadow-lg mr-6"
//         >
//           <div className="mb-6">
//             <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-50">
//               Filters
//             </h2>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={handleSearch}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 dark:text-gray-300 mb-2">
//               Filter by price range
//             </label>
//             <input
//               type="range"
//               min="0"
//               max="1000"
//               value={maxPrice}
//               onChange={handlePriceChange}
//               className="w-full"
//             />
//             <div className="text-center text-gray-700 dark:text-gray-300 mt-2">
//               Selected max price: ${maxPrice}
//             </div>
//           </div>
//         </div>
//         <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
//           {paginatedProducts.map((product) => (
//             <div
//               className="max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 transition-transform transform hover:scale-105"
//               key={product._id}
//             >
//               <img
//                 className="object-cover h-48 w-full"
//                 src={product.image}
//                 alt={product.title}
//               />
//               <div className="p-4">
//                 <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
//                   {product.title}
//                 </h2>
//                 <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
//                   {product.description}
//                 </p>
//                 <div className="mt-4">
//                   <span className="text-lg font-bold text-gray-800 dark:text-gray-50">
//                     ${product.price}
//                   </span>
//                 </div>
//                 <div className="mt-4 flex items-center">
//                   <span className="text-yellow-500 flex items-center">
//                     {Array(5)
//                       .fill("")
//                       .map((_, index) => (
//                         <FaStar key={index} />
//                       ))}
//                   </span>
//                 </div>
//                 <div className="mt-4 flex justify-between items-center">
//                   <Link
//                     to={`/product/${product._id}`}
//                     style={{ textAlign: "center", width: "110px" }}
//                     className="px-4 py-2 bg-[#DCDCDC] text-white rounded-lg hover:bg-[#c9c9c9] text-sm transition duration-300"
//                   >
//                     Details
//                   </Link>
//                   <button
//                     className="p-2 bg-[#DCDCDC] text-white rounded-full hover:bg-[#c9c9c9] transition duration-300"
//                     onClick={() => handleAddToCart(product)}
//                   >
//                     <FaShoppingCart />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex justify-center mt-6">
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 mx-1 border rounded ${
//               index + 1 === page
//                 ? "bg-blue-500 text-white"
//                 : "bg-white text-black"
//             }`}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tree;


import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/slice/cart.slice"; // Adjust the import path as needed
import { Link } from "react-router-dom";
import { useSetPaginationQuery } from "../../redux/api/api"; // Adjust the import path as needed
import { FaShoppingCart, FaStar } from "react-icons/fa"; // Importing icons from react-icons
import Treeicon from "../../assets/img/image/tree_4933711.png";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  brand: string; // Add brand
  name: string;  // Add name
  stock: number; // Add stock
}

interface CartItem {
  brand: string;
  title: string;
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

const Tree = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const dispatch = useDispatch();
  const limit = 10;

  // Fetch all data with a high limit
  const { data, isError, isLoading } = useSetPaginationQuery({
    page: 1,
    limit: 1000, // Large number to fetch all data
  });

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data?.data) {
      setAllProducts(data.data);
    }
  }, [data]);

  useEffect(() => {
    const filtered = allProducts.filter(
      (product: Product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  }, [allProducts, searchTerm, maxPrice]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1, // Initial quantity
    };
    dispatch(addItemToCart(cartItem));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value));
  };

  // Get products for the current page
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );
  return (
    <div style={{ marginTop: "120px" }} className="container mx-auto p-4">
      <div className="flex">
        <img style={{ height: "53px" }} src={Treeicon} alt="" />
        <h1
          style={{ marginTop: "15px" }}
          className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-50"
        >
          Our Trees
        </h1>
      </div>

      <div className="flex justify-center mb-6">
        <div
          style={{ height: "300px", backgroundColor: 'whitesmoke' }}
          className="w-1/4 p-6 bg-white rounded-lg shadow-lg mr-6"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-50">
              Filters
            </h2>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Filter by price range
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={handlePriceChange}
              className="w-full"
            />
            <div className="text-center text-gray-700 dark:text-gray-300 mt-2">
              Selected max price: ${maxPrice}
            </div>
          </div>
        </div>
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {paginatedProducts.map((product) => (
            <div
              className="max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 transition-transform transform hover:scale-105"
              key={product._id}
            >
              <img
                className="object-cover h-48 w-full"
                src={product.image}
                alt={product.title}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
                  {product.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  {product.description}
                </p>
                <div className="mt-4">
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-50">
                    ${product.price}
                  </span>
                </div>
                <div className="mt-4 flex items-center">
                  <span className="text-yellow-500 flex items-center">
                    {Array(5)
                      .fill("")
                      .map((_, index) => (
                        <FaStar key={index} />
                      ))}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/product/${product._id}`}
                    style={{ textAlign: "center", width: "110px" }}
                    className="px-4 py-2 bg-[#DCDCDC] text-white rounded-lg hover:bg-[#c9c9c9] text-sm transition duration-300"
                  >
                    Details
                  </Link>
                  <button
                    className="p-2 bg-[#DCDCDC] text-white rounded-full hover:bg-[#c9c9c9] transition duration-300"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 border rounded ${
              index + 1 === page
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tree;
