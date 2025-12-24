import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
//import bsbag
import { BsCarFront, BsBackpack } from 'react-icons/bs';
import { CartContext } from "../context/CartContext";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";


const Header = () => {
    const { isOpen, setIsOpen } = useContext(SidebarContext);
    const { isOpenRSidebar, isCloseRsidebar } = useContext(SidebarContext);
    const {itemAmount} = useContext(CartContext);
    
    const location = useLocation();
    
    //addEvenlistener
 


    return (
        <header className="sticky top-0 bg-white shadow-lg">
            <div className='flex justify-between top-0 w-full h-12 z-40'>
              
                {/* home page button */}
                {location.pathname === "/" ? (
                    //homepage button
                    <button
                        onClick={() => setIsOpen(!isOpen)} className="px-4 py-2 pt-3  flex justify-center items-center">
                        <BsCarFront className="text-xl" />
                    </button>
                ) : (
                        //product details button
                        
                        <Link to={'/'}>
                            <button className="px-4 py-2 pt-3 flex justify-center items-center">
                                <AiFillHome className="text-xl"/>
                            </button>
                        </Link>
                        
            )}
               
                
                <button
                    onClick={() => isCloseRsidebar(!isOpenRSidebar)} className="px-4 py-2 pt-3  flex justify-center items-center">
                    <CiShoppingCart className="text-3xl" /> 
                    <div className="bg-red-500 text-white w-7 h-7 absolute top-6 right-7 rounded-full">
                      {itemAmount}
                    </div>
                </button>

            </div>
        </header>
       
    );
};

export default Header;
