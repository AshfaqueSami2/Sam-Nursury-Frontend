// src/components/Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { incrementQuantity, decrementQuantity, removeItem } from '../../redux/slice/cart.slice';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);
  const dispatch = useDispatch();

  const handleIncrement = (index: number) => {
    if (cartItems[index].quantity < cartItems[index].stock) {
      dispatch(incrementQuantity(index));
    } else {
      alert('Quantity exceeds available stock');
    }
  };

  const handleDecrement = (index: number) => {
    if (cartItems[index].quantity > 1) {
      dispatch(decrementQuantity(index));
    }
  };

  const handleRemove = (index: number) => {
    dispatch(removeItem(index));
  };

  return (
    <div className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 style={{marginTop:'35px'}} className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center mb-8">
          <span className="mr-2">&#128722;</span> Shopping Cart
        </h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="w-full lg:w-3/4">
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  {cartItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        No Cart added Yet
                      </td>
                    </tr>
                  ) : (
                    cartItems.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                        <td className="px-6 py-4">
                          <img src={item.image} alt={item.name} className="w-20 h-20" />
                        </td>
                        <td className="px-6 py-4">
                          <h2 className="text-gray-900 dark:text-white">{item.title}</h2>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900 dark:text-white">{item.brand}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              className="px-2 py-1 text-sm font-semibold text-white bg-red-600 rounded"
                              onClick={() => handleDecrement(index)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                              className="w-10 text-center border rounded"
                            />
                            <button
                              type="button"
                              className="px-2 py-1 text-sm font-semibold text-white bg-green-600 rounded"
                              onClick={() => handleIncrement(index)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleRemove(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full lg:w-1/4 mt-8 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Order Summary</h3>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-gray-900 dark:text-white">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-900 dark:text-white">
                  <span>Shipping</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between text-gray-900 dark:text-white">
                  <span>Tax</span>
                  <span>$0</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${subtotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="flex justify-end mt-8">
            <Link to="/checkout">
              <button
                type="button"
                className="px-4 py-2 text-white bg-[#629BA2] rounded-md shadow-sm hover:bg-[#004E64] "
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
