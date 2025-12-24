import { createContext, useEffect, useState } from 'react'

//import createContext for provided
export const CartContext = createContext();

export default function CartProvider({ children }) {
    
    //add to cart useState
    const [cart, setCart] = useState([])

    //add to Cart
    const addToCart = (product, id) => {
        const newItem = { ...product, amount: 1 };
        const cartItem = cart.find(item => {
            return (
                item.id === id
            )
        })
        //id item in the cart already
        if (cartItem) {
            const newCart = [...cart].map(item => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount + 1 };
                }
                else {
                    return item;
                }
            });
            setCart(newCart)

        }
        else {
            setCart([...cart, newItem])
        }
    };
   
    //const all cart blank
    const clearCart = () => {
        setCart([])
    }

    //only one product remove from cart
    const removeFromCart = (id) => {
        const newCartFresh = cart.filter(item => item.id !== id);
        setCart(newCartFresh);
    };

    //Increase amount
    const IncreaseAmount = (id) => {
        const cartItem = cart.find(item => item.id === id);
        addToCart(cartItem,id)
    }
  

    //Decrease amount
    const decreaseAmount = (id) => {
        const cartItem = cart.find(item => item.id === id);
        if (!cartItem) return;

        if (cartItem.amount > 1) {
            //decrease amount by 1
            const newCart = cart.map(item => {
                if (item.id === id) {
                    return { ...item, amount: item.amount - 1 };
                }
                else {
                    return item;
                }
            });
            setCart(newCart)
        }
        else {
            //if the item amount is < 1, remove the item
            removeFromCart(id);
        }
    }

    //total cart amount of product in cart price
    const [total, setttotal] = useState(0);
    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.amount
        }, 0);
        setttotal(total)
    }, [cart]);

    //total cart amount of product in cart 
    const [itemAmount, setItemAmount] = useState(0);
    useEffect(() => {
        const amount = cart.reduce((acc, item) => {
            return acc + item.amount
        }, 0);
        setItemAmount(amount)
    })



  return (
      <CartContext.Provider value={{ addToCart, cart, clearCart, removeFromCart, IncreaseAmount, decreaseAmount,total, itemAmount }}>
          {children}
    </CartContext.Provider>
  )
}
