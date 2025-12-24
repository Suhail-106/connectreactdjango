import React, { createContext, useEffect, useState } from 'react';

// ProductContext export karo taaki ProductDetails aur Products jaisi components isko use kar sakein
export const ProductContext = createContext();

// Component ka naam ProductProvider (Capital P) rakha hai taaki React Hooks rules follow ho
const ProductProvider = ({ children }) => {
    // State management
    const [products, setProducts] = useState([]);
    const [skip, setskip] = useState(0);
    const [total, settotal] = useState(0);
    const limit = 30;
    const [loading, setloading] = useState(false);

    // Data fetch karne ka function
    const fetchProducts = () => {
        setloading(true);

        fetch(`http://127.0.0.1:8000/api/products/?limit=${limit}&skip=${skip}`)
            .then(res => res.json())
            .then(data => {
                    console.log("full data",data)
                // Products array mein naye data ko add karna
                setProducts(prev => [...prev, ...data.products]);

                settotal(data.total);
                setloading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setloading(false);
            });
    };

    //data fetch for products category
    let [category, setcategory] = useState([])
    const fetchcategory = () => {
        fetch('https://dummyjson.com/carts')
            .then(res => res.json())
            .then(data => {
                setcategory(data.carts)
           // console.log("category",data.carts)
        })
    }

    // Skip change hone par products fetch karna
    useEffect(() => {
        fetchProducts();
        fetchcategory();
    }, [skip]);

    

    //categories fetch url
    


    // Context Provider sirf data aur setter functions provide karega
    return (
        <ProductContext.Provider
            value={{
                products,        // Array of products
                setskip,         // Function to load more products
                total,
                limit,
                loading,
                skip,
                category
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;