import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners"; // Import the spinner
import { RootState } from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./components/layout/MainLayout";

const App: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        event.preventDefault();
        // This is required for Chrome to show the warning
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout to match your data fetching duration

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#36d7b7" /> {/* Customize the spinner as needed */}
      </div>
    );
  }

  return <MainLayout></MainLayout>;
};

export default App;
