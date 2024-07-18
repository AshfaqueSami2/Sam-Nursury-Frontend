import React, { useState } from "react";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useSetPaginationQuery,
} from "../../redux/api/api";
import { Button } from "../ui/button";
import { Table, TableHeader, TableRow, TableCell } from "../ui/table";

const ProductManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data,  refetch } = useSetPaginationQuery({
    page,
    limit: 10,
  });
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    brand: "",
    category: "",
    title: "",
    description: "",
    rating: 0,
    image: "",
    stock: 0,
  });
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToUpdate, setProductToUpdate] = useState<any>({
    name: "",
    price: 0,
    brand: "",
    title: "",
    description: "",
    rating: 0,
    image: "",
    stock: 0,
    category: "",
  });

  const categories = [
    "Deciduous Trees",
    "Evergreen Trees",
    "Joshua tree",
    "Macadamia nut tree",
    "Mozambique",
    "Banyan tree",
  ];

  const handleShowAddDialog = () => setShowAddDialog(true);
  const handleCloseAddDialog = () => setShowAddDialog(false);

  const handleShowDeleteDialog = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => setShowDeleteDialog(false);

  const handleShowUpdateDialog = (product: any) => {
    setProductToUpdate({
      ...product,
      category: product.category || categories[0], // Default to the first category if none is set
    });
    setShowUpdateDialog(true);
  };
  const handleCloseUpdateDialog = () => setShowUpdateDialog(false);

  const handleAddProduct = async () => {
    try {
      await addProduct(newProduct).unwrap();
      handleCloseAddDialog();
      refetch(); // Refetch products after adding
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if (productToDelete) {
        await deleteProduct(productToDelete).unwrap();
        handleCloseDeleteDialog();
        refetch(); // Refetch products after deleting
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct(productToUpdate).unwrap();
      handleCloseUpdateDialog();
      refetch(); // Refetch products after updating
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading products</div>;

  const products = data?.data || [];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        style={{ marginTop: '80px' }}
        className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg"
      >
        <div className="flex justify-between mb-6">
          <Button onClick={handleShowAddDialog}>Add Product</Button>
        </div>
        {showAddDialog && (
          <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl mb-4">Add New Product</h2>
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Brand"
                value={newProduct.brand}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, brand: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Title"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <textarea
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              ></textarea>
              <input
                type="number"
                placeholder="Rating"
                value={newProduct.rating}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    rating: parseFloat(e.target.value),
                  })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: parseFloat(e.target.value),
                  })
                }
                className="mb-2 p-2 border border-gray-300 rounded w-full"
                required
              />
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={handleCloseAddDialog}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Add</Button>
              </div>
            </div>
          </div>
        )}

        {showDeleteDialog && (
          <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl mb-4">Delete Product</h2>
              <p>Are you sure you want to delete this product?</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="secondary" onClick={handleCloseDeleteDialog}>
                  Cancel
                </Button>
                <Button style={{backgroundColor:'crimson'}} onClick={handleDeleteProduct}>Delete</Button>
              </div>
            </div>
          </div>
        )}

        {showUpdateDialog && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Update Product</h2>
                <p className="text-gray-500">
                  Enter product details below and click save to update the
                  product.
                </p>
              </div>
              <form>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    value={productToUpdate.category}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        category: e.target.value,
                      })
                    }
                    className="border rounded w-full p-2"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={productToUpdate.name}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        name: e.target.value,
                      })
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={productToUpdate.price}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="brand" className="block text-gray-700">
                    Brand
                  </label>
                  <input
                    id="brand"
                    type="text"
                    value={productToUpdate.brand}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        brand: e.target.value,
                      })
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={productToUpdate.title}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        title: e.target.value,
                      })
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={productToUpdate.description}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        description: e.target.value,
                      })
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="rating" className="block text-gray-700">
                    Rating
                  </label>
                  <input
                    id="rating"
                    type="number"
                    value={productToUpdate.rating}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        rating: parseFloat(e.target.value),
                      })
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700">
                    Image URL
                  </label>
                  <input
                    id="image"
                    type="text"
                    value={productToUpdate.image}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        image: e.target.value,
                      })
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="stock" className="block text-gray-700">
                    Stock
                  </label>
                  <input
                    id="stock"
                    type="number"
                    value={productToUpdate.stock}
                    onChange={(e) =>
                      setProductToUpdate({
                        ...productToUpdate,
                        stock: parseFloat(e.target.value),
                      })
                    }
                    className="border rounded w-full p-2"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={handleCloseUpdateDialog}>
                    Cancel
                  </Button>
                  <Button style={{backgroundColor:'green'}} onClick={handleUpdateProduct}>Save</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <div style={{ marginLeft: "66px" }}>
                <TableCell>Actions</TableCell>
              </div>
            </TableRow>
          </TableHeader>
          {products.map((product: any) => (
            <TableRow key={product._id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <Button
                  style={{ backgroundColor: "orange" }}
                  onClick={() => handleShowUpdateDialog(product)}
                >
                  Update
                </Button>
                <span className="mx-2"></span> {/* Add space between buttons */}
                <Button
                  style={{ backgroundColor: "crimson" }}
                  onClick={() => handleShowDeleteDialog(product._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
        <div className="flex justify-between mt-4">
          <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
            Previous
          </Button>
          <span>Page {page}</span>
          <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
