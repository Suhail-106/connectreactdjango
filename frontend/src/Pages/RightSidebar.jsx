import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { SidebarContext } from "../context/SidebarContext";
//import icons
import { FiTrash2 } from 'react-icons/fi';
import { IoMdAdd, IoMdClose, IoMdRemove } from 'react-icons/io';

import { AiOutlineArrowRight } from "react-icons/ai";
//import Link
import { Link } from 'react-router-dom';

//import icon of star
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-sm">
      {/* full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-green-500" />
      ))}

      {/* half star */}
      {hasHalfStar && (
        <FaStarHalfAlt className="text-green-500" />
      )}

      {/* empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-gray-300" />
      ))}

      <span className="ml-1 text-gray-500 py-1">
       ratings {rating}/5
      </span>
    </div>
  );
};


const RightCartSidebar = () => {
  const { isOpenRSidebar, isCloseRsidebar } = useContext(SidebarContext);
  const { cart, clearCart, removeFromCart, IncreaseAmount, decreaseAmount, total, itemAmount } = useContext(CartContext);
   
  

  return (
    <div className={`${isOpenRSidebar ? 'right-0' : '-right-full'} z-50 fixed top-0 w-[400px] h-full bg-white shadow-lg transition-all duration-300 px-2`}>
      
      <h2 className="text-xl font-bold p-4 ">My Cart ({itemAmount})
        <span className="float-right flex items-center p-2 hover:bg-slate-200 bg-slate-100
        rounded-full" onClick={() => isCloseRsidebar(!isOpenRSidebar)}><AiOutlineArrowRight /></span></h2>
        
      <hr />
      <div className="h-[450px] w-full  overflow-y-auto overflow-x-hidden ">
        {cart.length === 0 && <div className="p-4 flex flex-wrap w-full h-full items-center justify-center">
          <h2> Please going to  </h2>
            
        <br />
            <Link to={'/'}>
              <button className="w-full p-2 bg-red-100 rounded-md hover:bg-red-200" onClick={()=>isCloseRsidebar(!isOpenRSidebar)}>Shopping</button>
            </Link>
      
           
      
         
        </div>}


          {cart.map(item => (
            <div key={item.id} className="p-2 border-b w-full">
              <div className="flex justify-between w-full">
             
                <div className="w-[120px]  h-[100px] px-2">
                  <Link to={`/product/${item.id}`}>
                  <img src={item.images?.[0]} alt={item.title} className="w-full h-full" />
                  </Link> 
                </div>

                <div className="flex justify-between w-full h-full ">
                  <div className=" ">
                    <div className="leading-5">
                      <h2 className="truncate w-[180px] text-[17px]">{item.title}</h2>
                      <h2 className=" text-[11px] flex justify-between">{item.brand} <span className="pl-1">Total Stock: {item.stock}</span></h2>
                      <RatingStars rating={item.rating} />
                    </div>
                    
                    <div className="flex w-full border items-center p-1 border-blue-700 rounded">

                      <div onClick={() => IncreaseAmount(item.id)} className="w-8 flex justify-center items-center border bg-blue-500 py-[2px]
                      rounded text-white hover:bg-blue-600">
                        <IoMdAdd />
                      </div>

                      <div className="w-8 text-center ">{item.amount}</div>

                      <div onClick={() => decreaseAmount(item.id)} className="w-8 flex justify-center items-center border bg-blue-500 py-[2px]
                      rounded text-white hover:bg-blue-600">
                        <IoMdRemove />
                      </div>

                      <h2 className="w-9 text-center font-light">Qty</h2>

                      <p className="w-16 text-right text-gray-700">${`${parseFloat(item.price).toFixed(2)}`}</p>
                    </div>
                  </div>

                  <div onClick={() => removeFromCart(item.id)}>
                    <IoMdClose />
                  </div>
                  
                </div>
                
             
              </div>
              <div>
                <h2>Total Price:

                  <span className="text-green-600 px-2 text-[17px]">
                   {`${parseFloat(item.discountPercentage).toFixed(0)}`}% OFF
                  </span>

                  <span className="pr-2 text-gray-400 text-sm">
                    ${(
                      (item.price / (1 - item.discountPercentage / 100)) * item.amount
                    ).toFixed(2)}
                  </span>
                  <span className="pl-4 text-[17px]">${`${parseFloat(item.amount * item.price).toFixed(2)}`}</span>
                </h2>
              </div>
            </div>
          ))}
      </div>
         <div className="flex justify-between py-2">
        <div className="p-2">Total: <span>$ {`${parseFloat(total).toFixed(2)}`}</span></div>
        
            <div onClick={()=>clearCart()} className="bg-red-500 p-3 rounded-sm text-white">
              <FiTrash2 className="text-xl "/>
        </div>
        
      </div>
      
      <div className="px-3">
        <Link to={'/'} className='bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium my-1'>view Cart</Link>
        <Link to={'/'} className='bg-slate-800 flex p-4 justify-center items-center text-white w-full font-medium'>checkout</Link>
      </div>
 
      </div>
       
      
  );
};

export default RightCartSidebar;
