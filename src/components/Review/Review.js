import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);
   

    const removeProduct = (productKey) => {
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }


    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

       const cartProducts = productKeys.map (key => {
       const product = fakeData. find (product => product.key === key);
       product.quantity =savedCart[key];
       return product;
       });
        setCart(cartProducts);
    },[])
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(product => <ReviewItem 
                    key={product.key}
                    removeProduct = {removeProduct}
                    product={product}></ReviewItem>)
            }

            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>

            </div>
        </div>
    );
};

export default Review;