import React, { useContext } from 'react';
import { useParams } from "react-router-dom";
import { ProductContext } from '../context/Products';
//import happy icon
import { IoMdHappy } from "react-icons/io";
import { PiMaskHappyLight } from "react-icons/pi";

import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext';


export default function Finalpage() {
    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const product = products.find(item => item.id === Number(id));

    const { itemAmount } = useContext(CartContext);

    const navigate = useNavigate();

    const totalPrice = product.price ;
    const discount = (totalPrice * product.discountPercentage) / 100;
    const finalAmount = totalPrice - discount;
    return (
      <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
          <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">

              {/* 🎉 Heading */}
              <h2 className="text-4xl font-bold text-center flex justify-center items-center gap-2">
                  <PiMaskHappyLight />
                  <IoMdHappy />
                  Congratulations
                  <IoMdHappy />
                  <PiMaskHappyLight />
              </h2>

              <p className="text-center text-gray-500 mt-2">
                  Your order has been placed successfully 🎉
              </p>

              {/* 📦 Product Info */}
              <div className="mt-8 space-y-3">
                  <p className="text-lg">
                      <span className="font-semibold">Product:</span> {product.title}
                  </p>

                  <p>
                      <span className="font-semibold">Brand:</span> {product.brand}
                  </p>

                  <p>
                      <span className="font-semibold">Quantity:</span> {itemAmount + 1}
                  </p>
              </div>

              {/* 💰 Price Details */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>Total Price: ₹{totalPrice}</p>
                  <p className="text-green-600">
                      Discount ({product.discountPercentage}%): −₹{discount.toFixed(2)}
                  </p>
                  <p className="text-xl font-bold">
                      Final Amount: ₹{finalAmount.toFixed(2)}
                  </p>
              </div>

              {/* 🔥 Offer Message */}
              <p className="text-center text-green-700 font-medium mt-4">
                  🎁 You saved ₹{discount.toFixed(2)} on this order!
              </p>

              {/* 🔙 Back to Home */}
              <div className="flex justify-center mt-8">
                  <button
                      onClick={() => navigate("/")}
                      className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
                  >
                      Back to Home
                  </button>
              </div>

          </div>
         
      </div>
       <footer className="bg-slate-800 text-white w-full h-24 py-5 flex justify-center items-center">
              <h2 className="text-center font-semibold ">&copy; All rights are resorverd in this site 2025</h2>
          </footer>
      </>
  )
}
