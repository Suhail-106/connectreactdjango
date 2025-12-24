import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/Products";
//import icon of star
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronDown } from "react-icons/fa";
//up icon
import { FaChevronUp } from "react-icons/fa";
//import icon certified
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom';




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


const ProductDetails = () => {
    
    const { addToCart } = useContext(CartContext);
  
    const { id } = useParams();
    const { products } = useContext(ProductContext);

    if (!products.length) return <h2>Loading...</h2>;

    const product = products.find(p => p.id === Number(id));

    if (!product) return <h2>Product not found</h2>;

  return (
      <>
      
     
        <div className=" w-full p-10 px-20 max-[700px]:px-2 justify-around ">
            <div className="w-full h-[650px] flex justify-center items-center max-[700px]:flex-wrap ">
          <div className=" w-full h-full">

            <p className=" bg-slate-600 rounded-full text-center text-white p-2 font-semibold">Up To {product.discountPercentage}% OFF On {product.title}</p>

            <img src={product.thumbnail} className="w-full ml-0 h-full" />

                </div>
                <br />
                <div className="">
                    <p className="font-semibold text-xl leading-5">{product.title} <br /><span className="text-[11px]">{product.brand}</span></p>
                    <p className="text-xl font-semibold py-1">${product.price}</p>
                    <RatingStars rating={product.rating} />
                    <p>Up To {product.discountPercentage}% OFF on All <span className="text-[14px]">{product.category}</span></p>
                    <p className="text-[10px] text-green-600"><span className="text-black">SKU: </span>{product.sku}</p>
                    <p className="text-[10px] text-green-600"><span className="text-black">Availability: </span>In Stock {product.stock}</p>
                    <p className="text-[10px] text-green-600 px-2 bg-slate-100 p-1 my-1"><span className="text-black">Return: </span> {product.returnPolicy}</p>
                    <p className="text-[10px] text-green-600"><span className="text-black">Category: </span>{product.category}</p>
                    <h2 className="pt-2">Descriptions:-</h2>
                    <p className="px-4">{product.description}</p>
                                     
                    
                <div className="group">
              <h2 className="pt-2 w-full flex items-center gap-2">Dimensions <span className="group-hover:block hidden"><FaChevronUp /></span>
                <span className="group-hover:hidden block"><FaChevronDown /></span></h2>
                <div className="text-[14px] group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 overflow-hidden max-h-0 ease-in-out">
                <p className="px-4">Width: {product.dimensions.width} cm</p>
                <p className="px-4">Height: {product.dimensions.height} cm</p>
                <p className="px-4">Depth: {product.dimensions.depth} cm</p>
              </div>      
              </div>

                    <h2 className="pt-2">Tags:-</h2>
                    <div className="text-[14px]">
                        <span className="px-4">#{product.tags[0]}</span> <span>#{product.tags[1]}</span> <span>{product.tags[2]}</span>
                        
                    </div>
                    
            <div className="py-2">
              <button className="bg-blue-500 p-2 hover:bg-blue-600 rounded text-white font-semibold mr-4"
              onClick={()=>addToCart(product,product.id)}>Add to Cart</button>
              <button className="bg-yellow-500 p-2 hover:bg-yellow-600 rounded text-white font-semibold">
                <Link to={`/Last/${product.id}`}>Buy Now</Link>
              </button>

             </div>
                
          </div>
          
        </div>
        <div className=" w-full ">
          <h2 className="bg-slate-50 shadow p-2 text-2xl font-semibold underline border-b border-slate-900">Reveiws</h2>
          <div className="py-5">
            {product.reviews.map(item => {
              return (
                <div key={item.id} className="">
                  <div className="hover:bg-slate-50 p-5">
                    <p className="flex items-center gap-2 font-semibold ">{item.rating}< FaRegStar className="text-green-500 " /> Comments:  {item.comment}</p>
                    <p className="pb-1 text-gray-900">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, debitis rerum reprehenderit iure in qui quibusdam. Incidunt alias, deleniti dignissimos beatae minus consectetur cupiditate corrupti facere odit, sint est facilis.
                    </p>
                    <div className="flex items-center gap-2 pb-4 text-gray-500 text-sm justify-between ">
                      
                      <div>
                        <span className="flex text-sm text-gray-500 items-center "> <AiTwotoneSafetyCertificate /> certified User </span>
                        <span>{item.reviewerName} Date: {item.date}</span>
                      </div>
                      
                      
                      <div className="text-right ">{item.reviewerEmail}</div>
                    
                    </div>
                  </div>
                 
                 </div>
               )
             })}
           </div>
        </div>
        
      </div>
      <footer className="bg-slate-800 text-white w-full h-24 py-5 flex justify-center items-center">
          <h2 className="text-center font-semibold ">&copy; All rights are resorverd in this site 2025</h2>
        </footer>
    </>
      );
};

export default ProductDetails;
