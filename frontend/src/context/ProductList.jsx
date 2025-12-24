// File: src/components/Products.jsx (Ya jisko aap App.js mein use kar rahe hain)
import { Link } from "react-router-dom";    

import React, { useContext, useEffect, useState } from 'react';

import { ProductContext } from "../context/Products"; // Sahi path use karna
//import icons
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import Category from './Category';
import { SidebarContext } from './SidebarContext';
import { CartContext } from "./CartContext";

//import backgroundimage
import backgroundimage from "../images/backgroundimage.jpg";

//import categories from categories.jsx files
//const { category , setcategory } = useContext(CategoryContext);



const Products = () => {
    //addToCart import form CartContext
    const { addToCart } = useContext(CartContext);

    const { products, total, skip, limit, setskip, loading } = useContext(ProductContext);
     
    const { isOpen } = useContext(SidebarContext);

    //get categories name from state
    const [getcatname, setgetcatname] = useState([]);

    //update products
    const [updateState, setUpdateState] = useState([]);

    const showProducts = updateState.length > 0 ? updateState : products;



    //use state filter product by category beauty
   // const [beauty, setbeauty] = useState([])
    //products find by category

   {/* useEffect(() => {
        const product = products.filter(item => {
            return item.category === "beauty";
           
        });
        console.log("category", product)
       setbeauty(product)    
    }, [products])
*/}
    
    useEffect(() => {
        if (
            !getcatname ||
            typeof getcatname !== "object" ||
            !getcatname.url
        ) {
            return; // 👈 YAHI ERROR ROK DEGA
        }

        fetch(getcatname.url)
            .then(res => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then(data => {
                setUpdateState(data.products);
               // console.log("url",data)
            })
            .catch(err => console.error(err));

    }, [getcatname]);


    return (
        
        <>
           
            {loading && <h2>Loading...</h2>}
            <div className="bg-pink-500  w-full h-[500px]">
                <img src={backgroundimage} alt="" className="w-full h-[800px]"/>
            </div>
             
            <div className='flex  w-full justify-center'>

                <div className={`${isOpen ? 'left-0 opacity-100' : '-left-full'} w-[400px] hide-scrollbar top-0 overflow-auto fixed h-full bg-white 
             z-10 transition-all duration-300`}>
                    <Category setgetcatname={setgetcatname} />
               </div>
                <div className='w-full flex flex-wrap gap-4 py-16 justify-center'>
                    {showProducts.map((v, i) => {
                        return (
                            <div key={i} className='' > {/* key hamesha unique id use karo, i nahi */}
                                <div className='bg-white rounded shadow-lg p-5 transition hover:scale-105 '>
                                    {/* ... Product Listing HTML with Link ... */}
                                    <div className='w-56 h-[350px] group transition '>
                                        <h3 className='bg-slate-700 text-white text-center font-semibold py-1 rounded'>Up To {v.discountPercentage}% Off</h3>

                                        <div className=''>
                                            <div className=' w-12 flex flex-col absolute gap-y-2 h-24 opacity-0 
                                        group-hover:opacity-100  transition-all duration-300 p-2'>
                                                <div className='bg-red-500 w-full h-12  text-white flex justify-center items-center'>

                                                    <BsPlus className='text-3xl' onClick={() => addToCart(v,v.id)} />

                                                </div>
                                                <div className='bg-white text-slate-900 w-full h-12  flex justify-center items-center'>
                                                    <Link to={`/product/${v.id}`}>
                                                        <BsEyeFill className='text-2xl' />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        {/*image*/}

                                        <img className='w-full h[300px]' src={v.images?.[0] || v.thumbnail} alt={v.title} />
                             
                                        {/*title*/}
                                        <div className=''>
                                            <div className='float-right text-center'>
                                                <img className='w-[50] h-[50px] float-right' src={v.thumbnail} alt={v.title} />
                                                <h2 className='text-[10px] '>{v.brand}</h2>
                                            </div>

                                            <Link to={`/product/${v.id}`}>
                                                <h3>{v.title}</h3>
                                            </Link>

                                            <Link to={`/product/${v.id}`}>
                                                <h3>Price: $ {v.price}</h3>
                                            </Link>
                                        </div>



                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
          
            {/* ... Load More Button Logic ... */}
            {products.length < total && (
                <button
                    onClick={() => setskip(skip + limit)}
                    className="btn w-full h-10 text-white font-semibold bg-slate-700 hover:bg-slate-800"
                >
                    Load More
                </button>
            )}
            <div>{total}</div>
            <footer className="bg-slate-800 text-white w-full h-24 py-5 flex justify-center items-center">
                 <h2 className="text-center font-semibold ">&copy; All rights are resorverd in this site 2025</h2>
            </footer>
        </>
    );
};

export default Products;