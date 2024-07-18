import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store'; // Adjust the import path as needed
import { useCreateOrderMutation } from '../../redux/api/api'; // Adjust the import path as needed
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slice/cart.slice'; // Import the clearCart action

const CheckOut = () => {
  const [dropdown1, setDropdown1] = useState(false);
  const [changeText1, setChangeText1] = useState('City');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');

  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleText1 = (e: string) => {
    setChangeText1(e);
    setDropdown1(false);
  };

  // Access totalItems and subtotal from the Redux state
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);
  const subtotal = useSelector((state: RootState) => state.cart.subtotal);

  const handleProceedToPayment = async () => {
    if (!firstName || !lastName || !address || !changeText1 || !phone) {
      toast.error('Please fill out all required fields');
      return;
    }

    const orderData = {
      customerName: `${firstName} ${lastName}`,
      phone: phone,
      customerAddress: `${address}, ${addressLine2}`,
      products: cartItems.map(item => ({ productId: item._id, quantity: item.quantity })),
      paymentMethod: paymentMethod,
      status: 'Pending',
      isDeleted: false,
    };

    try {
      await createOrder(orderData).unwrap();
      toast.success('Order created successfully!');
      dispatch(clearCart()); // Clear the cart
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Failed to create order:', error);
      toast.error('Failed to create order');
    }
  };

  return (
    <div className="overflow-y-hidden">
      <ToastContainer />
      <div style={{marginTop:'50px'}} className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
        <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
          <div className="flex w-full flex-col justify-start items-start">
            <div>
              <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Check out</p>
            </div>
            <div className="mt-2">
              <Link to='/cart' className="text-base leading-4 underline hover:text-gray-800 text-gray-600">
                Back to my cart
              </Link>
            </div>
            <div className="mt-12">
              <p className="text-xl font-semibold leading-5 text-gray-800">Shipping Details</p>
            </div>
            <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
              <input
                className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                type="text"
                placeholder="Address (line 02)"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
              <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                <div className="relative w-full">
                  <p id="button1" className="px-2 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full">
                    {changeText1}
                  </p>
                  <button onClick={() => setDropdown1(!dropdown1)} className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full cursor-pointer absolute bottom-4 right-0">
                    <svg id="close" className={`transform ${dropdown1 ? 'rotate-180' : ''}`} width={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6L8 10L4 6" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className={`shadow absolute z-10 bg-white top-10 w-full mt-3 ${dropdown1 ? '' : 'hidden'}`}>
                    <div className="flex flex-col w-full">
                      <p tabIndex={0} onClick={() => HandleText1('Chattogram')} className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 py-2 w-full">
                        Chattogram
                      </p>
                      <p tabIndex={0} onClick={() => HandleText1('Dhaka')} className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 py-2 w-full">
                        Dhaka
                      </p>
                      <p tabIndex={0} onClick={() => HandleText1('Khulna')} className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white text-left text-base text-gray-600 py-2 w-full">
                        Khulna
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  className="px-2 focus:outline-none focus:ring-2 focus:ring-gray-500 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full"
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end w-full space-y-6">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-100 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Order Summary</h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between w-full">
                    <p className="text-base leading-4 text-gray-800">{item.title}</p>
                    <p className="text-base leading-4 text-gray-600">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base leading-4 text-gray-800">Total Items</p>
                <p className="text-base leading-4 text-gray-600">{totalItems}</p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base leading-4 text-gray-800">Subtotal</p>
                <p className="text-base leading-4 text-gray-600">${subtotal}</p>
              </div>
            </div>

            {/* Payment Information Section */}
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-100 space-y-6">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">Payment Information</h3>
              <div className="flex flex-col space-y-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash On Delivery"
                    checked={paymentMethod === 'Cash On Delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio h-4 w-4 text-gray-600"
                  />
                  <span className="ml-2 text-gray-800">Cash On Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Stripe"
                    disabled
                    className="form-radio h-4 w-4 text-gray-600"
                  />
                  <span className="ml-2 text-gray-800">Stripe (Not available)</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="text-base leading-4 text-white bg-[#629BA2] border-gray-800 w-full py-4 hover:bg-[#004E64] focus:ring-2  "
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
