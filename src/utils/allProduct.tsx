// import { useState, useEffect } from "react";
// import { useSetPaginationQuery } from "../redux/api/api";

// const useFetchAllProducts = () => {
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         let allProducts:any = [];
//         let currentPage = 1;
//         const pageSize = 10; // Adjust based on your API's limit

//         while (true) {
//           const { data } = await useSetPaginationQuery({ page: currentPage, limit: pageSize }).unwrap();
//           if (data && data.data.length > 0) {
//             allProducts = [...allProducts, ...data.data];
//             currentPage++;
//           } else {
//             break;
//           }
//         }
//         setProducts(allProducts);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError(true);
//         setLoading(false);
//       }
//     };
    
//     fetchAllProducts();
//   }, []);

//   return { products, loading, error };
// };

// export default useFetchAllProducts;
